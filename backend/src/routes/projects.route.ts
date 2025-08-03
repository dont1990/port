import { Router } from "express";
import { getProjects, updateProject } from "../controllers/projects.controller";

const router = Router();

router.get("/", getProjects);
router.put("/", updateProject);

// router.post("/", addProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);

export default router;
