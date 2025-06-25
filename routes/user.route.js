import express from "express";

import {
  getAllUsers,
  createUser,
  changeUserPassword,
  deleteUser,
  loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", loginUser);
router.post("/", createUser);
router.put("/:id", changeUserPassword);
router.delete("/:id", deleteUser);

export default router;
