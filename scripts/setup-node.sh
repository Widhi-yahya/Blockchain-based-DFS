#!/bin/bash

# Update package list and install necessary packages
sudo apt-get update
sudo apt-get install -y nodejs npm

# Install required npm packages
npm install

# Set up environment variables
export NODE_ENV=production

# Start the blockchain filesystem application
npm start