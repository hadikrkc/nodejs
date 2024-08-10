const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management API',
            version: '1.0.0',
            description: 'A simple Express Library Management API',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
