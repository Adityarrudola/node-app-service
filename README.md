
### Managed Web Application Hosting — Azure App Service + GitHub CI/CD + HTTPS + Application Insights

This project implements a managed Node.js web application deployed using Azure App Service (PaaS). The system integrates **Continuous Deployment** via GitHub Actions, enables **autoscaling** based on performance metrics, enforces **HTTPS-only** communication, and monitors telemetry using **Azure Application Insights** and Azure Monitor alerts.

The architecture removes infrastructure management overhead, providing a scalable, secure, and production-ready managed hosting environment.

**Architecture Design**
<img width="1278" height="1222" alt="image" src="https://github.com/user-attachments/assets/6d55c861-75d0-47e1-88b5-b7233da024b4" />


---

## Step 1 — Create Azure App Service Plan and Web App

Provisioned a Linux-based App Service Plan to host the managed application. Established the Web App with Node.js 18 LTS runtime, enforcing HTTPS-only traffic and enabling Application Insights for built-in diagnostics.

---

## Step 2 — Develop Node.js Application with SDK Instrumentation

Implemented a lightweight Express API. Since Node.js requires manual instrumentation on Azure, the `applicationinsights`SDK was integrated to auto-collect requests, performance metrics, and exceptions.

**Code Snippet:**

JavaScript

```
const appInsights = require("applicationinsights");
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Managed Hosting App Running", timestamp: new Date() });
});
```

---

## Step 3 — Configure GitHub Continuous Deployment (CI/CD)

Connected the GitHub repository to the Azure Deployment Center. Pushing code to the `main` branch automatically triggers a GitHub Actions workflow that builds and deploys the app, ensuring a zero-manual deployment process.

**Screenshot:**
<img width="2902" height="1446" alt="image" src="https://github.com/user-attachments/assets/b0877db4-f9fa-4538-b582-bc5f2852dbe9" />


---

## Step 4 — Implement Autoscale Rules

Enabled horizontal autoscaling using the Standard (S1) tier. Configured rules to increase instance counts when CPU utilization exceeds 70% for over 5 minutes, ensuring high availability during load spikes.

**Screenshot:**
<img width="1156" height="579" alt="Screenshot 2026-03-09 at 10 08 52 PM" src="https://github.com/user-attachments/assets/d50d4ec4-c3de-4947-bba9-95606556f6a1" />

---

## Step 5 — Verify Application Insights Telemetry

Validated that telemetry data—including requests, dependencies, and exceptions—is correctly flowing into the Log Analytics workspace. Executed Kusto (KQL) queries to monitor live application health.

**Screenshot:**
<img width="2902" height="1446" alt="image" src="https://github.com/user-attachments/assets/07eddf08-4cc3-4d1b-b9a3-941ca2f57161" />


---

## Step 6 — Configure Azure Monitor Alerts

Created proactive monitoring rules to trigger email notifications if critical thresholds are met, such as CPU usage exceeding 80%, allowing for rapid incident response.

**Screenshot:**
<img width="1156" height="579" alt="Screenshot 2026-03-09 at 10 09 47 PM" src="https://github.com/user-attachments/assets/8c051ed9-a3c8-465a-87d7-6fefd687447f" />


---

## Step 7 — Final End-to-End System Validation

Confirmed the full lifecycle: Public HTTPS endpoint is accessible, GitHub pushes trigger successful builds, health endpoints return `200 OK`, and telemetry is actively captured in the Azure Portal.

**Screenshot:**
<img width="2902" height="1446" alt="image" src="https://github.com/user-attachments/assets/9943e026-bf75-4a5b-a35f-61f39fe3b855" />

