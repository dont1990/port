import express from "express";
import cors from "cors";
import heroRoutes from "./routes/hero.route";
import aboutRoutes from "./routes/about.route";
import skillsRouter from "./routes/skills.route";
import projectsRouter from "./routes/projects.route";
import experiencesRouter from "./routes/experiences.route";
import submissionsRouter from "./routes/submissions.route";

// admin
import contactInfoRoutes from "./routes/contactInfo.route";
import { basicAuth } from "./utils/basicAuth";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/experiences", experiencesRouter);
app.use("/api/submissions", submissionsRouter);

app.use("/api/contact-info", contactInfoRoutes);

// admin
app.use("/api/admin", basicAuth);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
