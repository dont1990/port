import express from "express";
import {
  getSuggestions,
  addSuggestion,
  deleteSuggestion,
} from "../controllers/suggestions.controller";
import { requireAdminAuth } from "../middlewares/adminAuthMiddleware";

const router = express.Router();

router.get("/", getSuggestions);
// protect these:
router.post("/", requireAdminAuth, addSuggestion);
router.delete("/:id", requireAdminAuth, deleteSuggestion);

export default router;
