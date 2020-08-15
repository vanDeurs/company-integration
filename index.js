const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Initiate database
require('./api/db/index');

// Initiate models
require('./api/models');

// Set up CORS
app.use((req, res, next) => {
  console.log(`${req.method} at ${req.path}`);
  const { origin } = req.headers;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-auth, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Router setup
const router = require('./api/routes');
app.use('/api', router);

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger');
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const { PORT, HOST } = process.env;
app.listen(PORT, HOST, () => {
  console.log('\x1b[36m%s\x1b[0m',`API URL: http://${HOST}:${PORT}`);
});
