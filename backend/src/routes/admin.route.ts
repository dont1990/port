// src/routes/adminAuth.route.ts
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "121212";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// POST /admin/login
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: false,   // true in production with HTTPS
    sameSite: "none", // cross-site cookies require "none"
    maxAge: 60 * 60 * 1000
  });

  res.json({ success: true });
});

// Middleware to protect routes
export const requireAdminAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default router;
