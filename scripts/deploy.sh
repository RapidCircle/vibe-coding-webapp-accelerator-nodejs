#!/bin/bash

# Azure Static Web App Deployment Script
# This script creates and deploys a Next.js application to Azure Static Web Apps

set -e  # Exit on any error

# Configuration
RESOURCE_GROUP="rg-vibecodingdemo-aue-dev-001"
SUBSCRIPTION_ID="36a29fd6-5f1c-4b82-88fc-3bd3ab1d9d95"
APP_NAME="swa-glrc-vibecodingdemo-aue-dev-001"
LOCATION="australiaeast"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Azure Static Web App Deployment${NC}"
echo "Resource Group: $RESOURCE_GROUP"
echo "Subscription: $SUBSCRIPTION_ID"
echo "App Name: $APP_NAME"
echo "Location: $LOCATION"
echo

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Login to Azure and set subscription
echo -e "${YELLOW}🔐 Checking Azure authentication...${NC}"
if ! az account show &> /dev/null; then
    echo "Please log in to Azure:"
    az login
fi

# Set the subscription
echo -e "${YELLOW}📋 Setting Azure subscription...${NC}"
az account set --subscription "$SUBSCRIPTION_ID"

# Check if resource group exists, create if it doesn't
echo -e "${YELLOW}📁 Checking resource group...${NC}"
if ! az group show --name "$RESOURCE_GROUP" &> /dev/null; then
    echo "Creating resource group: $RESOURCE_GROUP"
    az group create --name "$RESOURCE_GROUP" --location "$LOCATION"
    echo -e "${GREEN}✅ Resource group created${NC}"
else
    echo -e "${GREEN}✅ Resource group exists${NC}"
fi

# Check if static web app exists, create if it doesn't
echo -e "${YELLOW}🌐 Checking static web app...${NC}"
if ! az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    echo "Creating static web app: $APP_NAME"
    HOSTNAME=$(az staticwebapp create \
        --name "$APP_NAME" \
        --resource-group "$RESOURCE_GROUP" \
        --location "$LOCATION" \
        --query "defaultHostname" \
        --output tsv)
    echo -e "${GREEN}✅ Static web app created: https://$HOSTNAME${NC}"
else
    HOSTNAME=$(az staticwebapp show \
        --name "$APP_NAME" \
        --resource-group "$RESOURCE_GROUP" \
        --query "defaultHostname" \
        --output tsv)
    echo -e "${GREEN}✅ Static web app exists: https://$HOSTNAME${NC}"
fi

# Navigate to the SWA project directory
cd "$(dirname "$0")/swa"

# Install npm dependencies
echo -e "${YELLOW}📦 Installing SWA dependencies...${NC}"
npm install

# Install API dependencies
echo -e "${YELLOW}📦 Installing API dependencies...${NC}"
cd api && npm install && cd ..

# Initialize SWA CLI configuration if it doesn't exist
if [ ! -f "swa-cli.config.json" ]; then
    echo -e "${YELLOW}⚙️ Initializing SWA CLI configuration...${NC}"
    npx swa init --yes
    echo -e "${GREEN}✅ SWA CLI configuration initialized${NC}"
fi

# Build the application
echo -e "${YELLOW}🔨 Building Next.js application...${NC}"
npm run build

# Build API (install dependencies if needed)
echo -e "${YELLOW}🔨 Building API...${NC}"
npm run build:api

# Login to SWA CLI
echo -e "${YELLOW}🔐 Logging into SWA CLI...${NC}"
npx swa login --resource-group "$RESOURCE_GROUP" --app-name "$APP_NAME"

# Deploy to production
echo -e "${YELLOW}🚀 Deploying SWA with Azure Functions to production...${NC}"
DEPLOY_URL=$(npx swa deploy --env production --api-location api)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Your app is live at: https://$HOSTNAME${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo
echo -e "${GREEN}✨ Deployment completed successfully!${NC}"
echo "Next steps:"
echo "  1. Visit your app: https://$HOSTNAME"
echo "  2. Configure custom domains if needed"
echo "  3. Set up CI/CD pipelines for automated deployments"