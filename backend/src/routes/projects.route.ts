import { Router } from "express";
import { getProjects, updateProject } from "../controllers/projects.controller";
import { upload } from "../middlewares/upload";

const router = Router();

router.get("/", getProjects);
router.put("/", updateProject);

// router.post("/", addProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);

// New image upload endpoint
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ imageUrl: filePath });
});

export default router;
