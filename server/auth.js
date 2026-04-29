import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.fullName,
    },
    config.jwtSecret,
    { expiresIn: "7d" },
  );
}

export function requireAuth(request, response, next) {
  const authHeader = request.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    response.status(401).json({ error: "Authentication required." });
    return;
  }

  try {
    request.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    response.status(401).json({ error: "Invalid or expired token." });
  }
}
