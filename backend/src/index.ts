import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();

/**
 * MIDDLEWARES
 */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

/**
 * ROUTES
 */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

/**
 * ROOT TEST ROUTE
 */
app.get("/", (_req, res) => {
  res.status(200).send("Backend is working ✅");
});

/**
 * HEALTH CHECK ROUTE
 */
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Backend is running 🚀" });
});

const PORT = Number(process.env.PORT) || 5050;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
