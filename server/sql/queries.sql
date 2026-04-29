-- Create a new user
insert into users (full_name, email, password_hash, role)
values ($1, $2, $3, 'client')
returning id, full_name, email, role, company_name, created_at;

-- Look up a user by email during login
select id, full_name, email, password_hash, role, company_name, created_at
from users
where email = $1;

-- Save a contact inquiry
insert into inquiries (name, email, budget_range, project_type, message)
values ($1, $2, $3, $4, $5)
returning id, created_at;

-- Dashboard project overview
select id, name, status, progress_percent, latest_update
from projects
order by updated_at desc
limit 6;

-- Recent dashboard activity feed
select body
from activity_feed
order by created_at desc
limit 6;

-- Aggregate dashboard stats
select
  (select count(*) from projects where status <> 'Completed')::int as active_projects,
  (select count(*) from approvals where status = 'Pending')::int as approvals_pending,
  (select count(*) from notifications where read_at is null)::int as unread_updates;
