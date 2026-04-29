# Deployment Guide

## Architecture

This project can run as a single production service:

- Vite builds the frontend into `dist/`
- Express serves API routes under `/api`
- Express also serves the built frontend in production
- PostgreSQL stores auth, inquiries, projects, approvals, notifications, and activity

## Database

The PostgreSQL database name for this project is:

`Aquity World`

When using a connection string, encode the space:

`postgresql://username:password@host:5432/Aquity%20World`

## Required environment variables

Copy values from [.env.example](C:/Users/PETER%20PC/Desktop/Work/my-work/sth/.env.example:1).

- `PORT`
- `CORS_ORIGIN`
- `JWT_SECRET`
- `DATABASE_URL`
- `NODE_ENV`
- `VITE_API_URL`

## SQL setup

Run these files in order:

1. [schema.sql](C:/Users/PETER%20PC/Desktop/Work/my-work/sth/server/sql/schema.sql:1)
2. [seed.sql](C:/Users/PETER%20PC/Desktop/Work/my-work/sth/server/sql/seed.sql:1)

Reusable examples live in [queries.sql](C:/Users/PETER%20PC/Desktop/Work/my-work/sth/server/sql/queries.sql:1).

## Local development

- Frontend only: `npm run dev`
- Backend only: `npm run dev:server`
- Full stack: `npm run dev:full`

## Production build

1. Build the frontend with `npm run build`
2. Start the server with `npm run server`
3. In production, Express serves both the API and the built frontend

## Docker

This repo includes:

- [Dockerfile](C:/Users/PETER%20PC/Desktop/Work/my-work/sth/Dockerfile:1)
- [.dockerignore](C:/Users/PETER%20PC/Desktop/Work/my-work/sth/.dockerignore:1)

Build and run:

```bash
docker build -t aquity-world .
docker run -p 4000:4000 --env-file .env aquity-world
```
