const logger = require('../logging/logger');

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    logger.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message,
    });
};
