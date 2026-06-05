// src/modules/expense/expense.route.ts
import express from "express";
import {
  createExpense,
  getExpenses,
  deleteExpense,
  totalExpense,
} from "./expense.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

// Protect all routes below this line
router.use(authMiddleware);

router.post("/", createExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);
router.get("/total", totalExpense);

export default router;