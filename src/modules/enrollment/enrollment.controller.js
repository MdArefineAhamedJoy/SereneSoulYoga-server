import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as enrollmentService from "./enrollment.service.js";

export const getSelectedClassById = asyncHandler(async (req, res) => {
  const result = await enrollmentService.getSelectedClassById(req.params.id);
  res.send(result);
});

export const enrollClass = asyncHandler(async (req, res) => {
  const result = await enrollmentService.enrollClass(req.body, req.query.id);
  res.send(result);
});

export const getEnrolledClasses = asyncHandler(async (req, res) => {
  const result = await enrollmentService.getEnrolledClasses(req.params.email);
  res.send(result);
});
