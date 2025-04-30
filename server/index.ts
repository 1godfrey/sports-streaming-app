import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Load environment variables from .env
dotenv.config();

// Initialize the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is in your .env file
});
console.log('Conencting to DB:', pool)
const db = drizzle(pool);

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register routes and start server
(async () => {
  // Ensure the database connection is established
  try {
    await pool.connect();
    log("Database connected successfully");
  } catch (error) {
    log(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the application if DB connection fails
  }

  // Register routes
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Vite setup (only for development)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start the server
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Serving on port ${port}`);
  });
})();
