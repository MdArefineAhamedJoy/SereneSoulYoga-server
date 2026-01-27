import "dotenv/config";
import app from "./app/app.js";
import connectDB from "./config/index.js";

const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// For Vercel/Serverless: Export the app
export default app;

// For Local Development: Start the server manually
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
