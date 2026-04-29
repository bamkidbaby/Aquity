import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { comparePassword, createToken, hashPassword, requireAuth } from "./auth.js";
import { config } from "./config.js";
import { authPayloadSchema, store } from "./store.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many authentication attempts. Try again later." },
});

const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many inquiries submitted. Try again later." },
});

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(
  cors({
    origin: config.corsOrigin,
  }),
);
app.use(compression());
app.use(express.json());
app.use((request, response, next) => {
  request.requestId = crypto.randomUUID();
  response.setHeader("x-request-id", request.requestId);
  next();
});

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", environment: config.nodeEnv });
});

app.get("/api/articles", async (_request, response, next) => {
  try {
    const articles = await store.listArticles();
    response.json({ articles });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/signup", authLimiter, async (request, response, next) => {
  try {
    const payload = authPayloadSchema.extend({
      fullName: z.string().min(2),
    }).parse(request.body);

    const passwordHash = await hashPassword(payload.password);
    const user = await store.createUser({
      fullName: payload.fullName,
      email: payload.email,
      passwordHash,
    });

    response.status(201).json({
      token: createToken(user),
      user,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", authLimiter, async (request, response, next) => {
  try {
    const payload = authPayloadSchema.parse(request.body);
    const user = await store.findUserByEmail(payload.email);

    if (!user) {
      response.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const isValid = await comparePassword(payload.password, user.passwordHash);

    if (!isValid) {
      response.status(401).json({ error: "Invalid email or password." });
      return;
    }

    response.json({
      token: createToken(user),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/me", requireAuth, async (request, response, next) => {
  try {
    const user = await store.findUserByEmail(request.user.email);

    response.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/dashboard/overview", requireAuth, async (request, response, next) => {
  try {
    const overview = await store.getDashboardOverview(request.user.email);
    response.json(overview);
  } catch (error) {
    next(error);
  }
});

app.post("/api/inquiries", inquiryLimiter, async (request, response, next) => {
  try {
    const inquiry = await store.createInquiry(request.body);
    response.status(201).json({
      inquiry,
      message: "Inquiry received successfully.",
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  if (error instanceof z.ZodError) {
    response.status(400).json({
      error: "Invalid request payload.",
      details: error.flatten(),
    });
    return;
  }

  if (error.message === "A user with that email already exists.") {
    response.status(409).json({ error: error.message });
    return;
  }

  response.status(500).json({
    error: error.message || "An unexpected server error occurred.",
  });
});

if (config.nodeEnv === "production") {
  app.use(express.static(distPath));
  app.get(/^\/(?!api).*/, (_request, response) => {
    response.sendFile(path.join(distPath, "index.html"));
  });
}

export default app;
