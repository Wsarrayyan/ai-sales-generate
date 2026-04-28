# 💳 Anthropic API Credit Issue - Solusi

## ❌ Error yang Terjadi

```json
{
  "type": "invalid_request_error",
  "message": "Your credit balance is too low to access the Anthropic API. 
             Please go to Plans & Billing to upgrade or purchase credits."
}
```

**Error ini terjadi karena:** Akun Anthropic Anda kehabisan credit atau belum memiliki billing setup.

---

## ✅ Solusi

### Opsi 1: Top Up Credit Anthropic (Recommended untuk Production)

1. **Login ke Anthropic Console**
   - Buka: [https://console.anthropic.com](https://console.anthropic.com)
   - Login dengan akun Anda

2. **Pergi ke Plans & Billing**
   - Klik menu **"Plans & Billing"** di sidebar
   - Atau langsung ke: [https://console.anthropic.com/settings/billing](https://console.anthropic.com/settings/billing)

3. **Purchase Credits**
   - Klik **"Purchase Credits"**
   - Minimal top up: **$5** (cukup untuk ~100-200 sales pages)
   - Recommended: **$10-$20** untuk testing & development

4. **Update API Key (Jika Perlu)**
   - Jika Anda generate API key baru, update di `.env`:
   ```env
   ANTHROPIC_API_KEY="sk-ant-api03-YOUR-NEW-KEY"
   ```
   - Restart server: `npm run dev`

---

### Opsi 2: Gunakan DEMO Mode (Sudah Diimplementasikan)

Aplikasi sekarang **otomatis menggunakan DEMO mode** jika API credit habis!

**Cara Kerja:**
- Ketika API Anthropic gagal karena credit habis
- Aplikasi otomatis switch ke mock/template data
- Sales page tetap ter-generate dengan template default
- User mendapat warning: "⚠️ DEMO MODE: AI credit habis"

**Fitur DEMO Mode:**
- ✅ Tetap bisa generate sales page
- ✅ Menggunakan template berkualitas
- ✅ Semua fitur aplikasi tetap berfungsi
- ⚠️ Konten tidak di-customize oleh AI
- ⚠️ Hasil kurang personal/spesifik

**Testing DEMO Mode:**
Tidak perlu konfigurasi apapun! Jika API credit habis, otomatis masuk DEMO mode.

---

### Opsi 3: Gunakan Free Trial (Akun Baru)

Jika Anda belum pernah menggunakan Anthropic:

1. **Buat Akun Baru**
   - Daftar di [https://console.anthropic.com](https://console.anthropic.com)
   - Verifikasi email

2. **Claim Free Credits**
   - Anthropic biasanya memberikan **$5 free credit** untuk akun baru
   - Cukup untuk testing & development awal

3. **Generate API Key**
   - Pergi ke **API Keys**
   - Klik **"Create Key"**
   - Copy key dan simpan di `.env`

---

### Opsi 4: Gunakan API Key Lain

Jika Anda punya akun Anthropic lain dengan credit:

1. **Login ke akun yang punya credit**
2. **Generate API Key baru**
3. **Update `.env`:**
   ```env
   ANTHROPIC_API_KEY="sk-ant-api03-NEW-KEY-WITH-CREDIT"
   ```
4. **Restart server:**
   ```bash
   npm run dev
   ```

---

## 💰 Pricing Anthropic

### Claude Opus 4.5 (Model yang Digunakan)
- **Input:** $15 per 1M tokens (~750K words)
- **Output:** $75 per 1M tokens (~750K words)

### Estimasi Cost per Sales Page:
- **Input tokens:** ~1,500 tokens (prompt + product info)
- **Output tokens:** ~2,000 tokens (sales page content)
- **Cost per page:** ~$0.15 - $0.20

### Dengan $10 Credit:
- Bisa generate: **50-60 sales pages**
- Cukup untuk development & testing

---

## 🔍 Cara Cek Credit Balance

1. Login ke [Anthropic Console](https://console.anthropic.com)
2. Pergi ke **Plans & Billing**
3. Lihat **"Current Balance"**

**Jika balance < $1:** Top up segera untuk menghindari interruption.

---

## 🛠️ Troubleshooting

### Error: "Invalid API Key"
**Solusi:**
- Pastikan API key benar di `.env`
- Generate API key baru jika perlu
- Restart server setelah update

### Error: "Rate limit exceeded"
**Solusi:**
- Tunggu beberapa menit
- Anthropic punya rate limit: 50 requests/minute
- Untuk production, consider caching

### DEMO Mode Tidak Muncul
**Solusi:**
- Clear browser cache
- Restart server
- Check console log untuk error lain

---

## 📊 Monitoring Usage

### Check API Usage:
1. Login ke [Anthropic Console](https://console.anthropic.com)
2. Pergi ke **Usage**
3. Monitor:
   - Total requests
   - Token usage
   - Cost per day

### Set Budget Alerts:
1. Pergi ke **Plans & Billing**
2. Set **Budget Alert** (e.g., $5, $10)
3. Dapat email notification saat mendekati limit

---

## 🎯 Recommendations

### Untuk Development:
- ✅ Gunakan DEMO mode untuk testing UI/UX
- ✅ Top up $5-$10 untuk testing AI generation
- ✅ Monitor usage di console

### Untuk Production:
- ✅ Top up minimal $20-$50
- ✅ Set budget alerts
- ✅ Implement caching untuk reduce API calls
- ✅ Consider rate limiting di aplikasi

### Untuk Demo/Presentation:
- ✅ DEMO mode sudah cukup
- ✅ Tidak perlu API credit
- ✅ Semua fitur tetap berfungsi

---

## ✅ Status Aplikasi

Aplikasi sekarang **production-ready** dengan:
- ✅ Auto-fallback ke DEMO mode
- ✅ Graceful error handling
- ✅ User-friendly warning messages
- ✅ Tidak crash saat API credit habis

**Anda bisa:**
1. **Testing tanpa credit:** Gunakan DEMO mode
2. **Production dengan AI:** Top up credit Anthropic
3. **Mix mode:** Demo untuk testing, AI untuk production

---

## 📞 Support

### Anthropic Support:
- Email: support@anthropic.com
- Docs: [https://docs.anthropic.com](https://docs.anthropic.com)
- Status: [https://status.anthropic.com](https://status.anthropic.com)

### Aplikasi Support:
- Check logs: `npm run dev` (lihat console)
- Test database: `npm run db:test`
- Check docs: `DOCS_INDEX.md`

---

**Last Updated:** 2026-04-28
**Status:** ✅ DEMO Mode Implemented
**Recommendation:** Top up $10 untuk full AI experience
