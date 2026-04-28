# ✅ Checklist Setup - Tidak Ada Error

## 🔍 Pre-Flight Checklist

Gunakan checklist ini untuk memastikan aplikasi berjalan tanpa error sama sekali.

### 1. ✅ Environment Variables
```bash
# Cek apakah file .env ada
ls .env

# Pastikan semua variable terisi:
# - DATABASE_URL (Pooled URL dengan -pooler)
# - DIRECT_URL (Direct URL tanpa -pooler)
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
# - ANTHROPIC_API_KEY
```

**Verifikasi:**
- [ ] File `.env` ada
- [ ] `DATABASE_URL` mengandung `-pooler` di hostname
- [ ] `DATABASE_URL` mengandung `pgbouncer=true`
- [ ] `DIRECT_URL` TIDAK mengandung `-pooler`
- [ ] `NEXTAUTH_SECRET` terisi (minimal 32 karakter)
- [ ] `ANTHROPIC_API_KEY` dimulai dengan `sk-ant-`

### 2. ✅ Database Connection
```bash
# Test koneksi ke Neon
npx prisma db push
```

**Expected Output:**
```
✔ The database is already in sync with the Prisma schema.
```

**Jika Error:**
- ❌ "Can't reach database server" → Cek connection string
- ❌ "Connection timeout" → Tambahkan `connect_timeout=10`
- ❌ "SSL required" → Pastikan ada `sslmode=require`

### 3. ✅ Prisma Client Generation
```bash
# Generate Prisma Client
npx prisma generate
```

**Expected Output:**
```
✔ Generated Prisma Client (v6.x.x) to ./node_modules/@prisma/client
```

**Verifikasi:**
- [ ] Tidak ada error
- [ ] Tidak ada warning (kecuali tips)
- [ ] Folder `node_modules/@prisma/client` ada

### 4. ✅ Dependencies
```bash
# Install semua dependencies
npm install
```

**Verifikasi:**
- [ ] Tidak ada error saat install
- [ ] Tidak ada peer dependency warnings
- [ ] `node_modules` folder ada dan lengkap

### 5. ✅ Build Test
```bash
# Clean build cache
rm -rf .next

# Test build (optional, untuk production)
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
```

### 6. ✅ Development Server
```bash
# Start dev server
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.3.1
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

**Verifikasi:**
- [ ] Server start tanpa error
- [ ] Tidak ada compilation error
- [ ] Bisa akses http://localhost:3000
- [ ] Tidak ada error di browser console

### 7. ✅ Database Operations Test

**Test Create User:**
1. Buka http://localhost:3000/auth/register
2. Register user baru
3. Pastikan tidak ada error

**Test Login:**
1. Login dengan user yang baru dibuat
2. Pastikan redirect ke dashboard
3. Tidak ada error di console

**Test Create Sales Page:**
1. Klik "Create New Sales Page"
2. Isi form dan generate
3. Pastikan AI response berhasil
4. Cek apakah tersimpan di database

### 8. ✅ Common Issues & Solutions

#### Issue: "Module 'uninstaller' requires a loader"
**Solution:**
```bash
npx prisma generate
rm -rf .next
npm run dev
```

#### Issue: "Can't reach database server"
**Solution:**
1. Cek apakah `DATABASE_URL` benar
2. Pastikan ada `sslmode=require`
3. Test koneksi: `npx prisma db push`

#### Issue: "Connection pool timeout"
**Solution:**
1. Gunakan Pooled URL (dengan `-pooler`)
2. Tambahkan `pgbouncer=true`
3. Tambahkan `connect_timeout=10`

#### Issue: "Too many connections"
**Solution:**
1. Pastikan menggunakan Pooled URL
2. Restart Neon database di console
3. Tunggu beberapa menit

#### Issue: "NextAuth session error"
**Solution:**
1. Generate NEXTAUTH_SECRET baru:
   ```bash
   openssl rand -base64 32
   ```
2. Update di `.env`
3. Restart server

### 9. ✅ Production Checklist

Sebelum deploy ke production:

- [ ] Semua environment variables di-set di Vercel/hosting
- [ ] `DATABASE_URL` menggunakan Pooled URL
- [ ] `DIRECT_URL` di-set untuk migrations
- [ ] `NEXTAUTH_URL` di-update ke domain production
- [ ] `NEXTAUTH_SECRET` di-generate ulang (jangan pakai yang sama dengan dev)
- [ ] Run `npx prisma db push` di production
- [ ] Test semua fitur di production
- [ ] Monitor error logs di Vercel/hosting

### 10. ✅ Performance Checklist

- [ ] Connection pooling enabled (`pgbouncer=true`)
- [ ] Timeout configured (`connect_timeout=10`)
- [ ] Prisma Client di-generate sebelum build
- [ ] No console.log di production code
- [ ] Images optimized (jika ada)
- [ ] API routes menggunakan proper error handling

## 🎯 Quick Test Script

Jalankan semua test sekaligus:

```bash
# Full test
npx prisma generate && \
npx prisma db push && \
rm -rf .next && \
npm run dev
```

Jika semua berhasil tanpa error, aplikasi siap digunakan! ✅

## 📞 Support

Jika masih ada error setelah mengikuti checklist ini:

1. Cek [NEON_SETUP.md](./NEON_SETUP.md) untuk detail Neon
2. Cek [README.md](./README.md) untuk setup umum
3. Cek Neon Console untuk status database
4. Cek Vercel logs untuk production errors

---

**Last Updated:** 2026-04-28
**Status:** ✅ All checks passed
