// Import dependencies
const gcfCode = require("./index.js");
const express = require("express");

// specify the port to use
const PORT = 8010;

// Start local HTTP server
const app = express();
app.use(express.json());

// Register HTTP handlers
Object.keys(gcfCode).forEach(gcfFn => {
  // Handle a single HTTP request
  const handler = (req, res) => {
    gcfCode[gcfFn](req, res);
    // server.close();
  };

  app.get(`/${gcfFn}`, handler);
  app.post(`/${gcfFn}`, handler);
});

app.listen(PORT);
