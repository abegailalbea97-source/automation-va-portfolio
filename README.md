# automation-va-portfolio

Abegail Albea's Automation VA portfolio: a React (Vite) site that works on phones, with Supabase for the contact form, editable content, testimonials, and visit stats.

Live site: https://automation-va-portfolio.vercel.app

## Run it on your computer

```powershell
npm install
npm run dev        # opens a local preview at http://localhost:5173
npm run build      # production build into dist/
```

## Connect Supabase (one-time setup)

1. **Create the tables.** In Supabase, open **SQL Editor → New query**, paste all of [supabase/schema.sql](supabase/schema.sql), and click **Run**. This creates the tables, the security rules, and your current content.
2. **Copy your keys.** In **Project Settings → API Keys**, copy the **Project URL** and the **anon / publishable** key. Never use the `service_role` / secret key in this site.
3. **Local:** copy `.env.example` to `.env.local` and paste both values in.
4. **Vercel:** in your Vercel project, open **Settings → Environment Variables** and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Then redeploy.

Without the keys, the site still works with its built-in content. The forms then ask visitors to email you instead.

## Day-to-day use (all in Supabase → Table Editor)

| What | Table | How |
| --- | --- | --- |
| Read new client messages | `contact_messages` | Newest at the bottom. Tick `handled` when you've replied. |
| Approve feedback | `testimonials` | Set `approved` to `true` to show it on the site. |
| Edit projects, services, skills, certificates, experience | `projects`, `services`, `skills`, `certificates`, `experience` | Edit any cell. `sort_order` sets the order. Set `published` to `false` to hide a row. |
| See visit stats | `events` | Or run the query below. |

**Tip:** get an email for every new message under **Database → Webhooks**, or connect Zapier or Make to the `contact_messages` table.

### Stats query (SQL Editor)

```sql
select date_trunc('day', created_at)::date as day,
       count(*) filter (where type = 'page_view')        as visits,
       count(*) filter (where type = 'demo_open')        as demos_opened,
       count(*) filter (where type = 'cta_click')        as button_clicks,
       count(*) filter (where type = 'certificate_open') as certificates_opened
from events
group by 1
order by 1 desc
limit 30;
```

Stats are anonymous: no IP addresses, no cookies, and visitors with "Do Not Track" turned on aren't counted.

## Project layout

- `src/components/`: page sections (Hero, Projects, Contact, and so on)
- `src/data/defaults.js`: built-in content, used before Supabase loads or if it's unreachable
- `src/lib/`: Supabase client, stats tracking, and form helpers
- `public/`: images and certificate PDFs
- `supabase/schema.sql`: database tables and security rules
