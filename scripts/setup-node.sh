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
fi

if ! command -v npm &> /dev/null; then
    echo "npm not found. Installing npm..."
    sudo apt-get install -y npm
else
    echo "npm is already installed."
fi

echo "Updating npm packages..."
npm install -g npm@latest

echo "Installing TypeScript and ts-node..."
npm install -g typescript ts-node

echo "Installing project dependencies..."
npm install

echo "Installing type definitions..."
npm install --save-dev @types/node @types/express @types/body-parser @types/multer

echo "Running npm audit..."
npm audit

echo "Fixing vulnerabilities..."
npm audit fix || true

echo "Setup complete."