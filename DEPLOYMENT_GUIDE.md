# 🚀 Deployment Guide - Deploy ke Vercel

## 📋 Overview

Panduan lengkap untuk deploy **SalesForge AI** ke Vercel agar bisa diakses secara online oleh siapa saja.

---

## 🎯 Mengapa Vercel?

- ✅ **Gratis** untuk hobby projects
- ✅ **Optimized** untuk Next.js
- ✅ **Auto-deploy** dari GitHub
- ✅ **Global CDN** - Fast worldwide
- ✅ **SSL Certificate** - HTTPS otomatis
- ✅ **Easy setup** - Deploy dalam 5 menit
- ✅ **Environment variables** - Secure config

---

## 🚀 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Buat Akun Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"**
3. Login dengan **GitHub account** Anda
4. Authorize Vercel untuk akses GitHub

### Step 2: Import Project

1. Di Vercel Dashboard, klik **"Add New..."** → **"Project"**
2. Pilih repository: **`ai-sales-generate`**
3. Klik **"Import"**

### Step 3: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- Build Command: `prisma generate && next build`
- Output Directory: `.next`
- Install Command: `npm install`

**Root Directory:** `./` (leave as is)

### Step 4: Add Environment Variables

Klik **"Environment Variables"** dan tambahkan:

#### 1. DATABASE_URL (Pooled)
```
Key: DATABASE_URL
Value: postgresql://USER:PASSWORD@HOST-pooler.region.aws.neon.tech/DB?sslmode=require&pgbouncer=true&connect_timeout=10
```

#### 2. DIRECT_URL
```
Key: DIRECT_URL
Value: postgresql://USER:PASSWORD@HOST.region.aws.neon.tech/DB?sslmode=require&connect_timeout=10
```

#### 3. NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: YOUR_NEXTAUTH_SECRET_HERE
(Generate with: openssl rand -base64 32)
```

#### 4. NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://your-project-name.vercel.app
(Akan diupdate setelah deploy)
```

#### 5. ANTHROPIC_API_KEY
```
Key: ANTHROPIC_API_KEY
Value: sk-ant-api03-YOUR_ANTHROPIC_API_KEY_HERE
```

#### 6. NEXT_PUBLIC_APP_NAME (Optional)
```
Key: NEXT_PUBLIC_APP_NAME
Value: SalesForge AI
```

#### 7. NEXT_PUBLIC_APP_URL (Optional)
```
Key: NEXT_PUBLIC_APP_URL
Value: https://your-project-name.vercel.app
```

**Important:** Set all variables for **Production**, **Preview**, and **Development**

### Step 5: Deploy!

1. Klik **"Deploy"**
2. Wait 2-3 minutes untuk build & deploy
3. 🎉 Done! Your app is live!

### Step 6: Update NEXTAUTH_URL

