# Deployment Guide for LDSS Portals

This guide walks you through deploying the Lukulu Day Secondary School website and portals.

## Prerequisites
1.  **GitHub Account**: You need to embrace the code in a GitHub repository.
2.  **Render Account**: For hosting the backend server (Node.js).
3.  **Netlify Account**: For hosting the frontend website (React/Vite).
4.  **Supabase/Neon Account**: For a production PostgreSQL database (Render has one too, but Supabase offers a generous free tier).

---

## Part 1: Database Setup (Supabase Recommended)
1.  Create a project on [Supabase](https://supabase.com).
2.  Go to **Settings > Database > Connection Strings**.
3.  **Get Connection String**:
    *   **Method A (Easiest)**: Look for the **"Connect"** button in the top-right corner of the dashboard. Click it, select **"ORMs"** -> **"Prisma"**, or just copy the URI.
    *   **Method B**: Go to **Project Settings** (Cog icon) > **Database**. Scroll down to **Connection String**. Switch to "URI" mode.
4.  Copy the **URI**. It looks like: `postgresql://postgres.[ref]:[password]@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true` (or similar).
5.  **Important**: You must replace `[password]` (or the placeholder) with the *actual database password* you set when creating the project. Detailed instructions: [Supabase Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-strings).
6.  Save this; you will need it for the Backend Environment Variables.

---

## Part 2: Backend Deployment (Render)
1.  Log in to [Render](https://render.com).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Select the **Server** folder/root (If your repo has `server` folder, you might need to specify Root Directory as `server`).
    *   **Runtime**: Node
    *   **Build Command**: `npm install && npx prisma generate && tsc`
        *   *If running from root with subfolders:* `cd server && npm install && npx prisma generate && tsc`
    *   **Start Command**: `node dist/index.js`
        *   *If running from root with subfolders:* `cd server && node dist/index.js`
5.  **Environment Variables**:
    *   `DATABASE_URL`: (Paste your Supabase connection string from Part 1)
    *   `JWT_SECRET`: (Generate a strong random string)
    *   `NODE_ENV`: `production`
6.  Click **Deploy Web Service**.
7.  Once live, copy the **Render URL** (e.g., `https://ldss-server.onrender.com`).

---

## Part 3: Frontend Deployment (Netlify)
1.  Log in to [Netlify](https://netlify.com).
2.  Click **Add new site** > **Import an existing project**.
3.  Connect to GitHub and select your repository.
4.  **Build Settings**:
    *   **Base directory**: `client`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `client/dist`
5.  **Environment Variables**:
    *   `VITE_API_URL`: (Paste your Render URL from Part 2, e.g., `https://ldss-server.onrender.com`)
        *   *Note: Do NOT include a trailing slash.*
6.  Click **Deploy site**.

---

## Part 4: Final Database Migration
Once the backend is live, it might fail initially because the database is empty. You need to push your schema.

**Option A: Run locally pointing to Prod DB**
1.  In your local VS Code, open `server/.env`.
2.  Temporarily replace `DATABASE_URL` with your **Supabase URL**.
3.  Run: `npx prisma db push` inside the `server` folder.
4.  (Optional) Run seed script: `npx tsx src/seed.ts` to create admin user.
5.  Change your local `.env` back to localhost.

**Option B: Add Migration Command to Render**
-   Update Build Command to: `npm install && npx prisma generate && npx prisma db push && tsc` (Not recommended for every build, but good for first time).

---

## Troubleshooting
-   **CORS Errors**: If the frontend can't talk to the backend, ensure your Backend code allows the Netlify domain.
    -   In `server/index.ts`, check `cors({ origin: '*' })` is set or update it to your specific Netlify URL.
-   **Images**: Uploads are stored on the disk in `server/uploads`. On free Render tiers, **disk storage is ephemeral** (files disappear after restart).
    -   *Solution*: For a real production app, you should use AWS S3 or Supabase Storage for files. The current local file system implementation is for demonstration/MVP.

Good luck! 🚀
