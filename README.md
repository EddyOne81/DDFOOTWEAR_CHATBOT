# DDFOOTWEAR_CHATBOT

E-commerce chatbot backend for processing shoe orders through a webhook and storing the order details in MongoDB.

## Project structure

```text
src/
  app.js              # Express app setup and route registration
  server.js           # Database bootstrap and server startup
  config/
    database.js       # MongoDB connection configuration
  controllers/
    webhookController.js
  models/
    Order.js           # Order Mongoose schema
  routes/
    webhook.js         # Webhook route

.env.example          # Example environment variables
.gitignore            # Ignore environment and dependency files
README.md             # Project documentation
package.json          # Scripts and dependencies
server.js             # Backward-compatible bootstrap entry point
```

## Features

- Telegram / Dialogflow webhook handling
- Order validation for required customer and product fields
- MongoDB persistence for order records
- Health check endpoint for monitoring

## Tech stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JavaScript

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start the server:

```bash
npm start
```

4. Or run in dev mode:

```bash
npm run dev
```

## Environment variables

Create a `.env` file with values like:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shoe_store
```

## Notes

This repository was reorganized to make the codebase easier to read and maintain. The app logic has been split into small modules so it is easier for other developers to understand and extend.
