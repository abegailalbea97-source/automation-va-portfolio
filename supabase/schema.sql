-- =====================================================================
-- GAIL.SYS portfolio: Supabase schema
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to re-run: tables use IF NOT EXISTS, and policies are recreated.
--
-- Security model (Row Level Security is ON for every table):
--   • Website visitors (anon key) can READ published content.
--   • Visitors can only INSERT contact messages, feedback, and stat events.
--     They can never read, edit, or delete them.
--   • Feedback is hidden until YOU set approved = true in the Table Editor.
--   • You manage everything from the Supabase dashboard.
-- =====================================================================

-- ---------- Editable content ----------
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tag text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  title text not null,
  problem text,
  workflow text,
  value text,
  tags text[] not null default '{}',
  demo int check (demo between 1 and 4),   -- links to a built-in live demo (1-4), or empty for none
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  course text not null,
  issuer text not null,
  issued_on date,
  topics text,
  image_url text not null,
  pdf_url text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  org text not null,
  period text,
  bullets text[] not null default '{}',
  skills text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Visitor submissions ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text check (char_length(company) <= 120),
  service text check (char_length(service) <= 60),
  message text not null check (char_length(message) between 10 and 2000),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  role text check (char_length(role) <= 120),
  quote text not null check (char_length(quote) between 10 and 600),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id bigint generated always as identity primary key,
  type text not null check (type in ('page_view', 'demo_open', 'cta_click', 'certificate_open')),
  label text check (char_length(label) <= 80),
  path text check (char_length(path) <= 120),
  referrer text check (char_length(referrer) <= 120),
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.skills           enable row level security;
alter table public.services         enable row level security;
alter table public.projects         enable row level security;
alter table public.certificates     enable row level security;
alter table public.experience       enable row level security;
alter table public.contact_messages enable row level security;
alter table public.testimonials     enable row level security;
alter table public.events           enable row level security;

-- Public can read published content
drop policy if exists "public read published" on public.skills;
create policy "public read published" on public.skills for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.services;
create policy "public read published" on public.services for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.projects;
create policy "public read published" on public.projects for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.certificates;
create policy "public read published" on public.certificates for select to anon, authenticated using (published);
drop policy if exists "public read published" on public.experience;
create policy "public read published" on public.experience for select to anon, authenticated using (published);

-- Visitors can send a contact message (insert only, never read)
drop policy if exists "public can send message" on public.contact_messages;
create policy "public can send message" on public.contact_messages for insert to anon, authenticated
  with check (handled = false);

-- Visitors can submit feedback, but it always starts unapproved
drop policy if exists "public can submit feedback" on public.testimonials;
create policy "public can submit feedback" on public.testimonials for insert to anon, authenticated
  with check (approved = false);
-- Only approved feedback is visible
drop policy if exists "public read approved" on public.testimonials;
create policy "public read approved" on public.testimonials for select to anon, authenticated
  using (approved);

-- Visitors can record anonymous stat events (insert only, never read)
drop policy if exists "public can log event" on public.events;
create policy "public can log event" on public.events for insert to anon, authenticated
  with check (true);

-- Tighten table privileges to match the policies above
revoke all on public.contact_messages, public.testimonials, public.events from anon, authenticated;
grant insert (name, email, company, service, message) on public.contact_messages to anon, authenticated;
grant insert (name, role, quote) on public.testimonials to anon, authenticated;
grant select (id, name, role, quote, approved, created_at) on public.testimonials to anon, authenticated;
grant insert (type, label, path, referrer) on public.events to anon, authenticated;
revoke insert, update, delete on public.skills, public.services, public.projects, public.certificates, public.experience from anon, authenticated;
grant select on public.skills, public.services, public.projects, public.certificates, public.experience to anon, authenticated;

-- ---------- Seed content (only if the tables are empty) ----------
insert into public.skills (title, description, tag, sort_order)
select * from (values
  ('ZAPIER', 'Multi-step Zaps with Formatter, Filters, Paths, and Webhooks.', 'WORKFLOW AUTOMATION', 1),
  ('MAKE.COM', 'Scenarios with routers, error handling, HTTP requests, and execution monitoring.', 'VISUAL AUTOMATION', 2),
  ('n8n', 'Node-based workflows with branching, API calls, and AI agent steps.', 'AI AUTOMATION', 3),
  ('GOHIGHLEVEL', 'CRM pipelines, funnels, forms, and marketing automation sequences.', 'CRM', 4),
  ('ADMIN SUPPORT', 'Record organization, data entry, documentation, reporting, and customer service.', 'OPERATIONS', 5),
  ('INTEGRATIONS', 'Google Forms, Google Sheets, Gmail, and Telegram, connected into one flow.', 'GOOGLE WORKSPACE', 6)
) v where not exists (select 1 from public.skills);

