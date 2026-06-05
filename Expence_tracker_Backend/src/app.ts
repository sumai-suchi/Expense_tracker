// src/app.ts
import express from "express";
import userRoutes from "./modules/user/user.route";
import expenseRoutes from "./modules/expense/expense.route";
import authRoutes from "./modules/auth/auth.route";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

export default app;