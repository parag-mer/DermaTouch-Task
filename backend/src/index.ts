import express from "express";
import cors from "cors";
import { initializeData } from "./db";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();

app.use(cors());
app.use(express.json());

// Initialize (creates data.json if not present)
initializeData();

app.get("/", (req, res) => res.json({ ok: true, message: "Server is up 🚀" }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
