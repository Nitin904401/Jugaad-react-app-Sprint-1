import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import vendorRoutes from "./routes/vendor.routes";
import adminRoutes from "./routes/admin.routes";
import usersRoutes from "./routes/users.routes";
import vendorsRoutes from "./routes/vendors.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"], // 🔥 Multiple frontend origins
    credentials: true,               // 🔥 REQUIRED
  })
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendor/auth", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", usersRoutes);
app.use("/api/admin/vendors", vendorsRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

export default app;
