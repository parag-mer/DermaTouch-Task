import { Router } from "express";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";
import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Place order (protected)
// expected body: { items: [{ productId, quantity }] }
router.post("/", requireAuth, (req: AuthRequest, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    const products = db.getProducts();

    // build order items with price/title
    const orderItems = items.map((it: any) => {
      const product = products.find((p) => p.id === it.productId);
      if (!product) throw new Error(`Product ${it.productId} not found`);
      return {
        productId: product.id,
        quantity: Number(it.quantity) || 1,
        price: product.price,
        title: product.title,
      };
    });

    const total = orderItems.reduce(
      (s: number, it: any) => s + it.price * it.quantity,
      0
    );

    const order = {
      id: uuidv4(),
      userId: req.user!.email,
      items: orderItems,
      total,
      createdAt: new Date().toISOString(),
    };

    db.addOrder(order);

    return res.status(201).json({ message: "Order placed", order });
  } catch (err: any) {
    console.error(err);
    return res
      .status(400)
      .json({ error: err.message || "Failed to place order" });
  }
});

// GET /api/orders - get current user's orders
router.get("/", requireAuth, (req: AuthRequest, res) => {
  try {
    const all = db.getOrders();
    const mine = all.filter((o) => o.userId === req.user!.email);
    return res.json({ orders: mine });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to get orders" });
  }
});

export default router;
