import { Request, Response } from "express";
import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  toggleTaskService,
} from "../services/task.service";

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await createTaskService(req.body, (req as any).user.userId);
    res.status(201).json(task);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasksService(req.query, (req as any).user.userId);
    res.json(tasks);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await getTaskByIdService(req.params.id as string, (req as any).user.userId);
    res.json(task);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await updateTaskService(req.params.id as string, req.body, (req as any).user.userId);
    res.json(task);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await deleteTaskService(req.params.id as string, (req as any).user.userId);
    res.json({ message: "Task deleted" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  try {
    const task = await toggleTaskService(req.params.id as string, (req as any).user.userId);
    res.json(task);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};