import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Lang } from "./about.controller";

const filePath = path.join(__dirname, "../data/projects.json");

const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));

export const getProjects = (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as Lang) || "en";
    const data = readData();
    res.json(data[lang] || data["en"]);
  } catch (err) {
    res.status(500).json({ error: "Failed to read projects data." });
  }
};

export const updateProject = (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as Lang) || "en";
    const newProjects = req.body;

    const data = readData();
    data[lang] = newProjects;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ message: "Projects data updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update project data." });
  }
};


export const uploadProjectImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const filePath = `/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl: filePath });
    
  } catch (error) {
    res.status(500).json({ error: "Image upload failed" });
  }
};