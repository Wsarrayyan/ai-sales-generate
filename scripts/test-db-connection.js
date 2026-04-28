#!/usr/bin/env node

/**
 * Test Database Connection Script
 * 
 * Script ini untuk test koneksi ke Neon database
 * Jalankan: node scripts/test-db-connection.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('🔍 Testing database connection...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    await prisma.$connect();
    console.log('✅ Connected to database successfully!\n');

    // Test 2: Query test
    console.log('2️⃣ Testing query execution...');
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful! Found ${userCount} users in database.\n`);

    // Test 3: Database info
    console.log('3️⃣ Getting database info...');
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database version:', result[0].version, '\n');

    // Test 4: Check tables
    console.log('4️⃣ Checking tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log('✅ Tables found:');
    tables.forEach(t => console.log(`   - ${t.table_name}`));
    console.log('');

    // Test 5: Connection pool info
    console.log('5️⃣ Connection info:');
    console.log(`   - DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Not set'}`);
    console.log(`   - DIRECT_URL: ${process.env.DIRECT_URL ? '✅ Set' : '❌ Not set'}`);
    console.log(`   - Using pooling: ${process.env.DATABASE_URL?.includes('pooler') ? '✅ Yes' : '⚠️  No'}`);
    console.log(`   - PgBouncer: ${process.env.DATABASE_URL?.includes('pgbouncer=true') ? '✅ Enabled' : '⚠️  Disabled'}`);
    console.log('');

    console.log('🎉 All tests passed! Database connection is working perfectly.\n');

  } catch (error) {
    console.error('❌ Database connection test failed!\n');
    console.error('Error details:');
    console.error(error.message);
    console.error('\n📋 Troubleshooting tips:');
    console.error('1. Check if DATABASE_URL is set correctly in .env');
    console.error('2. Ensure your Neon database is active');
    console.error('3. Verify SSL mode is set to "require"');
    console.error('4. Check if you have network connectivity');
    console.error('5. See NEON_SETUP.md for detailed setup guide\n');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
