import express from "express";
import {
  getSuggestions,
  addSuggestion,
  updateSuggestion,
  deleteSuggestion,
} from "../controllers/suggestions.controller";

const router = express.Router();

router.get("/", getSuggestions);
router.post("/", addSuggestion);
router.put("/:id", updateSuggestion);
router.delete("/:id", deleteSuggestion);

export default router;
