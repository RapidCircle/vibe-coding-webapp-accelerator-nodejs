# VibeCodingDemo API

Azure Functions API (v4) for the VibeCodingDemo Static Web App.

## Programming Model

This API uses the **Azure Functions v4 programming model** with code-centric configuration (no function.json files needed).

## Structure

```
api/
  ├── index.js                 # Entry point that imports all functions
  ├── transactions/            # Domain-grouped functions
  │   ├── getTransaction/
  │   │   └── index.js
  │   └── getSettings/
  │       └── index.js
  ├── customers/
  │   └── getCustomer/
  │       └── index.js
  ├── helloWorld/
  │   └── index.js
  ├── services/                # Shared business logic
  ├── models/                  # Data models
  ├── utils/                   # Utility functions
  ├── host.json                # Function app configuration
  ├── local.settings.json      # Local development settings
  └── package.json             # Must have "main": "index.js"
```

## Endpoints

### Hello World
- **URL**: `/api/helloWorld`
- **Method**: GET
- **Auth**: Anonymous
- **Description**: Returns a hello world message with user authentication info from Azure SWA

**Example**:
```
GET /api/helloWorld
```

Response:
```json
{
  "success": true,
  "data": "Hello World",
  "user": {
    "email": "user@example.com",
    "isAuthenticated": true
  }
}
```

## Development

To run the API locally:

```bash
# From the swa directory
npm run dev
```

The Azure Functions v4 runtime will automatically discover all functions in the `src/functions/` directory.

## Adding New Functions

**Step 1:** Create a new folder (optionally grouped by domain) with an `index.js` file:

```javascript
// transactions/getTransaction/index.js
const { app } = require('@azure/functions');

app.http('getTransaction', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'transactions/transaction/{id}',
  handler: async (request, context) => {
    const id = request.params.id;
    // Your function logic here
    return {
      status: 200,
      jsonBody: { 
        success: true,
        data: { id, /* ... */ }
      }
    };
  }
});
```

**Step 2:** Add the require statement to the root `index.js`:

```javascript
// index.js
require('./helloWorld');
require('./transactions/getTransaction'); // Add this line
```

**Organization Best Practices:**
- Always use folders at the api root: `domain/functionName/index.js`
- Group related functions by domain (transactions/, customers/, etc.)
- Define hierarchical routes that match your folder structure
- Remember to require each new function in the root index.js
- Keep each function in its own folder for clarity

## Deployment

The API is deployed automatically with the Static Web App using Azure Functions managed hosting.