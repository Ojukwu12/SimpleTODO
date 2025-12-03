#!/bin/bash

# Setup script for preparing the Todo List app for GitHub
# This script will guide you through setting up Git and pushing to GitHub

echo "=========================================="
echo "  Todo List - GitHub Setup Script"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

echo "✓ Git is installed"
echo ""

# Configure Git user (if not already configured)
echo "Step 1: Configure Git User"
echo "----------------------------"

GIT_USER=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)

if [ -z "$GIT_USER" ]; then
    read -p "Enter your name: " USER_NAME
    git config --global user.name "$USER_NAME"
    echo "✓ Git user name set to: $USER_NAME"
else
    echo "✓ Git user name already set to: $GIT_USER"
fi

if [ -z "$GIT_EMAIL" ]; then
    read -p "Enter your email: " USER_EMAIL
    git config --global user.email "$USER_EMAIL"
    echo "✓ Git email set to: $USER_EMAIL"
else
    echo "✓ Git email already set to: $GIT_EMAIL"
fi

echo ""
echo "Step 2: Initialize Git Repository"
echo "-----------------------------------"

# Check if already initialized
if [ -d .git ]; then
    echo "✓ Git repository already initialized"
else
    git init
    echo "✓ Git repository initialized"
fi

echo ""
echo "Step 3: Add Files to Git"
echo "-------------------------"

git add .
echo "✓ All files staged for commit"

echo ""
echo "Step 4: Create Initial Commit"
echo "-------------------------------"

git commit -m "Initial commit: Production-ready todo list application

- Modern ES6+ JavaScript with class-based architecture
- Beautiful responsive UI with gradient design
- LocalStorage persistence for tasks
- Complete CRUD operations (Create, Read, Update, Delete)
- Filter tasks by status (all/active/completed)
- Real-time statistics dashboard
- Inline editing and keyboard shortcuts
- Accessibility features (ARIA labels, keyboard navigation)
- Comprehensive documentation (README, Contributing, Changelog)
- MIT License
- Production-ready code with error handling"

echo "✓ Initial commit created"

echo ""
echo "=========================================="
echo "  Setup Complete! Next Steps:"
echo "=========================================="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   → Go to https://github.com/new"
echo "   → Name it: todo-list (or your preferred name)"
echo "   → Don't initialize with README, .gitignore, or license"
echo "   → Click 'Create repository'"
echo ""
echo "2. Push your code to GitHub:"
echo "   Run these commands (replace YOUR_USERNAME and REPO_NAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Optional: Add a description and topics on GitHub:"
echo "   → Topics: javascript, html, css, todo-app, vanilla-js"
echo "   → Description: A modern, feature-rich todo list application"
echo ""
echo "4. Enable GitHub Pages (optional):"
echo "   → Go to repository Settings → Pages"
echo "   → Source: Deploy from branch 'main' → root"
echo "   → Your app will be live at:"
echo "     https://YOUR_USERNAME.github.io/REPO_NAME/training.html"
echo ""
echo "=========================================="
echo "  Happy coding! 🚀"
echo "=========================================="
