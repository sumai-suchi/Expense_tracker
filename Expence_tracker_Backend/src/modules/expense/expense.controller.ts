import type { Response } from "express";
import prisma from "../../config/prisma";
import type { AuthRequest } from "../../middlewares/auth.middleware";

export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, amount, category } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "User unauthorized" });
      return;
    }

    if (!title || amount === undefined || !category) {
      res.status(400).json({ error: "Title, amount, and category are required" });
      return;
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amount: Number(amount),
        category,
        userId,
      },
    });

    res.status(201).json(expense);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "User unauthorized" });
      return;
    }

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        ...(category ? { category: String(category) } : {}),
      },
    });

    res.json(expenses);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "User unauthorized" });
      return;
    }

    const expense = await prisma.expense.findFirst({
      where: {
        id: String(id),
        userId,
      },
    });

    if (!expense) {
      res.status(404).json({ error: "Expense not found or unauthorized to delete" });
      return;
    }

    const deleted = await prisma.expense.delete({
      where: { id: String(id) },
    });

    res.json(deleted);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const totalExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "User unauthorized" });
      return;
    }

    const total = await prisma.expense.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    res.json({ total: total._sum.amount || 0 });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, amount, category } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "User unauthorized" });
      return;
    }

    const expense = await prisma.expense.findFirst({
      where: {
        id: String(id),
        userId,
      },
    });

    if (!expense) {
      res.status(404).json({ error: "Expense not found or unauthorized to update" });
      return;
    }

    const updated = await prisma.expense.update({
      where: { id: String(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(amount !== undefined && { amount: Number(amount) }),
        ...(category !== undefined && { category }),
      },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};