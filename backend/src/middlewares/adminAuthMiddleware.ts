// src/middleware/adminAuth.ts
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