insert into public.services (title, description, tags, sort_order)
select * from (values
  ('LEAD & FORM AUTOMATION', 'Capture leads from forms and landing pages, clean the data, and send it straight to your CRM or spreadsheet.', array['ZAPIER','MAKE.COM'], 1),
  ('CRM SETUP & FOLLOW-UPS', 'HighLevel pipelines, tags, and follow-up sequences, so no lead goes cold.', array['HIGHLEVEL'], 2),
  ('NOTIFICATIONS & ROUTING', 'Send the right alert to the right person on email, Telegram, or Slack the moment something happens.', array['ROUTERS','ALERTS'], 3),
  ('DATA CLEANUP & REPORTING', 'Organize messy spreadsheets, set up validation, and automate recurring reports.', array['GOOGLE SHEETS'], 4),
  ('AI-ASSISTED WORKFLOWS', 'n8n workflows that use AI steps to sort, summarize, or draft replies to incoming messages.', array['N8N','AI'], 5),
  ('PROCESS DOCUMENTATION', 'Clear write-ups of every workflow I build, so your team knows what runs, when, and why.', array['SOPS'], 6)
) v where not exists (select 1 from public.services);

insert into public.projects (code, title, problem, workflow, value, tags, demo, sort_order)
select * from (values
  ('CASE 01', 'Lead Capture & Data Organization',
   'Form responses pile up in an inbox and get copied into spreadsheets by hand, with typos and missed entries.',
   'Google Forms → field cleanup & formatting → Google Sheets, with a status column for review and tracking.',
   'Every submission lands in one place, formatted the same way, with no manual data entry.',
   array['GOOGLE FORMS','GOOGLE SHEETS','DATA ENTRY'], 1, 1),
  ('CASE 02', 'Instant Team Alerts on Telegram',
   'New inquiries sit unnoticed for hours because nobody is watching the form or inbox.',
   'Form submission → trigger → formatted Telegram alert to the right team channel.',
   'The team hears about new requests within seconds, so response times drop.',
   array['TELEGRAM','AUTOMATION','NOTIFICATIONS'], 2, 2),
  ('CASE 03', 'Automatic Email Confirmation',
   'Staff type the same "we got your request" reply over and over, and some customers never hear back.',
   'New form response → details mapped into a template → personalized confirmation email via Gmail.',
   'Every customer gets a consistent, professional reply right away.',
   array['GMAIL','WORKFLOW DESIGN'], 3, 3),
  ('CASE 04', 'Smart Request Routing',
   'Sales questions, support issues, and general inquiries all land in one inbox and someone has to sort them by hand.',
   'Incoming request → Make.com router checks the request type → sends it to sales, support, or the general queue.',
   'Each request reaches the right person first time, with no manual triage.',
   array['MAKE.COM','LOGIC','ROUTERS'], 4, 4)
) v where not exists (select 1 from public.projects);

insert into public.certificates (platform, course, issuer, issued_on, topics, image_url, pdf_url, sort_order)
select * from (values
  ('ZAPIER', 'No Code Automation with Zapier', 'Technical Virtual Assistants PH', date '2025-11-28', 'Triggers, Formatter, Filters, Paths, Webhooks', '/certificate-zapier.png', '/certificate-zapier.pdf', 1),
  ('MAKE.COM', 'No Code Automation with Make.com', 'Technical Virtual Assistants PH', date '2025-11-28', 'Scenarios, Routers, Error Handling, HTTP Requests', '/certificate-make.png', '/certificate-make.pdf', 2),
  ('N8N', 'AI Automation with n8n', 'Technical Virtual Assistants PH', date '2025-11-28', 'Workflow Nodes, Branching, APIs, AI Agents', '/certificate-n8n.png', '/certificate-n8n.pdf', 3),
  ('HIGHLEVEL', 'HighLevel CRM Full Training', 'Technical Virtual Assistants PH', date '2025-11-28', 'CRM, Funnels, Forms, Marketing Automations', '/certificate-highlevel.png', '/certificate-highlevel.pdf', 4)
) v where not exists (select 1 from public.certificates);

insert into public.experience (role, org, period, bullets, skills, sort_order)
select * from (values
  ('Assistant Branch Manager', 'M Lhuillier Pawnshop · Philippines', null::text,
   array['Supported daily branch operations and compliance procedures.',
         'Handled financial documentation and confidential records.',
         'Prepared operational and financial reports.',
         'Coordinated staff tasks and addressed customer concerns.'],
   null::text, 1),
  ('Contact Tracer', 'DILG Philippines', 'March–November 2020',
   array['Conducted contact tracing interviews and gathered essential case and contact details.',
         'Maintained organized monitoring records and helped validate information for follow-up actions.',
         'Handled sensitive health-related data with confidentiality, accuracy, and urgency.',
         'Supported coordination and communication with individuals and relevant teams during time-sensitive cases.'],
   'communication, documentation, data validation, confidentiality, record management, and attention to detail.', 2),
  ('Statistical Researcher', 'Philippine Statistics Authority', 'July–December 2019',
   array['Assisted in data gathering, field validation, and completion of research and survey documents.',
         'Collected, reviewed, and encoded statistical information while helping ensure accuracy and completeness.',
         'Supported the organization of records and preparation of structured data for reporting and analysis.',
         'Worked with forms, numerical information, and documented responses with a high level of detail.'],
   'research support, data entry, analytical thinking, data organization, validation, and structured reporting.', 3)
) v where not exists (select 1 from public.experience);
