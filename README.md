# TaskFlow

A personal task manager built with Next.js 14, Supabase, and deployed on Vercel.

**Live Demo:** _your-vercel-url.vercel.app_  
**GitHub:** _your-github-url_

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend + Backend | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## Features

- ✅ Real email/password authentication (sign up, login, logout)
- ✅ Create, edit, delete tasks
- ✅ Three statuses: Todo → In Progress → Done (click status badge to advance)
- ✅ Three priority levels: Low / Medium / High
- ✅ Optional due dates with overdue highlighting
- ✅ Filter tasks by status
- ✅ Dashboard stats overview
- ✅ Row Level Security — users only see their own data
- ✅ Fully deployed, live URL

---

## Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and fill in the details
3. Wait for it to provision (~2 minutes)

### 3. Run the database schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **Run**

### 4. Get your API keys

In your Supabase dashboard:
- Go to **Project Settings → API**
- Copy **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public key** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6. Configure Supabase Auth (important!)

In Supabase dashboard → **Authentication → URL Configuration**:
- Set **Site URL** to `http://localhost:3000`
- Add to **Redirect URLs**: `http://localhost:3000/auth/callback`

### 7. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `taskflow` repository
4. Vercel auto-detects Next.js — no config needed
5. Add **Environment Variables** (click "Environment Variables" section):

```
NEXT_PUBLIC_SUPABASE_URL      = your supabase project url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your supabase anon key
NEXT_PUBLIC_SITE_URL          = https://your-app.vercel.app
```

6. Click **Deploy**
7. Wait ~60 seconds — your app is live!

### Step 3 — Update Supabase Auth URLs

After deploying, update Supabase to allow your live domain:

In Supabase → **Authentication → URL Configuration**:
- Set **Site URL** to `https://your-app.vercel.app`
- Add to **Redirect URLs**:
  - `https://your-app.vercel.app/auth/callback`
  - `http://localhost:3000/auth/callback` (keep this for local dev)

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/tasks` | Fetch all tasks for logged-in user |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/user` | Get current user profile |
| POST | `/api/auth/logout` | Sign out |

---

## Project Structure

```
taskflow/
├── app/
│   ├── api/
│   │   ├── tasks/
│   │   │   ├── route.ts          # GET, POST /api/tasks
│   │   │   └── [id]/route.ts     # PATCH, DELETE /api/tasks/:id
│   │   ├── user/route.ts         # GET /api/user
│   │   └── auth/logout/route.ts  # POST /api/auth/logout
│   ├── auth/callback/route.ts    # Supabase OAuth callback
│   ├── dashboard/
│   │   ├── layout.tsx            # Auth-protected layout
│   │   └── page.tsx              # Dashboard page
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page
│   └── globals.css
├── components/
│   ├── DashboardShell.tsx        # Sidebar + nav
│   ├── TaskBoard.tsx             # Task list with filters
│   ├── TaskCard.tsx              # Individual task card
│   └── CreateTaskModal.tsx       # Create/edit modal
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   └── server.ts             # Server client
│   └── types.ts                  # TypeScript types
├── middleware.ts                  # Auth route protection
├── supabase-schema.sql            # DB schema (run once)
└── .env.local.example
```

---

## APIs / Services Used

| Service | Purpose | Cost |
|---------|---------|------|
| [Supabase](https://supabase.com) | Database + Auth | Free tier |
| [Vercel](https://vercel.com) | Deployment | Free tier |

That's it — only 2 external services needed.

---

## Disable Email Confirmation (Optional for Testing)

For easier testing/demo, you can disable email confirmation:

In Supabase → **Authentication → Providers → Email**:
- Toggle off **Confirm email**

Users will be logged in immediately after signup without needing to check their email.
