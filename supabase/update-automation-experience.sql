-- Updates the top Work History entry to "Automation Developer, June 2024–Present".
-- Run once in Supabase → SQL Editor.
update public.experience
set role = 'Automation Developer',
    org = 'Freelance clients & in-house · Remote',
    period = 'June 2024–Present',
    bullets = array[
      'Build and maintain workflow automations for clients using Zapier, Make.com, n8n, and HighLevel.',
      'Automated repetitive record-keeping and reporting tasks at my M Lhuillier branch alongside my Assistant Branch Manager role.',
      'Designed and built lead-capture workflows that send Google Forms responses into cleaned, formatted Google Sheets.',
      'Built instant Telegram alert workflows so teams hear about new inquiries within seconds.',
      'Created automatic, personalized Gmail confirmation emails triggered by new form submissions.',
      'Built Make.com router scenarios that sort incoming requests into sales, support, or general queues.',
      'Built this portfolio as a React app with a Supabase backend for contact messages, testimonials, and visit stats.'
    ]
where role in ('Automation Specialist · Independent Projects', 'Automation Developer');

update public.experience set period = '2023–2026' where role = 'Assistant Branch Manager';
