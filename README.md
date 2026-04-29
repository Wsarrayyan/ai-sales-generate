# 🚀 SalesForge AI - AI-Powered Sales Page Generator

> Generate professional, conversion-optimized sales pages in seconds using AI

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.6-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Overview

**SalesForge AI** adalah aplikasi web yang menggunakan AI (Google Gemini & Groq) untuk membuat sales page yang profesional, persuasif, dan conversion-optimized dalam hitungan detik. Cukup input informasi produk Anda, pilih template dan bahasa, lalu biarkan AI membuat sales page yang sempurna!

### ✨ Key Features

- 🤖 **AI-Powered Generation** - Menggunakan Gemini 2.0 Flash & Groq untuk copywriting berkualitas tinggi
- 🌍 **Multi-Language Support** - Indonesia, English, Melayu dengan auto-translation
- 🎨 **4 Premium Templates** - Modern, Bold, Minimal, Luxury
- 📝 **Smart Feature Descriptions** - AI membuat deskripsi spesifik untuk setiap fitur
- ⚡ **Real-time Preview** - Lihat hasil langsung sebelum publish
- 📤 **Export to HTML** - Download sebagai standalone HTML file
- 🔐 **User Authentication** - Secure login dengan NextAuth.js
- 💾 **Database Storage** - Simpan dan kelola semua sales pages Anda
- 🎯 **DEMO Mode** - Fallback template jika API credit habis
- ⏳ **Advanced Loading States** - Visual feedback yang engaging

---

## 🎯 Demo

**Live Demo:** [Coming Soon]

### Screenshots

#### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

#### Create Sales Page
![Create](docs/screenshots/create.png)

#### Preview
![Preview](docs/screenshots/preview.png)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Database (via Neon Tech)
- **NextAuth.js** - Authentication solution

### AI & Services
- **Google Gemini 2.0 Flash** - Primary AI (FREE 1,500/day)
- **Groq (Llama 3.3 70B)** - Fallback AI (FREE 14,400/day)
- **Neon Tech** - Serverless PostgreSQL
- **Vercel** - Deployment platform

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (recommend Neon Tech)
- Google Gemini API key (FREE) or Groq API key (FREE)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Wsarrayyan/ai-sales-generate.git
   cd ai-sales-generate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your credentials:
   ```env
   # Database (Neon Tech)
   DATABASE_URL="postgresql://user:pass@host-pooler.region.aws.neon.tech/db?sslmode=require&pgbouncer=true&connect_timeout=10"
   DIRECT_URL="postgresql://user:pass@host.region.aws.neon.tech/db?sslmode=require&connect_timeout=10"

   # NextAuth
   NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
   NEXTAUTH_URL="http://localhost:3000"

   # AI Providers (Fallback System)
   GOOGLE_API_KEY="your-google-api-key"  # Priority 1 (FREE 1,500/day)
   GROQ_API_KEY="your-groq-api-key"      # Priority 2 (FREE 14,400/day)
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

---

## 📚 Documentation

Comprehensive documentation available in the `/docs` folder:

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[NEON_SETUP.md](./NEON_SETUP.md)** - Database setup with Neon Tech
- **[MULTI_LANGUAGE_FEATURE.md](./MULTI_LANGUAGE_FEATURE.md)** - Multi-language & auto-translation
- **[AI_VS_TEMPLATE_FEATURES.md](./AI_VS_TEMPLATE_FEATURES.md)** - AI vs Template mode comparison
- **[LOADING_STATES_FEATURE.md](./LOADING_STATES_FEATURE.md)** - Advanced loading states
- **[AI_SETUP_GUIDE.md](./AI_SETUP_GUIDE.md)** - Setup Gemini & Groq API keys (FREE)
- **[CHECKLIST.md](./CHECKLIST.md)** - Troubleshooting guide
- **[DOCS_INDEX.md](./DOCS_INDEX.md)** - Complete documentation index

---

## 🎨 Features in Detail

### 1. AI-Powered Generation

Generate professional sales pages with:
- Compelling headlines & subheadlines
- Persuasive product descriptions
- Benefit-focused features
- Social proof & testimonials
- Pricing sections with CTAs
- FAQ sections

### 2. Multi-Language Support

- 🇮🇩 **Bahasa Indonesia**
- 🇬🇧 **English**
- 🇲🇾 **Bahasa Melayu**

**Auto-Translation:** Fill form in any language, AI translates to your target language!

### 3. Smart Feature Descriptions

AI analyzes feature titles and generates specific, contextual descriptions:

```
Input: "Materi Dasar Python"
Output: "Pelajari fondasi penting Python yang mudah dipahami. 
         Dari syntax hingga data types, semua dijelaskan step-by-step."
