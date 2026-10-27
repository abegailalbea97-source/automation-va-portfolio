-- Adds the independent automation projects entry to the top of Work History.
-- Run once in Supabase → SQL Editor. Safe to re-run (it won't add a duplicate).
update public.experience set sort_order = sort_order + 1
where not exists (select 1 from public.experience where role = 'Automation Specialist · Independent Projects');

insert into public.experience (role, org, period, bullets, skills, sort_order)
select 'Automation Specialist · Independent Projects', 'Self-directed · Remote', '2025–Present',
  array[
    'Designed and built lead-capture workflows that send Google Forms responses into cleaned, formatted Google Sheets.',
    'Built instant Telegram alert workflows so teams hear about new inquiries within seconds.',
    'Created automatic, personalized Gmail confirmation emails triggered by new form submissions.',
    'Built Make.com router scenarios that sort incoming requests into sales, support, or general queues.',
    'Built this portfolio as a React app with a Supabase backend for contact messages, testimonials, and visit stats.'
  ],
  'Zapier, Make.com, n8n, HighLevel, Google Workspace, Telegram, Supabase, workflow design, testing, and documentation.',
  1
where not exists (select 1 from public.experience where role = 'Automation Specialist · Independent Projects');
