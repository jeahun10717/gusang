const swaggerUi = require('swagger-ui-koa');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    info:{
        title: 'gusang server api',
        version: '1.0.0',
        description: ''
    },
    host:'localhost:4000',
    basepath: '/',
    securityDefinitions: {
        bearerAuth:{
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header'
        },
    },
};


