const serverless = require('serverless-http');
const app = require('../app');
const connectDatabase = require('../config/database');

// Connect DB (once per cold start)
connectDatabase();

module.exports = serverless(app);
