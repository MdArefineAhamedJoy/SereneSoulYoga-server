import express from "express";
import * as classController from "./class.controller.js";

const router = express.Router();

// Update class seats and enrollment
router.put("/:id", classController.updateClass);

// Get all classes
router.get("/", classController.getAllClasses);

// Get classes by approval status
router.get("/approved", classController.getApprovedClasses);

// Select a class
router.post("/selection", classController.selectClass);

// Get selected classes by email
router.get("/selection/:email", classController.getSelectedClasses);

// Delete a selected class
router.delete("/selection/:id", classController.deleteClass);

// Update class status
router.patch("/:id/status", classController.updateClassStatus);

// Get popular classes
router.get("/popular", classController.getPopularClasses);

// Add feedback to class
router.put("/:id/feedback", classController.addClassFeedback);

export default router;
