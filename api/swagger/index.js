const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Integration',
    version: '0.0.1',
  },
  basePath: '/',
  tags: [
    {
      name: 'users',
      description: "Users"
    },
    {
      name: 'items',
      description: "items"
    },
    {
      name: 'integrations',
      description: "Integrations"
    },
  ],
  components: {
    securitySchemes: {
      'x-api-key': {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header'
      }
    }
  }
}
const options = {
  swaggerDefinition,
  apis: ['./api/controllers/**.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
