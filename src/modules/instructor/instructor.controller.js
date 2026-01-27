import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as instructorService from "./instructor.service.js";

export const createInstructorClass = asyncHandler(async (req, res) => {
  const result = await instructorService.createInstructorClass(req.body);
  res.send(result);
});

export const getInstructorClasses = asyncHandler(async (req, res) => {
  const result = await instructorService.getInstructorClasses(
    req.params.emails,
  );
  res.send(result);
});

export const getPopularInstructors = asyncHandler(async (req, res) => {
  const result = await instructorService.getPopularInstructors();
  res.send(result);
});
