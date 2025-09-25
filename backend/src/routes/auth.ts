import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";

const router = Router();
const SECRET = process.env.JWT_SECRET || "DERMA_SECRET_123";
const TOKEN_EXP = "6h"; // for demo

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const users = db.getUsers();
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), email, password: hashed };
    db.addUser(newUser);

    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = db.getUsers().find((u) => u.email === email);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user.id }, SECRET, {
      expiresIn: TOKEN_EXP,
    });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
});

export default router;
