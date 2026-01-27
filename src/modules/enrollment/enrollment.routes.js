import express from "express";
import * as enrollmentController from "./enrollment.controller.js";

const router = express.Router();

// Get selected class by ID (Wait, this is selected class, maybe it belongs in class module? Leaving for now but simplifying path)
router.get("/selection/:id", enrollmentController.getSelectedClassById);

// Enroll in a class
router.post("/", enrollmentController.enrollClass);

// Get enrolled classes by email
router.get("/:email", enrollmentController.getEnrolledClasses);

export default router;
