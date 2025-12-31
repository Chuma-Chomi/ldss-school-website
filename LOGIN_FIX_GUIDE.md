# Login Issue Fix Guide

## Issues Found and Fixed ✅

### 1. **Backend URL Mismatch** (CRITICAL - FIXED)
**Problem:** The Netlify proxy was pointing to a different backend URL than what you configured.
- Frontend `.env.production`: `https://ldss-backend.onrender.com`
- Netlify proxy (netlify.toml): `https://ldss-backend-5tl3.onrender.com` ❌

**Fix Applied:** Updated `frontend/netlify.toml` to use the correct URL: `https://ldss-backend.onrender.com`

### 2. **CORS Configuration** (FIXED)
**Problem:** Backend CORS was too restrictive and dependent on `NODE_ENV` which might not be set correctly on Render.

**Fix Applied:** 
- Made CORS more permissive for Netlify domains
- Added better logging to debug CORS issues
- Now allows all `*.netlify.app` domains dynamically

### 3. **Enhanced Debugging**
Added console logging throughout the authentication flow to help diagnose issues.

---

## Deployment Steps to Apply Fixes

### Step 1: Redeploy Backend to Render
The backend code has been updated with better CORS configuration. You need to redeploy it.

**Option A: Auto-deploy via Git (Recommended)**
1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Fix CORS configuration for Netlify login"
   git push
   ```
2. Render will automatically detect the push and redeploy (if auto-deploy is enabled)
3. Wait 3-5 minutes for deployment to complete

**Option B: Manual redeploy on Render**
1. Go to https://render.com
2. Find your `ldss-backend` service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete

### Step 2: Verify Backend Environment Variables
Make sure these environment variables are set on Render:

1. Go to your Render dashboard → `ldss-backend` → Environment
2. Verify these are set:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Any secure random string (e.g., `super-secret-ldss-key`)
   - `PORT`: 4000 (usually auto-set by Render)
   - `NODE_ENV`: `production` (optional but recommended)

### Step 3: Redeploy Frontend to Netlify
The frontend's netlify.toml has been updated with the correct backend URL.

**Option A: Auto-deploy via Git (Recommended)**
1. If you haven't already, commit and push:
   ```bash
   git add .
   git commit -m "Fix Netlify proxy backend URL"
   git push
   ```
2. Netlify will automatically detect and redeploy
3. Wait 2-3 minutes for deployment

**Option B: Manual deploy with Netlify CLI**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Step 4: Verify Netlify Configuration
1. Go to https://app.netlify.com
2. Find your site (lukuludaysecondaryschool.netlify.app)
3. Go to Site Configuration → Environment Variables
4. Verify `VITE_API_URL` is set to: `https://ldss-backend.onrender.com`

---

## Testing the Login

### Test 1: Check Backend is Running
Open in browser: https://ldss-backend.onrender.com

You should see:
```json
{"message": "LDSS API is running"}
```

If you get a timeout or error, the backend might be sleeping (Render free tier). Wait 30 seconds and try again.

### Test 2: Test Backend Login Directly
Use this test HTML file or Postman to test the backend directly:

```bash
# Test with curl (PowerShell)
$body = @{
    identifier = "202501"
    password = "LDSSadmin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://ldss-backend.onrender.com/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

Expected response: Should return a token and user info.

### Test 3: Check Frontend Login
1. Go to: https://lukuludaysecondaryschool.netlify.app
2. Open browser DevTools (F12) → Console tab
3. Try logging in with:
   - **Admin:** ID: `202501`, Password: `LDSSadmin123`
   - **Staff:** ID: `20250015001`, Password: `LDSSstaff123`
   - **Learner:** ID: `202500123456`, Password: `LDSS2025`
4. Watch the Console for debug messages

---

## Common Issues and Solutions

### Issue: "CORS blocked origin"
**Check:**
1. Backend logs on Render (check what origin is being blocked)
2. Make sure backend is redeployed with new CORS config
3. Verify Netlify site URL matches one of the allowed origins

**Quick Fix:** Add your exact Netlify URL to the backend's allowed origins list

### Issue: "Invalid credentials - User not found"
**Reason:** Database doesn't have test users

**Solution:** You need to seed the database with users. Check if you have a seed endpoint:
```bash
# Check if seed endpoint exists
Invoke-WebRequest -Uri "https://ldss-backend.onrender.com/api/seed/users" -Method POST
```

### Issue: Login form submits but nothing happens
**Check:**
1. Open DevTools → Network tab
2. Try logging in
3. Look for the `/api/auth/login` request
4. Check Status Code:
   - **200:** Login successful (check Console for errors)
   - **401:** Wrong credentials
   - **404:** Backend not responding or wrong URL
   - **500:** Backend error (check Render logs)

### Issue: Render backend keeps sleeping
**Reason:** Free tier sleeps after 15 minutes of inactivity

**Solutions:**
1. **Wait 30 seconds** for it to wake up after first request
2. Use a uptime monitoring service (like UptimeRobot) to ping it every 10 minutes
3. Upgrade to paid plan

---

## Verify Current Configuration

### Backend (`backend/src/index.ts`)
- ✅ CORS allows `https://lukuludaysecondaryschool.netlify.app`
- ✅ CORS allows all `*.netlify.app` domains
- ✅ CORS has better logging for debugging

### Frontend (`frontend/netlify.toml`)
- ✅ Proxy redirects `/api/*` to `https://ldss-backend.onrender.com/api/*`
- ✅ SPA redirect for client-side routing

### Environment Variables
- ✅ Frontend `.env.production`: `VITE_API_URL=https://ldss-backend.onrender.com`

---

## Next Steps

1. ✅ **Commit and push changes**
2. ✅ **Wait for Render to redeploy backend** (3-5 min)
3. ✅ **Wait for Netlify to redeploy frontend** (2-3 min)
4. 🔍 **Test the login** with browser DevTools open
5. 📊 **Check logs** on Render dashboard if issues persist

---

## Getting More Help

If login still doesn't work after redeployment:

1. Check Render logs:
   - Go to Render dashboard → ldss-backend → Logs
   - Look for errors or "CORS blocked" messages

2. Check Netlify deploy logs:
   - Go to Netlify dashboard → Deploys → Latest deploy
   - Look for build errors

3. Share error messages from:
   - Browser DevTools Console
   - Browser DevTools Network tab
   - Render backend logs
