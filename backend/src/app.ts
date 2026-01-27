import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"], // 🔥 Multiple frontend origins
    credentials: true,               // 🔥 REQUIRED
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
