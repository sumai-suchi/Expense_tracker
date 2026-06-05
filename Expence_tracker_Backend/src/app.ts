// src/app.ts
import express from "express";
import userRoutes from "./modules/user/user.route";
import expenseRoutes from "./modules/expense/expense.route";
import authRoutes from "./modules/auth/auth.route";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

export default app;