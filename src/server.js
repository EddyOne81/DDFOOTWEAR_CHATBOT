const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exitCode = 1;
  });
}

module.exports = startServer;