1. Copy your deployment URL (e.g., `https://ai-sales-generate.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Edit **NEXTAUTH_URL** dan update dengan URL deployment Anda
4. Klik **"Save"**
5. Redeploy (Vercel akan auto-redeploy)

### Step 7: Run Database Migration

Setelah deploy, jalankan migration:

```bash
# Set DATABASE_URL environment variable
$env:DATABASE_URL="your-direct-url-here"

# Run migration
npx prisma db push
```

Atau gunakan Vercel CLI:
```bash
vercel env pull .env.production
npx prisma db push
```

---

## 🚀 Method 2: Deploy via Vercel CLI

### Step 1: Login to Vercel

```bash
vercel login
```

Follow the prompts to login.

### Step 2: Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Step 3: Set Environment Variables

```bash
# Add environment variables
vercel env add DATABASE_URL production
vercel env add DIRECT_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add ANTHROPIC_API_KEY production
```

### Step 4: Redeploy

```bash
vercel --prod
```

---

## 🔧 Post-Deployment Setup

### 1. Custom Domain (Optional)

**Add Custom Domain:**
1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `salesforge.com`)
3. Update DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)
5. Update `NEXTAUTH_URL` to your custom domain

### 2. Enable Analytics

1. Go to **Analytics** tab
2. Enable **Web Analytics**
3. Monitor traffic, performance, and errors

### 3. Setup Monitoring

1. Go to **Settings** → **Integrations**
2. Add monitoring tools:
   - Sentry (Error tracking)
   - LogRocket (Session replay)
   - Datadog (Performance monitoring)

---

## 🎯 Deployment Checklist

### Pre-Deployment:
- [x] Code pushed to GitHub
- [x] `.env.example` updated
- [x] Database schema finalized
- [x] All features tested locally
- [x] Documentation complete

### During Deployment:
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Build successful
- [ ] Deployment successful

### Post-Deployment:
- [ ] Database migration run
- [ ] NEXTAUTH_URL updated
- [ ] Test registration
- [ ] Test login
- [ ] Test AI generation
- [ ] Test all features
- [ ] Custom domain added (optional)
- [ ] Analytics enabled

---

## 🐛 Troubleshooting

### Build Failed

**Error:** `Prisma Client not generated`

**Solution:**
```bash
# Update build command in Vercel
prisma generate && next build
```

### Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
1. Check `DATABASE_URL` is correct
2. Ensure `sslmode=require` is present
3. Test connection locally first
4. Check Neon database is active

### NextAuth Error

**Error:** `[next-auth][error][NO_SECRET]`

**Solution:**
1. Ensure `NEXTAUTH_SECRET` is set
2. Ensure `NEXTAUTH_URL` matches deployment URL
3. Redeploy after updating

### API Route Timeout

**Error:** `Function execution timed out`

**Solution:**
1. Upgrade to Vercel Pro (60s timeout)
2. Optimize API routes
3. Use edge functions for faster response

---

## 📊 Vercel Plans

### Hobby (Free)
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ⚠️ 10s function timeout
- ⚠️ No custom domains (1 free)

### Pro ($20/month)
- ✅ Everything in Hobby
- ✅ 1 TB bandwidth/month
- ✅ 60s function timeout
- ✅ Unlimited custom domains
- ✅ Advanced analytics
- ✅ Password protection

**Recommendation:** Start with Hobby, upgrade if needed.

---

## 🌍 Deployment Regions

Vercel automatically deploys to global CDN, but you can specify primary region:

**Recommended for Indonesia/Asia:**
- `sin1` - Singapore (closest to Indonesia)
- `hkg1` - Hong Kong
- `syd1` - Sydney

**Set in `vercel.json`:**
```json
{
  "regions": ["sin1"]
}
```

---

## 🔄 Auto-Deploy from GitHub

Vercel automatically deploys when you push to GitHub:

**Main Branch:**
- Push to `main` → Auto-deploy to **Production**

**Other Branches:**
- Push to any branch → Auto-deploy to **Preview**

**Pull Requests:**
- Open PR → Auto-deploy **Preview** with unique URL

---

## 📝 Environment Variables Best Practices

### Security:
- ✅ Never commit `.env` to GitHub
- ✅ Use Vercel's encrypted storage
- ✅ Rotate secrets regularly
- ✅ Use different secrets for prod/dev

### Organization:
- ✅ Group related variables
- ✅ Use descriptive names
- ✅ Add comments in Vercel dashboard
- ✅ Document in `.env.example`

---

## 🎯 Performance Optimization

### 1. Enable Edge Functions
```typescript
// In API routes
export const runtime = 'edge';
```

### 2. Enable ISR (Incremental Static Regeneration)
```typescript
// In pages
export const revalidate = 3600; // 1 hour
```

### 3. Optimize Images
```typescript
// Use Next.js Image component
import Image from 'next/image';
```

### 4. Enable Caching
```typescript
// In API routes
res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
```

---

## 📈 Monitoring & Analytics

### Built-in Vercel Analytics:
1. Go to **Analytics** tab
2. View:
   - Page views
   - Unique visitors
   - Top pages
   - Referrers
   - Devices

### Custom Analytics:
Add Google Analytics, Plausible, or Umami for detailed insights.

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Use Vercel's encrypted storage
- ✅ Never expose in client-side code
- ✅ Use `NEXT_PUBLIC_` prefix only for public vars

### 2. API Routes
- ✅ Validate all inputs
- ✅ Use rate limiting
- ✅ Implement authentication
- ✅ Sanitize user data

### 3. Database
- ✅ Use connection pooling
- ✅ Enable SSL
- ✅ Regular backups
- ✅ Monitor for suspicious activity

---

## 🎉 Success!

Your app is now live! 🚀

**Share your deployment:**
- ✅ Update README with live URL
- ✅ Share on social media
- ✅ Add to portfolio
- ✅ Submit to showcases

**Example URLs:**
- Production: `https://ai-sales-generate.vercel.app`
- Preview: `https://ai-sales-generate-git-feature.vercel.app`
- Custom: `https://salesforge.ai`

---

## 📞 Support

**Vercel Documentation:**
- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/environment-variables)

**Community:**
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

**Last Updated:** 2026-04-28
**Status:** ✅ Ready to Deploy
**Estimated Time:** 10-15 minutes
