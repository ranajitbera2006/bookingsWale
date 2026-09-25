// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import brokerRoutes from "./routes/brokerRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import { ensureAdminExists } from "./config/initAdmin.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/brokers", brokerRoutes);
app.use("/api/homes", homeRoutes);

// Database Connection & Admin Auto-Sync
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookingswale";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    // Automatically verify & set admin from .env
    await ensureAdminExists();
  })
  .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
