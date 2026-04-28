# 🚀 Deploy NOW - Quick Guide

Deploy aplikasi Anda ke internet dalam **10 menit**!

---

## ⚡ Quick Deploy (Vercel Dashboard)

### 1. Buka Vercel
👉 [vercel.com/new](https://vercel.com/new)

### 2. Import Repository
- Login dengan GitHub
- Pilih repository: **`ai-sales-generate`**
- Klik **Import**

### 3. Configure
**Framework:** Next.js ✅ (auto-detected)

**Build Command:**
```
prisma generate && next build
```

### 4. Add Environment Variables

Klik **Environment Variables** dan tambahkan 5 variables ini:

| Key | Value | Where to Get |
|-----|-------|--------------|
| `DATABASE_URL` | `postgresql://...` | [Neon Console](https://console.neon.tech) - Pooled URL |
| `DIRECT_URL` | `postgresql://...` | [Neon Console](https://console.neon.tech) - Direct URL |
| `NEXTAUTH_SECRET` | Generate new | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Will update after deploy |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | [Anthropic Console](https://console.anthropic.com) |

**Important:** Set for **Production**, **Preview**, and **Development**

### 5. Deploy!
Klik **Deploy** → Wait 2-3 minutes → ✅ Done!

### 6. Update NEXTAUTH_URL
1. Copy your deployment URL
2. Go to **Settings** → **Environment Variables**
3. Edit `NEXTAUTH_URL` → Paste your URL
4. Save → Auto-redeploy

### 7. Run Database Migration
```bash
# Set your DIRECT_URL
$env:DATABASE_URL="your-direct-url"

# Push schema
npx prisma db push
```

---

## 🎉 Your App is LIVE!

**URL:** `https://your-project-name.vercel.app`

### Test It:
1. ✅ Open URL in browser
2. ✅ Register new account
3. ✅ Login
4. ✅ Create sales page
5. ✅ Share with friends!

---

## 🚀 Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📝 Checklist

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] NEXTAUTH_URL updated
- [ ] Database migration run
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested AI generation
- [ ] Shared with friends! 🎉

---

## 🐛 Troubleshooting

### Build Failed?
- Check build command: `prisma generate && next build`
- Check all environment variables are set

### Can't Login?
- Update `NEXTAUTH_URL` to your deployment URL
- Redeploy after updating

### Database Error?
- Run `npx prisma db push` with DIRECT_URL
- Check database is active in Neon

---

## 📚 Need Help?

- **Full Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues:** [Report Issue](https://github.com/Wsarrayyan/ai-sales-generate/issues)

---

**Ready? Let's deploy! 🚀**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wsarrayyan/ai-sales-generate)
