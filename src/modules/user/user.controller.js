import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as userService from "./user.service.js";

export const createUser = asyncHandler(async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.send(result);
  } catch (error) {
    if (error.message === "User Already Exist") {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers();
  res.send(result);
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  const result = await userService.updateUserRole(id, role);
  res.send(result);
});
