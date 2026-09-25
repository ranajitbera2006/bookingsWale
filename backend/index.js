
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import brokerRoutes from "./routes/brokerRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import { ensureAdminExists } from "./config/initAdmin.js";
import { connectDB } from "./config/db.js";


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/brokers", brokerRoutes);
app.use("/api/homes", homeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,async () => {
  await connectDB()
  console.log(`Server running on http://localhost:${PORT}`);
});
