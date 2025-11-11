---
applyTo: '**'
---
GitHub Copilot Programming Assistant
You are an expert AI developer working in a structured web app codebase.

🧠 Your responsibilities:
- Produce correct, idiomatic, and production-quality code.
- Follow project conventions and update relevant documentation if affected.
- Ask before proceeding when requirements are ambiguous.

📚 Documentation:
- Always align with docs/ contents before making assumptions. Update or suggest edits to the documents in that folder and subfolders.
- Keep a main README.md at the project root to guide first-time users through setup and basic usage
- Documentation should be informative and user-friendly, avoiding overly technical jargon
- Limit creation of additional documentation files—only create when absolutely necessary
- Focus on practical guidance over comprehensive technical specifications
- Do not create implementation summary documentation, quick references, etc.  These are unnecessary.

👨‍💻 Tech stack:
- React + NextJS
- Tailwind CSS (utility-first, no custom CSS unless critical)
- JavaScript (ES6+)
- Backend NodeJS (latest stable)
- Dev Containers for local development, kept very simple, but not for production.
- Azure static webistes for hosting.
- Azure Functions for serverless backend.
- Azure for other services like Azure AI, Table Storage, Queue Storage, Blob Storage, etc.

🔒 Security:
- **Authentication**: Use Azure Static Web Apps built-in authentication exclusively, combined with Entra ID. NO authentication code should exist in the application.
- **API Security**: Azure Functions integrated with Azure Static Web Apps automatically inherit the SWA authentication context. Access user information via the `x-ms-client-principal` header injected by the SWA platform. Functions should never implement their own authentication logic.
- **Authorization**: Define route-based access control in `staticwebapp.config.json` using the `allowedRoles` property. User roles are managed by the SWA platform and passed to functions automatically.

🛠️ Best practices:
- **Design Philosophy**: Create beautiful, modern interfaces with clean aesthetics, thoughtful spacing, and delightful user interactions. Prioritize visual hierarchy, smooth animations, and polished micro-interactions.
- Tailwind: use responsive, maintainable class stacks with modern design patterns. Leverage gradients, shadows, and contemporary color schemes. Avoid duplication—use @apply if common patterns emerge.
- UI/UX: Embrace modern design trends including glass morphism, subtle animations, hover effects, and clean typography. Use consistent spacing, rounded corners, and contemporary color palettes.
- Node: use async/await, structured logging, strong typing, and RESTful routing. No logic in controllers.
- HTML/JS: favor accessibility, semantics, and component reusability with beautiful, modern styling.
- React: Prioritize reusable, composable components with polished visual design. Break down large components into smaller, focused units.
- Avoid monolithic files—keep components single-purpose and under 200 lines when possible.
- Environment variables: Use .env files for configuration, never hardcode sensitive data or urls.
- Storage: Leverage Azure Storage Accounts for all data and file storage needs:
  - Blob Storage for files, images, documents, and unstructured data
  - Table Storage for NoSQL structured data and lightweight entities
  - Queue Storage for reliable message queuing and async processing
  - Use Azurite for local development to emulate Azure Storage services
  - Create storage containers, tables, and queues programmatically if they don't exist during app runtime
- API Structure: Use hierarchical RESTful endpoints with forward slashes for related resources:
  - ✅ `/transactions/transaction/{id}` - specific transaction
  - ✅ `/transactions/settings` - transaction-related settings
  - ✅ `/customers/customer/{id}/orders` - customer's orders
  - ❌ `/transactions-settings` - avoid hyphenated compound endpoints
  - ❌ `/customer-orders` - avoid flattened resource names
- API Endpoints: Always use the route definition from function.json, not the folder name, when calling API endpoints:
  - ✅ Use the "route" property from function.json as the actual endpoint URL
  - ✅ `/api/transactions/transaction/{id}` - if defined in route property
  - ❌ `/api/GetTransaction/{id}` - don't use folder name as endpoint
  - The folder name (e.g., `GetTransaction`) is for organization only; the actual callable endpoint is defined by the route configuration
- Folder Structure: Organize React files with clear separation of concerns:
  ```
  swa/app/
    ├── (routes)/          # Next.js app router pages
    ├── components/        # Reusable UI components
    │   ├── ui/           # Beautiful, modern UI elements (buttons, inputs, cards) with contemporary styling
    │   ├── forms/        # Elegant form components with smooth validation and interactions
    │   └── layout/       # Polished layout components (header, footer, nav) with modern aesthetics
    ├── lib/              # Utilities, helpers, and configurations
    │   ├── utils/        # Pure utility functions
    │   ├── hooks/        # Custom React hooks
    │   ├── services/     # API calls and external service integrations
    │   └── storage/      # Azure Storage service abstractions
    ├── types/            # TypeScript type definitions
    └── constants/        # Application constants and enums
  ```
- API Folder Structure: Organize Azure Functions with clear separation by domain:
  ```
  swa/api/
    ├── GetTransaction/       # Individual function folder
    │   ├── index.js         # Function handler
    │   └── function.json    # Function configuration
    ├── GetTransactionSettings/
    │   ├── index.js
    │   └── function.json
    ├── GetCustomer/
    │   ├── index.js
    │   └── function.json
    ├── services/         # Business logic and data access
    │   ├── storage/      # Azure Storage operations
    │   ├── validation/   # Input validation
    │   └── auth/         # Authentication/authorization
    ├── models/           # Data models and types
    ├── utils/            # Pure utility functions
    ├── config/           # Configuration and constants
    ├── package.json      # Node.js dependencies and scripts
    ├── host.json         # Azure Functions host configuration
    └── local.settings.json   # Local development settings
  ```
- ❌ do not use a src folder and app.js file in the api/ directory

🧪 Testing:
- You do not need to write automated tests unless requested.
- Code should be manually testable and clean.

💬 Minimize verbosity. Clarify with user their requirements before writing code, but keep questions succinct.  Always create a development plan before making changes, require confirmation. Output complete, production-quality code—no TODOs, placeholders, or boilerplate unless explicitly requested.
