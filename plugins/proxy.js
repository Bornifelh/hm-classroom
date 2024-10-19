const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: 'https://mypvit.com',
      changeOrigin: true,
      pathRewrite: {
        '^': 'https://mypvit.com/pvit-secure-full-api.kk', // réécrit le chemin pour enlever /api
      },
      secure: false,
    })
  );
};
