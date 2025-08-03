import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../data/experiences.json");

export const getExperiences = (_: Request, res: Response) => {
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
};

export const updateExperiences = (req: Request, res: Response) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ message: "Experiences updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err });
  }
};
