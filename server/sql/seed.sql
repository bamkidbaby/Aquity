insert into projects (name, status, progress_percent, latest_update)
values
  ('Aquity Website Refresh', 'In Progress', 72, 'Hero direction approved. Backend foundation and portal flow are now underway.'),
  ('Client Portal Foundation', 'Planning', 36, 'Authentication, dashboard APIs, and structured project data are being prepared.'),
  ('Journal Content System', 'Active', 64, 'Articles and editorial routes are live. API delivery and content operations are next.');

insert into approvals (project_id, title, status)
select id, 'Homepage hero approval', 'Pending'
from projects
where name = 'Aquity Website Refresh';

insert into notifications (body)
values
  ('Backend API server scaffolded with auth, dashboard, article, and inquiry routes.'),
  ('Frontend auth flows can now store a session token locally and call protected endpoints.'),
  ('SQL schema and reusable query file prepared for a Postgres deployment.');

insert into activity_feed (body)
values
  ('Backend API server scaffolded with auth, dashboard, article, and inquiry routes.'),
  ('Frontend auth flows can now store a session token locally and call protected endpoints.'),
  ('SQL schema and reusable query file prepared for a Postgres deployment.');
