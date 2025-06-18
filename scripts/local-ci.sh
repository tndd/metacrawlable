#!/bin/bash

# Local CI/CD Pipeline Simulation Script
# This script mimics the GitHub Actions workflow locally

set -e

echo "🚀 Starting Local CI/CD Pipeline Simulation"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Code Quality Checks
print_status "Step 1: Running Code Quality Checks..."
echo "----------------------------------------"

print_status "1.1 TypeScript type check..."
npm run typecheck
print_success "TypeScript check passed ✓"

print_status "1.2 ESLint check..."
npm run lint
print_success "ESLint check passed ✓"

print_status "1.3 Build check..."
npm run build
print_success "Build check passed ✓"

# Step 2: Security Scan
print_status "Step 2: Running Security Scan..."
echo "-----------------------------------"

print_status "2.1 npm audit..."
npm run ci:security || print_warning "Security warnings found - review audit output"

# Step 3: Docker Build
print_status "Step 3: Building Production Docker Image..."
echo "--------------------------------------------"

print_status "3.1 Building production Docker image..."
npm run ci:build-production
print_success "Docker image built successfully ✓"

# Step 4: Integration Tests
print_status "Step 4: Running Integration Tests..."
echo "-------------------------------------"

print_status "4.1 Starting Docker Compose environment..."
docker-compose up -d

print_status "4.2 Waiting for services to be ready..."
sleep 15

print_status "4.3 Health check..."
curl -f http://localhost:3000/api/health || (print_error "Health check failed" && exit 1)
print_success "Health check passed ✓"

print_status "4.4 SEO endpoints check..."
curl -f http://localhost:3000/robots.txt > /dev/null
curl -f http://localhost:3000/sitemap.xml > /dev/null
print_success "SEO endpoints check passed ✓"

print_status "4.5 Running Playwright tests..."
npm run test:docker:all
print_success "Playwright tests passed ✓"

# Step 5: Cleanup
print_status "Step 5: Cleanup..."
echo "-------------------"

print_status "5.1 Stopping Docker Compose..."
docker-compose down

print_status "5.2 Removing test containers..."
docker rm -f test-local 2>/dev/null || true

# Final Report
echo ""
echo "=============================================="
print_success "🎉 Local CI/CD Pipeline Completed Successfully!"
echo "=============================================="
echo ""
print_status "Summary:"
echo "  ✓ Code quality checks passed"
echo "  ✓ Security scan completed"
echo "  ✓ Docker image built"
echo "  ✓ Integration tests passed"
echo "  ✓ All services healthy"
echo ""
print_status "Your code is ready for GitHub push! 🚀"