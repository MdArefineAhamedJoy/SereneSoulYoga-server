import express from "express";
import * as userController from "./user.controller.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.patch("/:id/role", userController.updateUserRole);

export default router;
