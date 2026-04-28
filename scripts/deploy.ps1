# Deployment script for SalesForge AI (PowerShell)
# Usage: .\scripts\deploy.ps1 [preview|production]

param(
    [string]$DeployType = "preview"
)

Write-Host "🚀 SalesForge AI Deployment Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

Write-Host "📦 Deployment Type: $DeployType" -ForegroundColor Yellow
Write-Host ""

# Pre-deployment checks
Write-Host "🔍 Running pre-deployment checks..." -ForegroundColor Cyan

# Check if .env.example exists
if (-not (Test-Path ".env.example")) {
    Write-Host "❌ .env.example not found!" -ForegroundColor Red
    exit 1
}

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    exit 1
}

# Check if prisma schema exists
if (-not (Test-Path "prisma\schema.prisma")) {
    Write-Host "❌ prisma\schema.prisma not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Pre-deployment checks passed!" -ForegroundColor Green
Write-Host ""

# Generate Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

Write-Host "✅ Prisma Client generated!" -ForegroundColor Green
Write-Host ""

# Deploy based on type
if ($DeployType -eq "production") {
    Write-Host "🚀 Deploying to PRODUCTION..." -ForegroundColor Yellow
    vercel --prod
} else {
    Write-Host "🚀 Deploying to PREVIEW..." -ForegroundColor Yellow
    vercel
}

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Update NEXTAUTH_URL in Vercel dashboard"
Write-Host "2. Run database migration: npx prisma db push"
Write-Host "3. Test your deployment"
Write-Host ""
Write-Host "🎉 Happy deploying!" -ForegroundColor Magenta
