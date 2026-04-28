#!/bin/bash

# Deployment script for SalesForge AI
# Usage: ./scripts/deploy.sh [preview|production]

set -e

echo "🚀 SalesForge AI Deployment Script"
echo "===================================="

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Get deployment type
DEPLOY_TYPE=${1:-preview}

echo ""
echo "📦 Deployment Type: $DEPLOY_TYPE"
echo ""

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example not found!"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    exit 1
fi

# Check if prisma schema exists
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ prisma/schema.prisma not found!"
    exit 1
fi

echo "✅ Pre-deployment checks passed!"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "✅ Prisma Client generated!"
echo ""

# Deploy based on type
if [ "$DEPLOY_TYPE" = "production" ]; then
    echo "🚀 Deploying to PRODUCTION..."
    vercel --prod
else
    echo "🚀 Deploying to PREVIEW..."
    vercel
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update NEXTAUTH_URL in Vercel dashboard"
echo "2. Run database migration: npx prisma db push"
echo "3. Test your deployment"
echo ""
echo "🎉 Happy deploying!"
