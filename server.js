const appInsights = require("applicationinsights");

// Use connection string from environment variable
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .start();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Managed Hosting App Running",
    environment: process.env.WEBSITE_SITE_NAME,
    timestamp: new Date()
  });
});

app.get("/error", (req, res) => {
  throw new Error("Test exception for monitoring");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});