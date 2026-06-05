// src/modules/user/user.route.ts
import express from "express";
import { createUser, getUsers } from "./user.controller";


const router = express.Router();

router.post("/create", createUser);
router.get("/list", getUsers);

export default router;