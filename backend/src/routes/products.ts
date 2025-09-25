import { Router } from "express";
import { db } from "../db";

const router = Router();

// GET /api/products
// optional query: q (search), category
router.get("/", (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const category = (req.query.category as string) || "";

    let products = db.getProducts();

    if (category) {
      products = products.filter(
        (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (q) {
      const lower = q.toLowerCase();
      products = products.filter((p) =>
        (p.title + " " + (p.description || "")).toLowerCase().includes(lower)
      );
    }

    return res.json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;
