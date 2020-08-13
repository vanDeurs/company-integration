const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Router setup
const router = require('./api/routes');
app.use(router);

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger');
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const { PORT, HOST } = process.env;
app.listen(PORT, HOST, () => {
  console.log('\x1b[36m%s\x1b[0m',`API URL: http://${HOST}:${PORT}`);
});
