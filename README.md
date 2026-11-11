# DDFOOTWEAR_CHATBOT

A small Node.js and Express webhook service for receiving Dialogflow order intents and saving validated footwear orders to MongoDB.

## Project structure

```text
src/
  app.js                         # Express configuration, health check, and routes
  server.js                      # Database bootstrap and HTTP server startup
  config/database.js             # MongoDB connection
  controllers/webhookController.js
  models/Order.js                # Validated Mongoose order schema
  routes/webhook.js              # POST /webhook
  utils/validateOrderParameters.js

test/
  app.test.js                    # HTTP behavior and webhook tests
  orderValidation.test.js        # Order parameter validation tests

.env.example
.gitignore
package.json
package-lock.json
```

## Requirements

- Node.js 18 or newer (uses the built-in test runner and `node --watch`)
- MongoDB, for saving orders

## Run locally

```bash
npm install
```

Set the runtime environment variables before starting the service. `.env.example` is a reference; this project does not automatically load `.env` files.

macOS / Linux:

```bash
export MONGODB_URI='mongodb://localhost:27017/shoe_store'
export PORT=3000
npm start
```

PowerShell:

```powershell
$env:MONGODB_URI = 'mongodb://localhost:27017/shoe_store'
$env:PORT = '3000'
npm start
```

For development, use `npm run dev`. Run the test suite with `npm test`; tests do not require a MongoDB instance.

## Endpoints

- `GET /health` — returns `{ "status": "ok" }` when the HTTP app is available.
- `POST /webhook` — accepts Dialogflow webhook JSON. The `Order` intent requires product, size, quantity, name, phone, email, and address parameters.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `PORT` | No | HTTP port (defaults to `3000`) |

## Scope

The current implementation handles Dialogflow order webhook requests. Telegram Bot API integration, FAQ behavior, inventory management, and webhook signature verification are not implemented in this codebase yet.
