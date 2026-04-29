import { z } from "zod";
import { articles } from "../src/content/articles/index.js";
import { buildDashboardExperience } from "./dashboardData.js";
import { demoStore } from "./demoStore.js";
import { pool } from "./db.js";

const normalizedString = () => z.string().trim().min(1);

const inquirySchema = z.object({
  name: normalizedString().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  budget: z.enum(["< $5k", "$5k - $15k", "$15k - $50k", "$50k+"]),
  type: z.enum(["Website", "Web App", "Branding", "Strategy", "Other"]),
  message: normalizedString().min(20).max(2000),
  website: z.string().optional().default(""),
});

export const authPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/\d/, "Password must include a number."),
});

async function queryOne(query, values) {
  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
}

export const store = {
  async createUser({ fullName, email, passwordHash }) {
    if (!pool) {
      return demoStore.createUser({ fullName, email, passwordHash });
    }

    return queryOne(
      `insert into users (full_name, email, password_hash, role)
       values ($1, $2, $3, 'client')
       returning id, full_name as "fullName", email, role, company_name as "company", created_at as "createdAt"`,
      [fullName, email, passwordHash],
    );
  },

  async findUserByEmail(email) {
    if (!pool) {
      return demoStore.findUserByEmail(email);
    }

    return queryOne(
      `select id, full_name as "fullName", email, password_hash as "passwordHash",
              role, company_name as "company", created_at as "createdAt"
       from users
       where email = $1`,
      [email],
    );
  },

  async createInquiry(payload) {
    const parsedPayload = inquirySchema.parse(payload);

    if (parsedPayload.website) {
      throw new Error("Unable to process inquiry.");
    }

    if (!pool) {
      return demoStore.createInquiry(parsedPayload);
    }

    return queryOne(
      `insert into inquiries (name, email, budget_range, project_type, message)
       values ($1, $2, $3, $4, $5)
       returning id, name, email, budget_range as budget, project_type as type, message, created_at as "createdAt"`,
      [
        parsedPayload.name,
        parsedPayload.email,
        parsedPayload.budget,
        parsedPayload.type,
        parsedPayload.message,
      ],
    );
  },

  async getDashboardOverview(userEmail) {
    if (!pool) {
      return demoStore.getDashboardOverview(userEmail);
    }

    const user = await this.findUserByEmail(userEmail);
    const projectsResult = await pool.query(
      `select id, name, status, progress_percent as progress, latest_update as update
       from projects
       order by updated_at desc
       limit 6`,
    );
    const activityResult = await pool.query(
      `select body
       from activity_feed
       order by created_at desc
       limit 6`,
    );
    const statsResult = await queryOne(
      `select
         (select count(*) from projects where status <> 'Completed')::int as "activeProjects",
         (select count(*) from approvals where status = 'Pending')::int as "approvalsPending",
         (select count(*) from notifications where read_at is null)::int as "unreadUpdates"`,
      [],
    );

    return {
      user,
      stats: statsResult,
      projects: projectsResult.rows,
      activity: activityResult.rows.map((row) => row.body),
      ...buildDashboardExperience({
        user,
        stats: statsResult,
        projects: projectsResult.rows,
        activity: activityResult.rows.map((row) => row.body),
      }),
    };
  },

  async listArticles() {
    return articles;
  },
};
