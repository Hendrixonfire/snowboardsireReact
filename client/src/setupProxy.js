 const { createProxyMiddleware } = require("http-proxy-middleware");

 module.exports = function (app) {
  app.use(
    "/api",
     createProxyMiddleware({
      target: "https://snowboardaddictionreact.onrender.com",
      //https://snowboardaddictionreact.onrender.com
      changeOrigin: true,
    })
  );
 };
