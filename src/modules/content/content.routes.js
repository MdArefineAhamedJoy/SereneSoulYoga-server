import express from "express";
import * as contentController from "./content.controller.js";

const router = express.Router();

router.get("/banners", contentController.getBanners);
router.get("/top-yoga", contentController.getTopYoga);
router.get("/memberships", contentController.getMemberships);
router.get("/health-tips", contentController.getHealth);
router.get("/blogs", contentController.getBlogs);
router.get("/feedbacks", contentController.getFeedback);

export default router;
