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
import { basicAuth } from "./utils/basicAuth";
import contactInfoRoutes from "./routes/contactInfo.route";
import suggestionsRoutes from "./routes/suggestions.routes";
import fs from "fs";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

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
app.use("/api/admin", basicAuth);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
