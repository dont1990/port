import express from "express";
import cors from "cors";
import path from "path";
import heroRoutes from "./routes/hero.route";
import aboutRoutes from "./routes/about.route";
import skillsRouter from "./routes/skills.route";
import projectsRouter from "./routes/projects.route";
import experiencesRouter from "./routes/experiences.route";
import submissionsRouter from "./routes/submissions.route";

// admin
import adminRoutes from "./routes/admin.route";
import contactInfoRoutes from "./routes/contactInfo.route";
import suggestionsRoutes from "./routes/suggestions.routes";
import fs from "fs";
import cookieParser from "cookie-parser";


import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4000;


app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true, // important to allow cookies
}));

const uploadsDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experiences", experiencesRouter);
app.use("/api/submissions", submissionsRouter);

app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/suggestions", suggestionsRoutes);

// admin
app.use("/api/admin", adminRoutes); // or app.use("/api/admin", adminRoutes) and router.post("/login", ...)

// Protect other admin API endpoints:
// app.use("/api/admin/protected-route", adminAuthMiddleware, (req, res) => {
//   res.json({ secret: "admin only data" });
// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
