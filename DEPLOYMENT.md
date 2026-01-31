# Deploying Cyber Portfolio to Production with Cloudflare

## Architecture Overview

- **Frontend**: Cloudflare Pages (free tier available)
- **Backend**: Railway/Render (Node.js server)
- **Database**: PlanetScale or Railway MySQL

---

## Step 1: Set Up Database (PlanetScale - Free Tier)

1. Go to [PlanetScale](https://planetscale.com) and create an account
2. Create a new database called `cyber-portfolio`
3. Go to **Connect** → Select **Node.js** → Copy the connection string
4. It will look like: `mysql://username:password@aws.connect.psdb.cloud/cyber-portfolio?ssl={"rejectUnauthorized":true}`

---

## Step 2: Deploy Backend to Railway

### 2.1 Prepare the project

Your project is already configured correctly for deployment.

### 2.2 Deploy to Railway

1. Go to [Railway](https://railway.app) and sign up with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your portfolio repository
4. Railway will auto-detect the project

### 2.3 Configure Railway

In Railway dashboard, add these environment variables:

```
NODE_ENV=production
DATABASE_URL=<your-planetscale-connection-string>
PORT=3000
```

Add any other env variables your app needs (OAuth keys, API keys, etc.)

### 2.4 Set Build & Start Commands

In Railway settings:
- **Build Command**: `pnpm install && pnpm run build`
- **Start Command**: `pnpm start`

### 2.5 Get Your Backend URL

After deployment, Railway will give you a URL like:
`https://cyber-portfolio-production.up.railway.app`

---

## Step 3: Deploy Frontend to Cloudflare Pages

### 3.1 Build Frontend for Production

The frontend needs to know the backend URL. Create a `.env.production` file:

```bash
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

### 3.2 Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repository
4. Configure build settings:
   - **Framework preset**: Vite
   - **Build command**: `pnpm install && pnpm run build`
   - **Build output directory**: `dist/public`
   - **Root directory**: `/` (leave empty)

### 3.3 Add Environment Variables in Cloudflare

In Cloudflare Pages settings → Environment Variables:
```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

---

## Step 4: Connect Custom Domain with Cloudflare

### 4.1 Add Your Domain to Cloudflare

1. In Cloudflare Dashboard, click **Add a Site**
2. Enter your domain name (e.g., `yourdomain.com`)
3. Select the Free plan
4. Cloudflare will scan existing DNS records
5. Update your domain's nameservers at your registrar to:
   - `nameserver1.cloudflare.com`
   - `nameserver2.cloudflare.com`

### 4.2 Configure DNS Records

Add these DNS records in Cloudflare:

**For Frontend (Cloudflare Pages):**
| Type  | Name | Content                          | Proxy |
|-------|------|----------------------------------|-------|
| CNAME | @    | your-project.pages.dev           | ✅    |
| CNAME | www  | your-project.pages.dev           | ✅    |

**For API (Railway backend):**
| Type  | Name | Content                                    | Proxy |
|-------|------|--------------------------------------------|-------|
| CNAME | api  | cyber-portfolio-production.up.railway.app  | ✅    |

### 4.3 Update Backend URL

After setting up the `api` subdomain, update your frontend to use:
```
VITE_API_URL=https://api.yourdomain.com
```

---

## Step 5: Configure CORS on Backend

Make sure your backend allows requests from your frontend domain. The server should already handle this, but verify CORS is configured for your domain.

---

## Step 6: Enable Cloudflare Features (Optional)

In Cloudflare Dashboard:

1. **SSL/TLS** → Set to **Full (strict)**
2. **Speed** → Enable Auto Minify (JS, CSS, HTML)
3. **Caching** → Configure cache rules for static assets
4. **Security** → Enable Bot Fight Mode
5. **Page Rules** → Add caching rules

---

## Quick Deploy Commands

```bash
# Build the project locally to test
pnpm run build

# Run production build locally
pnpm start

# Push to GitHub (triggers auto-deploy)
git add .
git commit -m "Ready for production"
git push origin main
```

---

## Environment Variables Checklist

### Backend (Railway)
- `NODE_ENV=production`
- `DATABASE_URL=<mysql-connection-string>`
- `PORT=3000`
- Any OAuth/API keys your app uses

### Frontend (Cloudflare Pages)
- `VITE_API_URL=https://api.yourdomain.com`

---

## Troubleshooting

### Build Fails on Cloudflare
- Ensure `pnpm-lock.yaml` is committed
- Check Node.js version (add `engines` to package.json if needed)

### CORS Errors
- Verify backend CORS allows your frontend domain
- Check that API URL doesn't have trailing slash

### Database Connection Issues
- Verify DATABASE_URL is correct
- Ensure SSL is enabled for PlanetScale connections

---

## Cost Estimates (Monthly)

| Service | Free Tier | Paid |
|---------|-----------|------|
| Cloudflare Pages | ✅ 500 builds/month | $20/month |
| Railway | ✅ $5 credit | ~$5-10/month |
| PlanetScale | ✅ 1 database | $29/month |

**Total: $0-15/month for small traffic sites**
