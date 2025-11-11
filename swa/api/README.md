# VibeCodingDemo API

Azure Functions API for the VibeCodingDemo Static Web App.

## Endpoints

### Hello World
- **URL**: `/api/hello`
- **Method**: GET, POST
- **Auth**: Anonymous
- **Description**: Returns a hello world message
- **Parameters**:
  - `name` (optional): Name to include in greeting (query parameter or request body)

**Example**:
```
GET /api/hello?name=Developer
```

Response:
```json
{
  "message": "Hello, Developer! This Azure Function executed successfully.",
  "timestamp": "2025-09-23T09:30:00.000Z",
  "functionName": "hello",
  "requestMethod": "GET"
}
```

### Health Check
- **URL**: `/api/health`
- **Method**: GET
- **Auth**: Anonymous
- **Description**: Returns API health status

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-09-23T09:30:00.000Z",
  "uptime": 123.456,
  "version": "1.0.0"
}
```

## Development

To run the API locally:

```bash
# From the swa directory
npm run dev:api
```

Or run both frontend and API together:

```bash
# From the swa directory
npm run dev
```

## Deployment

The API is deployed automatically with the Static Web App using Azure Functions managed hosting.