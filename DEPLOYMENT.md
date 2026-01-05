# Deployment Guide for Lukulu Day Secondary School Portal

## Overview
The application is designed as a "Monolithic" deployment for simplicity.
- **Frontend**: React (built to static files).
- **Backend**: Node.js/Express (serves API *and* static frontend files).
- **Database**: PostgreSQL.

This means you only need to run ONE server process to host the entire website.

## 1. Local Production Test
To simulate the production environment on your machine:

1.  **Build the Frontend**:
    ```bash
    cd client
    npm run build
    ```
    This creates a `dist` folder with optimized HTML/CSS/JS.

2.  **Run the Backend**:
    ```bash
    cd server
    npm run dev
    ```
    (Or `npm start` if configured).

3.  **Visit**: `http://localhost:5000`
    You will see the fully optimized website served by Express.

## 2. Cloud Deployment (Railway / Render / Heroku)

### Prerequisites
- A GitHub repository containing this project.
- A Cloud Database (e.g., Railway PostgreSQL, Supabase, or Neon).

### Steps (Example for Railway)
1.  **Push code** to GitHub.
2.  **Create New Project** on Railway from GitHub repo.
3.  **Variable Setup**:
    Add the following Environment Variables in Railway:
    - `DATABASE_URL`: `postgres://...` (Connection string)
    - `JWT_SECRET`: `your_secure_random_string`
    - `PORT`: `5000` (Optional, Railway sets generic PORT usually)
4.  **Build Command**:
    Railway needs to know how to build both. You can use a root `package.json` or configure the settings.
    **Recommended**: Deploy the `server` directory as the root.
    - Start Command: `npm start` (You need to ensure `npm start` in server builds the client too, OR just check in the `client/dist` folder).
    
    *Better Approach:*
    - Add a `postinstall` script in `server/package.json`:
      `"postinstall": "cd ../client && npm install && npm run build"`
    - This ensures the client is built whenever the server is deployed.

### 3. VPS Deployment (Ubuntu/DigitalOcean)
1.  **Install Node.js & PostgreSQL**.
2.  **Clone Repo**.
3.  **Build**:
    `cd client && npm install && npm run build`
    `cd ../server && npm install`
4.  **env**: Create `.env` file in server.
5.  **Process Manager**: Use PM2 to keep it running.
    `npm install -g pm2`
    `pm2 start src/index.ts --interpreter ts-node --name ldss`
6.  **Reverse Proxy**: Use Nginx to forward port 80 to 5000.
