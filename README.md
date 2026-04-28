# SalesForge AI — AI Sales Page Generator

> Task submission untuk PT Dakwah Digital

## 🚀 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Database | **PostgreSQL** via Prisma ORM |
| Auth | **NextAuth.js** (credentials) |
| AI | **Anthropic Claude** (claude-opus-4-5) |
| Deploy | **Vercel** + **Neon/Supabase** (PostgreSQL) |

## 📋 Fitur yang Diimplementasikan

### Wajib ✅
- [x] **User Authentication** — Register, Login, Logout dengan JWT session
- [x] **Product Input Form** — Nama, deskripsi, fitur (tag input), target audience, harga, USP
- [x] **AI Sales Page Generation** — Headline, sub-headline, deskripsi, benefit, fitur, testimonial (placeholder), harga, CTA
- [x] **Rendered Output** — Sales page ditampilkan sebagai styled landing page, bukan raw text
- [x] **Saved Pages** — Semua halaman tersimpan di database, bisa view/edit/delete
- [x] **Live Preview** — Preview mode menyerupai landing page nyata

### Bonus ✅
- [x] **Export HTML** — Download sebagai file HTML standalone siap deploy
- [x] **4 Design Templates** — Modern, Bold, Minimal, Luxury
- [x] **Re-generate** — Edit form dan generate ulang kapan saja

## 🛠️ Setup Lokal

### 1. Clone & Install
```bash
git clone <repo-url>
cd ai-sales-generator
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi Neon:
```env
# Pooled Connection (untuk queries)
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10"

# Direct Connection (untuk migrations)
DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require&connect_timeout=10"

NEXTAUTH_SECRET="generate-dengan: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="sk-ant-xxxx"
```

📖 **Lihat [NEON_SETUP.md](./NEON_SETUP.md) untuk panduan lengkap setup Neon**

### 3. Setup Database
```bash
# Push schema ke database
npm run db:push

# Atau dengan migration (untuk production)
npm run db:migrate
```

### 4. Jalankan
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy ke Vercel + Neon (Rekomendasi)

### Database (Neon — Free Tier)
1. Buat akun di [neon.tech](https://neon.tech)
2. Buat project baru (pilih region terdekat: Singapore/Asia)
3. Copy **Pooled Connection URL** untuk `DATABASE_URL`
4. Copy **Direct Connection URL** untuk `DIRECT_URL`
5. Tambahkan parameter: `&pgbouncer=true&connect_timeout=10` ke DATABASE_URL

📖 **Panduan lengkap: [NEON_SETUP.md](./NEON_SETUP.md)**

### Deploy ke Vercel
```bash
npm install -g vercel
vercel

# Tambah environment variables di Vercel Dashboard:
# DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, ANTHROPIC_API_KEY
```

### Setelah deploy, jalankan db push:
```bash
DATABASE_URL="..." npx prisma db push
```

---

## 📁 Struktur Project

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth + Register endpoint
│   │   ├── generate/      # AI generation endpoint
│   │   └── sales-pages/   # CRUD + Export endpoints
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── page.tsx       # Dashboard list
│   │   ├── new/           # Buat baru
│   │   └── [id]/          # Preview + Edit
│   └── page.tsx           # Landing page
├── components/
│   ├── forms/             # ProductInputForm
│   ├── layout/            # Navbar, Providers
│   └── sales-page/        # Preview, Card, Toolbar
├── lib/
│   ├── ai.ts              # Anthropic integration
│   ├── auth.ts            # NextAuth config
│   └── prisma.ts          # Prisma client
└── types/                 # TypeScript types
```

## 🧠 Pendekatan AI

Prompt dirancang untuk menghasilkan JSON terstruktur dengan:
- Copywriting yang persuasif dan conversion-focused
- Konten disesuaikan dengan target audience
- Support multi-bahasa (ikuti bahasa deskripsi input)
- Section-level regeneration support (bonus)

Model: `claude-opus-4-5` untuk kualitas copywriting terbaik.

---

*Built by [Nama Anda] for PT Dakwah Digital Technical Assessment*
