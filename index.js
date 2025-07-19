const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser toutes les origines (tu peux restreindre si besoin)
app.use(cors());

app.use(
  "/stream",
  createProxyMiddleware({
    target: "http://uk22freenew.listen2myradio.com:19211",
    changeOrigin: true,
    pathRewrite: {
      "^/stream": "/;stream.mp3"
    },
    onProxyReq(proxyReq) {
      proxyReq.setHeader("User-Agent", "Mozilla/5.0");
    }
  })
);

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
