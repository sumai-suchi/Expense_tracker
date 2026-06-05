// src/modules/user/user.controller.ts

import type { Request, Response } from "express";
import prisma from "../../config/prisma"
export const createUser = async (req : Request, res : Response) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: { name, email },
  });

  res.json(user);
};

export const getUsers = async (req : Request, res : Response) => {
  const users = await prisma.user.findMany({
    include: { expenses: true },
  });

  res.json(users);
};