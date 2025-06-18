#!/bin/bash

# Setup script for 'act' - GitHub Actions local runner
# This allows you to run GitHub Actions workflows locally

echo "🔧 Setting up 'act' for local GitHub Actions testing"
echo "=================================================="

# Check if act is already installed
if command -v act &> /dev/null; then
    echo "✅ act is already installed!"
    act --version
    echo ""
    echo "To run GitHub Actions locally:"
    echo "  act                    # Run all workflows"
    echo "  act push               # Run push workflows"
    echo "  act pull_request       # Run PR workflows"
    echo "  act -j test            # Run specific job"
    echo ""
    exit 0
fi

# Detect OS and install act
echo "📦 Installing act..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &> /dev/null; then
        echo "Installing act via Homebrew..."
        brew install act
    else
        echo "❌ Homebrew not found. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "Installing act via curl..."
    curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
else
    echo "❌ Unsupported OS. Please install act manually:"
    echo "   https://github.com/nektos/act#installation"
    exit 1
fi

# Verify installation
if command -v act &> /dev/null; then
    echo "✅ act installed successfully!"
    act --version
    echo ""
    echo "🚀 You can now run GitHub Actions locally:"
    echo "  act                    # Run all workflows"
    echo "  act push               # Run push workflows"
    echo "  act pull_request       # Run PR workflows"
    echo "  act -j test            # Run specific job"
    echo ""
    echo "📝 Note: First run will prompt for Docker image selection."
    echo "   Recommended: Medium (ubuntu-latest)"
else
    echo "❌ Installation failed. Please check the installation manually."
    exit 1
fi