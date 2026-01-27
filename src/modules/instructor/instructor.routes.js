import express from "express";
import * as instructorController from "./instructor.controller.js";

const router = express.Router();

// Create a new class (instructor)
router.post("/classes", instructorController.createInstructorClass);

// Get classes by instructor email
router.get("/:emails/classes", instructorController.getInstructorClasses);

// Get popular instructors
router.get("/popular", instructorController.getPopularInstructors);

export default router;
