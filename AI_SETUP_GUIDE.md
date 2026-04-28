# 🚀 AI Setup Guide - Fallback System

## 📊 Sistem Fallback

Aplikasi ini menggunakan **3-tier fallback system** untuk memastikan AI generation selalu berhasil:

```
1. Gemini Flash (FREE 1,500/day) ✅
   ↓ jika limit habis
2. Groq (FREE 14,400/day) ✅
   ↓ jika limit habis
3. Demo Mode (Template) ✅
```

**Total FREE generations per hari: 15,900!** 🎉

---

## 🔑 Cara Mendapatkan API Keys

### 1. Google Gemini API Key (RECOMMENDED)

**Kenapa Gemini?**
- ✅ FREE 1,500 requests/day
- ✅ Reset setiap hari
- ✅ Kualitas bagus untuk copywriting
- ✅ 200x lebih murah dari Claude

**Cara Mendapatkan:**

1. Buka: https://aistudio.google.com/app/apikey
2. Login dengan Google Account
3. Klik **"Create API Key"**
4. Pilih project atau buat baru
5. Copy API key yang muncul
6. Paste ke `.env`:
   ```env
   GOOGLE_API_KEY="AIzaSy..."
   ```

**Free Tier Limits:**
- 1,500 requests per day
- 1 million tokens per minute
- Reset setiap hari (00:00 UTC)

---

### 2. Groq API Key (Fallback)

**Kenapa Groq?**
- ✅ FREE 14,400 requests/day
- ✅ Super cepat (fastest inference)
- ✅ Llama 3.3 70B model
- ✅ Reset setiap hari

**Cara Mendapatkan:**

1. Buka: https://console.groq.com/
2. Sign up dengan email atau Google
3. Verify email Anda
4. Masuk ke dashboard
5. Klik **"API Keys"** di sidebar
6. Klik **"Create API Key"**
7. Beri nama (contoh: "SalesForge")
8. Copy API key yang muncul
9. Paste ke `.env`:
   ```env
   GROQ_API_KEY="gsk_..."
   ```

**Free Tier Limits:**
- 14,400 requests per day
- 30 requests per minute
- Reset setiap hari (00:00 UTC)

---

## ⚙️ Setup di Project

### 1. Update `.env` File

```env
# AI Providers (Fallback System)
GOOGLE_API_KEY="AIzaSy..."  # Priority 1
GROQ_API_KEY="gsk_..."      # Priority 2
```

### 2. Restart Development Server

```bash
npm run dev
```

### 3. Test Generation

1. Login ke aplikasi
2. Create new sales page
3. Lihat console log untuk melihat AI provider yang digunakan:
   ```
   🔵 Trying Gemini 2.0 Flash...
   ✅ Gemini Flash succeeded!
   ```

---

## 📊 Monitoring AI Usage

### Console Logs

Setiap generation akan menampilkan log:

```bash
🚀 Starting AI generation with fallback system...
📊 Fallback order: Gemini Flash → Groq → Demo Mode

🔵 Trying Gemini 2.0 Flash...
✅ Gemini Flash succeeded!
✅ Generation completed with Gemini Flash
```

Jika Gemini limit habis:

```bash
🔵 Trying Gemini 2.0 Flash...
❌ Gemini failed: quota exceeded
⚠️  Gemini quota exceeded, trying fallback...

🟢 Trying Groq (Llama 3.3 70B)...
✅ Groq succeeded!
✅ Generation completed with Groq
```

Jika semua AI limit habis:

```bash
❌ Gemini failed: quota exceeded
❌ Groq failed: rate limit exceeded
⚠️  All AI providers exhausted, using Demo Mode
💡 Tip: Add GOOGLE_API_KEY or GROQ_API_KEY to .env
```

---

## 💰 Cost Comparison

| Provider | Model | Cost per 1M tokens | Free Tier | Reset |
|----------|-------|-------------------|-----------|-------|
| **Gemini** | 2.0 Flash | $0.075 | 1,500 RPD | Daily |
| **Groq** | Llama 3.3 70B | $0.59 | 14,400 RPD | Daily |
| **Claude** | Opus 4.5 | $15.00 | ❌ None | - |

**Penghematan dengan Gemini:**
- 1,000 generations dengan Claude: ~$15
- 1,000 generations dengan Gemini: ~$0.075
- **Saving: 99.5%** 🎉

---

## 🔧 Troubleshooting

### Error: "Gemini API key not configured"

**Solution:**
1. Pastikan `GOOGLE_API_KEY` ada di `.env`
2. Restart development server
3. Check console log

### Error: "quota exceeded"

**Solution:**
- Tunggu sampai reset (00:00 UTC)
- Atau sistem akan otomatis fallback ke Groq
- Atau gunakan Demo Mode

### Error: "rate limit exceeded"

**Solution:**
- Tunggu 1 menit (rate limit per minute)
- Atau sistem akan otomatis fallback

### Semua AI gagal, selalu Demo Mode

**Solution:**
1. Check API keys di `.env`
2. Verify API keys masih valid
3. Check quota di dashboard:
   - Gemini: https://aistudio.google.com/app/apikey
   - Groq: https://console.groq.com/

---

## 🎯 Best Practices

### 1. Gunakan Kedua API Keys

Setup both Gemini dan Groq untuk redundancy:

```env
GOOGLE_API_KEY="AIzaSy..."  # 1,500/day
GROQ_API_KEY="gsk_..."      # 14,400/day
```

Total: **15,900 free generations/day!**

### 2. Monitor Usage

Check dashboard secara berkala:
- Gemini: https://aistudio.google.com/app/apikey
- Groq: https://console.groq.com/

### 3. Production Deployment

Untuk production (Vercel), tambahkan environment variables:

1. Buka Vercel dashboard
2. Settings → Environment Variables
3. Tambahkan:
   - `GOOGLE_API_KEY`
   - `GROQ_API_KEY`
4. Redeploy

---

## 📈 Upgrade ke Paid (Optional)

### Gemini Paid Tier

Jika butuh lebih dari 1,500/day:

- **Pay-as-you-go:** $0.075 per 1M tokens
- **No daily limit**
- Setup billing: https://console.cloud.google.com/billing

### Groq Paid Tier

Jika butuh lebih dari 14,400/day:

- **Pay-as-you-go:** $0.59 per 1M tokens
- **Higher rate limits**
- Contact: https://console.groq.com/

---

## ✅ Quick Start Checklist

- [ ] Daftar Google AI Studio
- [ ] Dapatkan Gemini API key
- [ ] Daftar Groq Console
- [ ] Dapatkan Groq API key
- [ ] Update `.env` file
- [ ] Restart dev server
- [ ] Test generation
- [ ] Monitor console logs
- [ ] Deploy ke production

---

**Last Updated:** 2026-04-29  
**Status:** ✅ Production Ready
