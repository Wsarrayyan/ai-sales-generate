# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan aplikasi dalam 5 menit.

## ⚡ Setup Cepat (5 Menit)

### 1. Clone & Install (1 menit)
```bash
git clone <repo-url>
cd ai-sales-generator
npm install
```

### 2. Setup Environment (2 menit)

**Copy file .env:**
```bash
cp .env.example .env
```

**Edit `.env` dan isi:**

#### A. Database (Neon Tech)
1. Buka [console.neon.tech](https://console.neon.tech)
2. Login/Register
3. Klik project Anda
4. Copy **Connection String** (ada 2 jenis):

**Pooled URL** (untuk DATABASE_URL):
```
postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require
```

**Direct URL** (untuk DIRECT_URL):
```
postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require
```

**Update di .env:**
```env
DATABASE_URL="<pooled-url>&pgbouncer=true&connect_timeout=10"
DIRECT_URL="<direct-url>&connect_timeout=10"
```

#### B. NextAuth Secret
```bash
# Generate secret
openssl rand -base64 32

# Copy hasil ke .env
NEXTAUTH_SECRET="hasil-dari-command-di-atas"
NEXTAUTH_URL="http://localhost:3000"
```

#### C. AI API Keys (FREE!)

**Option 1: Google Gemini (Recommended)**
1. Buka [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Login dengan Google Account
3. Klik "Create API Key"
4. Copy ke .env:
```env
GOOGLE_API_KEY="AIzaSy..."
```

**Option 2: Groq (Alternative)**
1. Buka [console.groq.com](https://console.groq.com)
2. Sign up & verify email
3. Create API Key
4. Copy ke .env:
```env
GROQ_API_KEY="gsk_..."
```

**Note:** Setup minimal 1 API key. Untuk best experience, setup keduanya!

### 3. Setup Database (1 menit)
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# Test koneksi (optional)
npm run db:test
```

### 4. Run! (1 menit)
```bash
npm run dev
```

Buka browser: **http://localhost:3000** 🎉

---

## ✅ Verifikasi

Jika berhasil, Anda akan lihat:
```
▲ Next.js 15.3.1
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

**Test aplikasi:**
1. Buka http://localhost:3000
2. Klik "Get Started" atau "Register"
3. Buat akun baru
4. Login
5. Buat sales page pertama Anda!

---

## 🐛 Troubleshooting Cepat

### Error: "Module 'uninstaller' requires a loader"
```bash
npx prisma generate
rm -rf .next
npm run dev
```

### Error: "Can't reach database server"
1. Cek `DATABASE_URL` di `.env`
2. Pastikan ada `sslmode=require`
3. Test: `npm run db:test`

### Error: "Connection timeout"
Tambahkan `connect_timeout=10` di connection string:
```env
DATABASE_URL="postgresql://...?sslmode=require&connect_timeout=10"
```

### Error: "Too many connections"
Pastikan menggunakan **Pooled URL** (dengan `-pooler` di hostname):
```env
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/..."
```

---

## 📚 Dokumentasi Lengkap

- **Setup Neon:** [NEON_SETUP.md](./NEON_SETUP.md)
- **Checklist:** [CHECKLIST.md](./CHECKLIST.md)
- **README:** [README.md](./README.md)

---

## 🎯 Next Steps

Setelah aplikasi berjalan:

1. **Explore Features:**
   - Buat sales page baru
   - Coba berbagai template (Modern, Bold, Minimal, Luxury)
   - Export ke HTML
   - Edit dan regenerate sections

2. **Customize:**
   - Edit template di `src/components/sales-page/`
   - Tambah template baru
   - Customize AI prompt di `src/lib/ai.ts`

3. **Deploy:**
   - Deploy ke Vercel: `vercel`
   - Setup environment variables di Vercel dashboard
   - Run `npx prisma db push` di production

---

**Butuh bantuan?** Lihat [CHECKLIST.md](./CHECKLIST.md) untuk troubleshooting lengkap.

**Happy coding! 🚀**
