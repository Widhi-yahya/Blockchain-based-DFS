#!/bin/bash

# This script automates the deployment of the blockchain filesystem application on the virtual machines.

# Define the IP addresses of the nodes
NODE1="172.16.1.12"
NODE2="172.16.1.13"

# Define the directory where the application will be deployed
DEPLOY_DIR="/opt/blockchain-fs"

# Function to deploy the application on a node
deploy_node() {
    NODE_IP=$1
    echo "Deploying to node: $NODE_IP"

    # Create the deployment directory
    ssh root@$NODE_IP "mkdir -p $DEPLOY_DIR"

    # Copy the application files to the node
    scp -r ./* root@$NODE_IP:$DEPLOY_DIR

    # Install dependencies
    ssh root@$NODE_IP "cd $DEPLOY_DIR && npm install"

    # Start the application
    ssh root@$NODE_IP "cd $DEPLOY_DIR/src/web && node server.js &"
}

# Deploy to both nodes
deploy_node $NODE1
deploy_node $NODE2

echo "Deployment completed."