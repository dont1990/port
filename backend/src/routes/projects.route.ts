import { Router } from "express";
import { getProjects, updateProject, uploadProjectImage } from "../controllers/projects.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", getProjects);
router.put("/", updateProject);

// router.post("/", addProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);

// New image upload endpoint
// UPLOAD project image
router.post("/upload-image", upload.single("image"), uploadProjectImage);


export default router;
