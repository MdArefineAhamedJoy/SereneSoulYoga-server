import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as classService from "./class.service.js";

export const updateClass = asyncHandler(async (req, res) => {
  const result = await classService.updateClassEnrollment(req.params.id);
  res.send(result);
});

export const getAllClasses = asyncHandler(async (req, res) => {
  const result = await classService.getAllClasses();
  res.send(result);
});

export const getApprovedClasses = asyncHandler(async (req, res) => {
  const result = await classService.getApprovedClasses(req.query.status);
  res.send(result);
});

export const selectClass = asyncHandler(async (req, res) => {
  const result = await classService.selectClass(req.body);
  res.send(result);
});

export const getSelectedClasses = asyncHandler(async (req, res) => {
  const result = await classService.getSelectedClasses(req.params.email);
  res.send(result);
});

export const deleteClass = asyncHandler(async (req, res) => {
  const result = await classService.deleteSelectedClass(req.params.id);
  res.send(result);
});

export const updateClassStatus = asyncHandler(async (req, res) => {
  const result = await classService.updateClassStatus(
    req.params.id,
    req.body.status,
  );
  res.send(result);
});

export const getPopularClasses = asyncHandler(async (req, res) => {
  const result = await classService.getPopularClasses();
  res.send(result);
});

export const addClassFeedback = asyncHandler(async (req, res) => {
  const result = await classService.addClassFeedback(
    req.params.id,
    req.body.feedback,
  );
  res.send(result);
});
