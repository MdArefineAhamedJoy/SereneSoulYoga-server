import mongoose from "mongoose";

const connectDB = async () => {
  const dbName = process.env.DB_NAME || "SereneSoulYogaDB";
  const explicitUri = process.env.MONGODB_URI || process.env.DB_URI;
  let uri;

  if (explicitUri) {
    uri = explicitUri;
  } else {
    const rawUser = process.env.DB_USER;
    const rawPass = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST || "cluster0.p45io4t.mongodb.net";

    if (!rawUser || !rawPass) {
      if (process.env.USE_LOCAL_MONGO === "true") {
        console.warn(
          "DB creds missing. Falling back to local Mongo at mongodb://127.0.0.1:27017",
        );
        uri = "mongodb://127.0.0.1:27017";
      } else {
        console.error(
          "Missing DB_USER/DB_PASSWORD. Provide MONGODB_URI or set DB_USER, DB_PASSWORD, and optionally DB_HOST.",
        );
        process.exit(1);
      }
    } else {
      const dbUser = encodeURIComponent(rawUser);
      const dbPass = encodeURIComponent(rawPass);
      uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/?retryWrites=true&w=majority`;
    }
  }

  try {
    await mongoose.connect(uri, {
      dbName,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
