import { articles } from "../src/content/articles/index.js";
import { hashPassword } from "./auth.js";
import { buildDashboardExperience } from "./dashboardData.js";

const demoUsers = [];
const demoInquiries = [];

const dashboardProjects = [
  {
    id: "proj_website_refresh",
    name: "Aquity Website Refresh",
    status: "In Progress",
    progress: 72,
    update: "Hero direction approved. Backend foundation and portal flow are now underway.",
  },
  {
    id: "proj_client_portal",
    name: "Client Portal Foundation",
    status: "Planning",
    progress: 36,
    update: "Authentication, dashboard APIs, and structured project data are being prepared.",
  },
  {
    id: "proj_journal_system",
    name: "Journal Content System",
    status: "Active",
    progress: 64,
    update: "Articles and editorial routes are live. API delivery and content operations are next.",
  },
];

const dashboardActivity = [
  "Backend API server scaffolded with auth, dashboard, article, and inquiry routes.",
  "Frontend auth flows can now store a session token locally and call protected endpoints.",
  "SQL schema and reusable query file prepared for a Postgres deployment.",
];

await seedDemoUser();

async function seedDemoUser() {
  const hashedPassword = await hashPassword("Password123!");

  demoUsers.push({
    id: "usr_demo",
    fullName: "Demo Client",
    email: "demo@aquity.io",
    passwordHash: hashedPassword,
    role: "client",
    company: "Aquity Demo",
    createdAt: new Date().toISOString(),
  });
}

export const demoStore = {
  async createUser({ fullName, email, passwordHash }) {
    const existingUser = demoUsers.find((user) => user.email === email);

    if (existingUser) {
      throw new Error("A user with that email already exists.");
    }

    const user = {
      id: `usr_${Date.now()}`,
      fullName,
      email,
      passwordHash,
      role: "client",
      company: "New Client",
      createdAt: new Date().toISOString(),
    };

    demoUsers.push(user);
    return user;
  },

  async findUserByEmail(email) {
    return demoUsers.find((user) => user.email === email) ?? null;
  },

  async createInquiry(payload) {
    const inquiry = {
      id: `inq_${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    demoInquiries.push(inquiry);
    return inquiry;
  },

  async getDashboardOverview(userEmail) {
    const user = demoUsers.find((user) => user.email === userEmail) ?? demoUsers[0];
    const stats = {
      activeProjects: dashboardProjects.length,
      approvalsPending: 3,
      unreadUpdates: 5,
    };

    return {
      user,
      stats,
      projects: dashboardProjects,
      activity: dashboardActivity,
      ...buildDashboardExperience({
        user,
        stats,
        projects: dashboardProjects,
        activity: dashboardActivity,
      }),
    };
  },

  async listArticles() {
    return articles;
  },
};
