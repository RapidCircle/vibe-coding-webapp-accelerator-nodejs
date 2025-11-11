# Vibe Coding Accelerator - Azure Static Web App

A modern web application built with Next.js and Azure Functions, deployed to Azure Static Web Apps with built-in authentication and serverless backend capabilities.

This starter project is designed to give you a head start in building your own applications using GitHub Copilot. It provides a complete, production-ready foundation so you can focus on building features instead of spending time on initial project setup, configuration, and boilerplate code.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Learn More](#learn-more)

## 📦 Prerequisites

### Required Software
- **[Visual Studio Code](https://code.visualstudio.com/)** - Code editor
- **[GitHub Copilot](https://github.com/features/copilot)** - AI pair programmer (subscription required)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** - For dev containers
- **[Git](https://git-scm.com/)** - Version control

### Azure Requirements
- **Azure Account** - [Create a free account](https://azure.microsoft.com/free/)
- **Azure CLI** - Installed automatically in dev container
- **Azure Subscription** - Active subscription with permission to create resources

### Knowledge Prerequisites
Don't worry if you're new to development! This guide will walk you through everything step-by-step. Helpful to know:
- Basic command line usage (copying and pasting commands)
- Basic understanding of web applications (frontend vs backend)

## 🏗️ Architecture Overview

This is a modern web application with:
- **Frontend**: Next.js + Tailwind CSS hosted on Azure Static Web Apps
- **Backend**: Azure Functions (Node.js serverless API)
- **Storage**: Azure Storage (Blob, Table, Queue)
- **Authentication**: Microsoft Entra ID (built into Azure Static Web Apps)

## 🚀 Getting Started

### Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone <your-repository-url>
cd "Vibe Coding Accelerator"
```

### Step 2: Open in Dev Container

1. Open the project folder in Visual Studio Code
2. When prompted, click **"Reopen in Container"**
   - If not prompted, press `F1` and select **"Dev Containers: Reopen in Container"**
3. Wait for the container to build (this may take a few minutes the first time)
4. Once complete, you'll have a fully configured development environment!

**What's included in the dev container?**
- Node.js 20
- Azure CLI
- Azure Functions Core Tools
- Azurite (Azure Storage Emulator)
- All VS Code extensions for Azure development

### Step 3: Install Dependencies

The dev container terminal will open automatically. Run:

```bash
cd swa
npm install
```

Then install API dependencies:

```bash
cd api
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the `swa` directory:

```bash
# Create the file
touch .env.local
```

Add the following (you'll update these values later when deploying):

```env
# Azure Storage (Local development uses Azurite automatically)
AZURE_STORAGE_CONNECTION_STRING=UseDevelopmentStorage=true

# Azure AD (will be configured during deployment)
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
```

### Step 5: Start the Development Server

From the `swa` directory, run:

```bash
npm run dev
```

This command starts:
- **Azurite** - Local Azure Storage emulator
- **Next.js** - Frontend development server (port 3000)
- **Azure Functions** - Backend API (port 7071)
- **SWA CLI** - Static Web Apps emulator (port 4280)

**Access your application:**
- Main app: http://localhost:4280
- Frontend only: http://localhost:3000
- API only: http://localhost:7071

### Step 6: Verify Everything Works

1. Open http://localhost:4280 in your browser
2. You should see the home page
3. Try accessing http://localhost:4280/api/helloWorld (may require authentication)

🎉 **You're now running the application locally!**

## 📁 Project Structure

```
Vibe Coding Accelerator/
├── .devcontainer/              # Dev container configuration
│   └── devcontainer.json       # Container setup and extensions
├── docs/                       # Project documentation
├── scripts/                    # Deployment and utility scripts
│   └── deploy.sh              # Azure deployment script
├── swa/                        # Static Web App (main application)
│   ├── app/                   # Next.js application
│   │   ├── (routes)/          # App routes (pages)
│   │   │   └── app/           # Authenticated app section
│   │   ├── components/        # React components
│   │   │   ├── ui/           # UI components (buttons, inputs, cards)
│   │   │   ├── forms/        # Form components
│   │   │   └── layout/       # Layout components (header, footer)
│   │   ├── lib/              # Utilities and helpers
│   │   │   ├── utils/        # Pure utility functions
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── services/     # API client services
│   │   │   └── storage/      # Azure Storage abstractions
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── api/                   # Azure Functions (Backend)
│   │   ├── helloWorld/       # Example function
│   │   │   ├── index.js      # Function handler
│   │   │   └── function.json # Function configuration
│   │   ├── services/         # Business logic
│   │   ├── models/           # Data models
│   │   ├── utils/            # Utility functions
│   │   ├── host.json         # Functions host config
│   │   └── local.settings.json # Local environment variables
│   ├── public/                # Static assets
│   ├── staticwebapp.config.json # SWA configuration & auth
│   ├── next.config.ts         # Next.js configuration
│   └── package.json           # Frontend dependencies
└── README.md                  # This file
```

### Key Configuration Files

- **`staticwebapp.config.json`** - Controls routing, authentication, and authorization
- **`swa-cli.config.json`** - Local development configuration for SWA CLI
- **`function.json`** - Defines each Azure Function's trigger and bindings
- **`.devcontainer/devcontainer.json`** - Development container setup

## 💻 Development

### Running the Application

```bash
# Start all services (from swa directory)
npm run dev

# Or run individually:
npm run dev:azurite    # Start storage emulator only
npm run dev:swa        # Start SWA CLI with Next.js and Functions
```

### Adding a New API Endpoint

1. Create a new folder in `swa/api/` (e.g., `GetCustomer`)
2. Add `index.js` with your function handler
3. Add `function.json` with configuration:

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get"],
      "route": "customers/customer/{id}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

**Important**: Use the `route` property from `function.json` when calling the API, not the folder name!

### Adding a New Page

Create a new folder in `swa/app/(routes)/` with a `page.tsx` file:

```tsx
export default function MyPage() {
  return <div>My New Page</div>;
}
```

### Working with Azure Storage Locally

Azurite automatically emulates Azure Storage services locally:

- **Blob Storage**: `http://127.0.0.1:10000`
- **Queue Storage**: `http://127.0.0.1:10001`
- **Table Storage**: `http://127.0.0.1:10002`

Connection string: `UseDevelopmentStorage=true`

### Debugging

- **Frontend**: Use VS Code's built-in debugger with Next.js
- **API Functions**: Attach to the Azure Functions host (port 7071)
- **Browser DevTools**: Inspect network requests and console logs

## 🚢 Deployment

### Prerequisites

Before deploying, ensure you have:
1. Azure CLI installed (already in dev container)
2. An active Azure subscription
3. Appropriate permissions to create resources

### Step 1: Login to Azure

```bash
az login
```

Follow the prompts to authenticate.

### Step 2: Set Your Subscription

```bash
# List available subscriptions
az account list --output table

# Set the subscription you want to use
az account set --subscription "your-subscription-id"
```

### Step 3: Update Deployment Configuration

Edit `scripts/deploy.sh` with your details:

```bash
RESOURCE_GROUP="rg-yourapp-aue-dev-001"
SUBSCRIPTION_ID="your-subscription-id"
APP_NAME="swa-yourapp-aue-dev-001"
LOCATION="australiaeast"
```

### Step 4: Run Deployment Script

From the project root:

```bash
# Make the script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh
```

The script will:
1. ✅ Check Azure authentication
2. ✅ Create resource group (if needed)
3. ✅ Create Azure Static Web App
4. ✅ Configure deployment token
5. ✅ Build the application
6. ✅ Deploy to Azure

### Step 5: Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Navigate to swa directory
cd swa

# Build the application
npm run build
npm run build:api

# Deploy using SWA CLI
npm run swa:deploy
```

You'll be prompted to authenticate and select your Static Web App.

### Step 6: Configure Authentication

After deployment:

1. Go to Azure Portal → Your Static Web App
2. Navigate to **Configuration** → **Authentication**
3. Add Microsoft Entra ID provider
4. Update `staticwebapp.config.json` with your tenant ID and client details
5. Redeploy the app

### Post-Deployment

Your app will be available at: `https://<app-name>.azurestaticapps.net`

**Verify deployment:**
- [ ] Home page loads correctly
- [ ] Authentication redirects to Entra ID
- [ ] API endpoints are accessible
- [ ] Authenticated routes require login

## 📚 Learn More

### Technologies Used

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API
- **[Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/)** - Hosting platform documentation
- **[Azure Functions](https://learn.microsoft.com/azure/azure-functions/)** - Serverless compute documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling framework documentation
- **[Microsoft Entra ID](https://learn.microsoft.com/entra/)** - Authentication documentation

### Helpful Resources

- **[Azure Free Account](https://azure.microsoft.com/free/)** - Get started with Azure
- **[VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)** - Learn about dev containers
- **[React Documentation](https://react.dev/)** - Learn React fundamentals
- **[Node.js Documentation](https://nodejs.org/docs/)** - Learn Node.js basics

### Getting Help

- **GitHub Issues** - Report bugs or request features
- **Azure Support** - [Azure Support Portal](https://azure.microsoft.com/support/)
- **Community** - [Azure Community Forums](https://learn.microsoft.com/answers/products/azure)

## 📐 Detailed Architecture

This application follows a modern serverless architecture hosted on Azure:

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org) - React framework with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS framework
- **Hosting**: Azure Static Web Apps - Globally distributed static hosting

### Backend
- **Runtime**: Azure Functions (Node.js 20)
- **API Pattern**: RESTful endpoints with hierarchical routing
- **Storage**: Azure Storage Account (Blob, Table, Queue)

### Authentication
- **Provider**: Microsoft Entra ID (Azure Active Directory)
- **Method**: Azure Static Web Apps built-in authentication
- **Authorization**: Role-based access control via `staticwebapp.config.json`

### Local Development
- **Container**: Dev Container with all dependencies pre-installed
- **Emulation**: Azurite for local Azure Storage emulation
- **CLI**: Azure Static Web Apps CLI for local testing with Functions

```
┌─────────────────────────────────────────────────────┐
│           Azure Static Web Apps                     │
│  ┌───────────────────┐      ┌──────────────────┐    │
│  │   Next.js App     │◄────►│ Azure Functions  │    │
│  │   (Frontend)      │      │    (Backend)     │    │
│  └───────────────────┘      └──────────────────┘    │
│            │                         │              │
│            │                         ▼              │
│            │              ┌───────────────────┐     │
│            │              │ Azure Storage     │     │
│            │              │ (Blob/Table/Queue)│     │
│            │              └───────────────────┘     │
│            ▼                                        │
│  ┌───────────────────┐                              │
│  │  Entra ID Auth    │                              │
│  └───────────────────┘                              │
└─────────────────────────────────────────────────────┘
```

## 🤝 Contributing

Contributions are welcome! Please follow the application standards defined in `.github/instructions/ApplicationStandards.instructions.md`.

## 📝 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**
