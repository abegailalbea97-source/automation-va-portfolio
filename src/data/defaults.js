// Built-in content. The same rows are seeded into Supabase by supabase/schema.sql.
// Once Supabase is connected, edit content in the Supabase Table Editor.

export const skills = [
  { id: 's1', title: 'ZAPIER', description: 'Multi-step Zaps with Formatter, Filters, Paths, and Webhooks.', tag: 'WORKFLOW AUTOMATION' },
  { id: 's2', title: 'MAKE.COM', description: 'Scenarios with routers, error handling, HTTP requests, and execution monitoring.', tag: 'VISUAL AUTOMATION' },
  { id: 's3', title: 'n8n', description: 'Node-based workflows with branching, API calls, and AI agent steps.', tag: 'AI AUTOMATION' },
  { id: 's4', title: 'GOHIGHLEVEL', description: 'CRM pipelines, funnels, forms, and marketing automation sequences.', tag: 'CRM' },
  { id: 's5', title: 'ADMIN SUPPORT', description: 'Record organization, data entry, documentation, reporting, and customer service.', tag: 'OPERATIONS' },
  { id: 's6', title: 'INTEGRATIONS', description: 'Google Forms, Google Sheets, Gmail, and Telegram, connected into one flow.', tag: 'GOOGLE WORKSPACE' },
];

export const certificates = [
  { id: 'c1', platform: 'ZAPIER', course: 'No Code Automation with Zapier', issuer: 'Technical Virtual Assistants PH', issued_on: '2025-11-28', topics: 'Triggers, Formatter, Filters, Paths, Webhooks', image_url: '/certificate-zapier.png', pdf_url: '/certificate-zapier.pdf' },
  { id: 'c2', platform: 'MAKE.COM', course: 'No Code Automation with Make.com', issuer: 'Technical Virtual Assistants PH', issued_on: '2025-11-28', topics: 'Scenarios, Routers, Error Handling, HTTP Requests', image_url: '/certificate-make.png', pdf_url: '/certificate-make.pdf' },
  { id: 'c3', platform: 'N8N', course: 'AI Automation with n8n', issuer: 'Technical Virtual Assistants PH', issued_on: '2025-11-28', topics: 'Workflow Nodes, Branching, APIs, AI Agents', image_url: '/certificate-n8n.png', pdf_url: '/certificate-n8n.pdf' },
  { id: 'c4', platform: 'HIGHLEVEL', course: 'HighLevel CRM Full Training', issuer: 'Technical Virtual Assistants PH', issued_on: '2025-11-28', topics: 'CRM, Funnels, Forms, Marketing Automations', image_url: '/certificate-highlevel.png', pdf_url: '/certificate-highlevel.pdf' },
];

export const projects = [
  {
    id: 'p1', code: 'CASE 01', title: 'Lead Capture & Data Organization',
    problem: 'Form responses pile up in an inbox and get copied into spreadsheets by hand, with typos and missed entries.',
    workflow: 'Google Forms → field cleanup & formatting → Google Sheets, with a status column for review and tracking.',
    value: 'Every submission lands in one place, formatted the same way, with no manual data entry.',
    tags: ['GOOGLE FORMS', 'GOOGLE SHEETS', 'DATA ENTRY'], demo: 1,
  },
  {
    id: 'p2', code: 'CASE 02', title: 'Instant Team Alerts on Telegram',
    problem: 'New inquiries sit unnoticed for hours because nobody is watching the form or inbox.',
    workflow: 'Form submission → trigger → formatted Telegram alert to the right team channel.',
    value: 'The team hears about new requests within seconds, so response times drop.',
    tags: ['TELEGRAM', 'AUTOMATION', 'NOTIFICATIONS'], demo: 2,
  },
  {
    id: 'p3', code: 'CASE 03', title: 'Automatic Email Confirmation',
    problem: 'Staff type the same "we got your request" reply over and over, and some customers never hear back.',
    workflow: 'New form response → details mapped into a template → personalized confirmation email via Gmail.',
    value: 'Every customer gets a consistent, professional reply right away.',
    tags: ['GMAIL', 'WORKFLOW DESIGN'], demo: 3,
  },
  {
    id: 'p4', code: 'CASE 04', title: 'Smart Request Routing',
    problem: 'Sales questions, support issues, and general inquiries all land in one inbox and someone has to sort them by hand.',
    workflow: 'Incoming request → Make.com router checks the request type → sends it to sales, support, or the general queue.',
    value: 'Each request reaches the right person first time, with no manual triage.',
    tags: ['MAKE.COM', 'LOGIC', 'ROUTERS'], demo: 4,
  },
];

