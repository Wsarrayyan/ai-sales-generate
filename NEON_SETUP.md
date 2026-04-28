# Neon Database Setup Guide

## Konfigurasi Neon Tech untuk Aplikasi Ini

Aplikasi ini sudah dikonfigurasi untuk bekerja optimal dengan Neon Tech PostgreSQL.

### 🔧 Konfigurasi yang Sudah Diterapkan

#### 1. **Dual Connection URLs**
- **DATABASE_URL** (Pooled): Untuk query aplikasi dengan connection pooling
- **DIRECT_URL**: Untuk migrasi dan schema changes

#### 2. **Connection Pooling**
- Menggunakan PgBouncer untuk connection pooling
- Parameter `pgbouncer=true` untuk optimasi koneksi
- `connect_timeout=10` untuk mencegah hanging connections

#### 3. **Prisma Configuration**
- `directUrl` untuk migrasi schema
- Logging yang optimal untuk development dan production
- Graceful shutdown untuk production

### 📋 Cara Mendapatkan Connection URLs dari Neon

1. Login ke [Neon Console](https://console.neon.tech)
2. Pilih project Anda
3. Klik **"Connection Details"** atau **"Connect"**
4. Anda akan melihat 2 jenis URL:

#### **Pooled Connection** (untuk DATABASE_URL)
```
postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
```

#### **Direct Connection** (untuk DIRECT_URL)
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

### 🚀 Setup Langkah demi Langkah

1. **Copy file .env.example ke .env**
   ```bash
   cp .env.example .env
   ```

2. **Update DATABASE_URL dengan Pooled Connection**
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10"
   ```

3. **Update DIRECT_URL dengan Direct Connection**
   ```env
   DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require&connect_timeout=10"
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Push Schema ke Database**
   ```bash
   npx prisma db push
   ```

6. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

### ✅ Verifikasi Koneksi

Untuk memastikan koneksi berhasil:

```bash
npx prisma db push
```

Jika berhasil, Anda akan melihat:
```
✔ The database is already in sync with the Prisma schema.
```

### 🔍 Troubleshooting

#### Error: "Can't reach database server"
- Pastikan IP Anda sudah di-whitelist di Neon (biasanya Neon allow all by default)
- Cek apakah `sslmode=require` ada di connection string
- Pastikan tidak ada typo di username/password

#### Error: "Connection timeout"
- Tambahkan `connect_timeout=10` di connection string
- Cek koneksi internet Anda
- Pastikan region Neon tidak terlalu jauh (gunakan region terdekat)

#### Error: "Too many connections"
- Gunakan Pooled URL (dengan `-pooler` di hostname)
- Pastikan `pgbouncer=true` ada di DATABASE_URL

### 📊 Monitoring Database

Anda bisa monitor database di Neon Console:
- Query performance
- Connection count
- Storage usage
- Compute usage

### 🎯 Best Practices

1. **Selalu gunakan Pooled URL** untuk aplikasi
2. **Gunakan Direct URL** hanya untuk migrasi
3. **Enable connection pooling** dengan pgbouncer
4. **Set timeout** untuk mencegah hanging connections
5. **Monitor usage** di Neon dashboard
6. **Backup data** secara berkala (Neon punya auto-backup)

### 🔐 Security

- Jangan commit file `.env` ke git
- Gunakan environment variables di production
- Rotate credentials secara berkala
- Enable IP whitelist jika diperlukan

### 📚 Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma with Neon](https://www.prisma.io/docs/guides/database/neon)
- [Connection Pooling Guide](https://neon.tech/docs/connect/connection-pooling)
