import express from "express";
import classRoutes from "../modules/class/class.routes.js";
import contentRoutes from "../modules/content/content.routes.js";
import enrollmentRoutes from "../modules/enrollment/enrollment.routes.js";
import instructorRoutes from "../modules/instructor/instructor.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/classes", classRoutes);
router.use("/instructors", instructorRoutes);
router.use("/payment", paymentRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/content", contentRoutes);

export default router;
