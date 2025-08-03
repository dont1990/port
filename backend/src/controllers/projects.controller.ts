import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/projects.json");

const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (data: any) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export const getProjects = (req: Request, res: Response) => {
  res.json(readData());
};

// export const addProject = (req: Request, res: Response) => {
//   const projects = readData();
//   const newProject = { id: Date.now(), ...req.body };
//   projects.push(newProject);
//   writeData(projects);
//   res.status(201).json(newProject);
// };

export const updateProject = (req: Request, res: Response) => {
   try {
     fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
     res.json({ message: "Projects data updated successfully." });
   } catch (err) {
     res.status(500).json({ error: "Failed to update project data." });
   }
};

// export const deleteProject = (req: Request, res: Response) => {
//   const projects = readData();
//   const filtered = projects.filter((p: any) => p.id !== Number(req.params.id));
//   writeData(filtered);
//   res.status(204).send();
// };
