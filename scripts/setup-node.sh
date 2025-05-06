#!/bin/bash

set -e

echo "Updating package lists..."
sudo apt-get update

echo "Checking for Node.js and npm installation..."
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing Node.js..."
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed."
    echo "Node.js version: $(node --version)"
fi

if ! command -v npm &> /dev/null; then
    echo "npm not found. Installing npm..."
    sudo apt-get install -y npm
else
    echo "npm is already installed."
    echo "npm version: $(npm --version)"
fi

# Install a compatible version of npm instead of latest
echo "Updating npm packages to compatible version..."
npm install -g npm@8.19.4 || echo "Continuing with existing npm version"

echo "Installing TypeScript and ts-node..."
npm install -g typescript@4.9.5 ts-node@10.9.1

echo "Installing project dependencies..."
npm install

echo "Installing type definitions..."
npm install --save-dev @types/node @types/express @types/body-parser @types/multer

echo "Running npm audit..."
npm audit

echo "Fixing vulnerabilities..."
npm audit fix || true

echo "Setup complete."