import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createTaskService = async (data: any, userId: string) => {
  return prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
};

// GET ALL (Pagination + Search + Filter)
export const getTasksService = async (query: any, userId: string) => {
  const { page = 1, limit = 5, status, search } = query;

  const where: any = { userId };

  if (status !== undefined) {
    where.status = status === "true";
  }

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const tasks = await prisma.task.findMany({
    where,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: { createdAt: "desc" },
  });

  return tasks;
};

// GET ONE
export const getTaskByIdService = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) throw new Error("Task not found");

  return task;
};

// UPDATE
export const updateTaskService = async (id: string, data: any, userId: string) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteTaskService = async (id: string, userId: string) => {
  return prisma.task.delete({
    where: { id },
  });
};

// TOGGLE
export const toggleTaskService = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) throw new Error("Task not found");

  return prisma.task.update({
    where: { id },
    data: { status: !task.status },
  });
};