import cors from "cors";
import express from "express";
import errorHandler from "../shared/middleware/errorHandler.js";
import routes from "./routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Hello Yoga Server");
});

// Mount routes
app.use(routes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