export const services = [
  { id: 'v1', title: 'LEAD & FORM AUTOMATION', description: 'Capture leads from forms and landing pages, clean the data, and send it straight to your CRM or spreadsheet.', tags: ['ZAPIER', 'MAKE.COM'] },
  { id: 'v2', title: 'CRM SETUP & FOLLOW-UPS', description: 'HighLevel pipelines, tags, and follow-up sequences, so no lead goes cold.', tags: ['HIGHLEVEL'] },
  { id: 'v3', title: 'NOTIFICATIONS & ROUTING', description: 'Send the right alert to the right person on email, Telegram, or Slack the moment something happens.', tags: ['ROUTERS', 'ALERTS'] },
  { id: 'v4', title: 'DATA CLEANUP & REPORTING', description: 'Organize messy spreadsheets, set up validation, and automate recurring reports.', tags: ['GOOGLE SHEETS'] },
  { id: 'v5', title: 'AI-ASSISTED WORKFLOWS', description: 'n8n workflows that use AI steps to sort, summarize, or draft replies to incoming messages.', tags: ['N8N', 'AI'] },
  { id: 'v6', title: 'PROCESS DOCUMENTATION', description: 'Clear write-ups of every workflow I build, so your team knows what runs, when, and why.', tags: ['SOPS'] },
];

export const experience = [
  {
    id: 'e0', role: 'Automation Developer', org: 'Freelance clients & in-house · Remote', period: 'June 2024–Present',
    bullets: [
      'Build and maintain workflow automations for clients using Zapier, Make.com, n8n, and HighLevel.',
      'Automated repetitive record-keeping and reporting tasks at my M Lhuillier branch alongside my Assistant Branch Manager role.',
      'Designed and built lead-capture workflows that send Google Forms responses into cleaned, formatted Google Sheets.',
      'Built instant Telegram alert workflows so teams hear about new inquiries within seconds.',
      'Created automatic, personalized Gmail confirmation emails triggered by new form submissions.',
      'Built Make.com router scenarios that sort incoming requests into sales, support, or general queues.',
      'Built this portfolio as a React app with a Supabase backend for contact messages, testimonials, and visit stats.',
    ],
    skills: 'Zapier, Make.com, n8n, HighLevel, Google Workspace, Telegram, Supabase, workflow design, testing, and documentation.',
  },
  {
    id: 'e1', role: 'Assistant Branch Manager', org: 'M Lhuillier Pawnshop · Philippines', period: '2023–2026',
    bullets: [
      'Supported daily branch operations and compliance procedures.',
      'Handled financial documentation and confidential records.',
      'Prepared operational and financial reports.',
      'Coordinated staff tasks and addressed customer concerns.',
    ],
    skills: null,
  },
  {
    id: 'e2', role: 'Contact Tracer', org: 'DILG Philippines', period: 'March–November 2020',
    bullets: [
      'Conducted contact tracing interviews and gathered essential case and contact details.',
      'Maintained organized monitoring records and helped validate information for follow-up actions.',
      'Handled sensitive health-related data with confidentiality, accuracy, and urgency.',
      'Supported coordination and communication with individuals and relevant teams during time-sensitive cases.',
    ],
    skills: 'communication, documentation, data validation, confidentiality, record management, and attention to detail.',
  },
  {
    id: 'e3', role: 'Statistical Researcher', org: 'Philippine Statistics Authority', period: 'July–December 2019',
    bullets: [
      'Assisted in data gathering, field validation, and completion of research and survey documents.',
      'Collected, reviewed, and encoded statistical information while helping ensure accuracy and completeness.',
      'Supported the organization of records and preparation of structured data for reporting and analysis.',
      'Worked with forms, numerical information, and documented responses with a high level of detail.',
    ],
    skills: 'research support, data entry, analytical thinking, data organization, validation, and structured reporting.',
  },
];
