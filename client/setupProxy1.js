const { createProxyMiddleware } = require('http-proxy-middleware');

const socketProxy= createProxyMiddleware('/', {
    target: 'http://localhost:3001',
});

  
module.exports = function(app) {
//     app.use(createProxyMiddleware('/', { target: 'http://127.0.0.1:3001' }));
    app.use(socketProxy);
};