```

### 4. Premium Templates

- **Modern** - Clean & professional
- **Bold** - High energy & impact
- **Minimal** - Elegant simplicity
- **Luxury** - Premium & refined

### 5. DEMO Mode

No API credit? No problem! Automatic fallback to template-based generation.

---

## 💰 Pricing & Cost

### AI API Cost (FREE Tier Available!)

**Google Gemini 2.0 Flash:**
- **FREE:** 1,500 requests/day (reset daily)
- **Paid:** $0.075 per 1M tokens (200x cheaper!)

**Groq (Llama 3.3 70B):**
- **FREE:** 14,400 requests/day (reset daily)
- **Paid:** $0.59 per 1M tokens

**Total FREE:** 15,900 generations/day! 🎉

### Demo Mode (Always Available)
- Unlimited generations
- Template-based content
- All features available
- No API key needed

---

## 🔧 Configuration

### Database (Neon Tech)

Get connection URLs from [Neon Console](https://console.neon.tech):

```env
# Pooled URL (for queries)
DATABASE_URL="postgresql://...@host-pooler...?pgbouncer=true"

# Direct URL (for migrations)
DIRECT_URL="postgresql://...@host..."
```

### Google Gemini API

Get FREE API key from [Google AI Studio](https://aistudio.google.com/app/apikey):

```env
GOOGLE_API_KEY="AIzaSy..."
```

### Groq API

Get FREE API key from [Groq Console](https://console.groq.com/keys):

```env
GROQ_API_KEY="gsk_..."
```

### NextAuth

Generate secret:
```bash
openssl rand -base64 32
```

---

## 📊 Project Structure

```
ai-sales-generator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication
│   │   │   ├── generate/      # AI generation
│   │   │   └── sales-pages/   # CRUD operations
│   │   ├── auth/              # Auth pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── forms/             # Form components
│   │   ├── layout/            # Layout components
│   │   ├── sales-page/        # Sales page components
│   │   └── ui/                # UI components
│   ├── lib/                   # Utilities
│   │   ├── ai.ts              # AI integration
│   │   ├── auth.ts            # Auth config
│   │   └── prisma.ts          # Database client
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── docs/                      # Documentation
```

---

## 🧪 Testing

### Test Database Connection
```bash
npm run db:test
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (already done!)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Set Environment Variables**
   ```
   DATABASE_URL
   DIRECT_URL
   NEXTAUTH_SECRET
   NEXTAUTH_URL (your-domain.vercel.app)
   GOOGLE_API_KEY (optional but recommended)
   GROQ_API_KEY (optional but recommended)
   ```

4. **Deploy!**
   ```bash
   vercel --prod
   ```

### Database Migration

After deployment, run:
```bash
npx prisma db push
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google** - For Gemini 2.0 Flash AI
- **Groq** - For fast Llama inference
- **Neon Tech** - For serverless PostgreSQL
- **Vercel** - For hosting platform
- **Next.js Team** - For the awesome framework

---

## 📞 Support

- **Documentation:** [DOCS_INDEX.md](./DOCS_INDEX.md)
- **Issues:** [GitHub Issues](https://github.com/Wsarrayyan/ai-sales-generate/issues)
- **Email:** [your-email@example.com]

---

## 🎯 Roadmap

- [ ] More language support (Spanish, French, German)
- [ ] More templates (10+ templates)
- [ ] A/B testing feature
- [ ] Analytics dashboard
- [ ] Custom domain support
- [ ] Team collaboration
- [ ] API access for developers

---

## ⭐ Star History

If you find this project useful, please consider giving it a star!

[![Star History Chart](https://api.star-history.com/svg?repos=Wsarrayyan/ai-sales-generate&type=Date)](https://star-history.com/#Wsarrayyan/ai-sales-generate&Date)

---

**Made with ❤️ by [Wsarrayyan](https://github.com/Wsarrayyan)**

**Powered by Google Gemini & Groq AI** 🤖
