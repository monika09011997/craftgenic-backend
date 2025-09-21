const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app'); // Assuming your main express app file is app.js

exports.handler = serverlessExpress(app);