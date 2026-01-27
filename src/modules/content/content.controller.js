import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as contentService from "./content.service.js";

export const getBanners = asyncHandler(async (req, res) => {
  const result = await contentService.getBanners();
  res.send(result);
});

export const getTopYoga = asyncHandler(async (req, res) => {
  const result = await contentService.getTopYoga();
  res.send(result);
});

export const getMemberships = asyncHandler(async (req, res) => {
  const result = await contentService.getMemberships();
  res.send(result);
});

export const getHealth = asyncHandler(async (req, res) => {
  const result = await contentService.getHealth();
  res.send(result);
});

export const getBlogs = asyncHandler(async (req, res) => {
  const result = await contentService.getBlogs();
  res.send(result);
});

export const getFeedback = asyncHandler(async (req, res) => {
  const result = await contentService.getFeedback();
  res.send(result);
});
