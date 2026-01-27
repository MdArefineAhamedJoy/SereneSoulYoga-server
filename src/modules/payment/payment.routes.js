import express from "express";
import * as paymentController from "./payment.controller.js";

const router = express.Router();

router.post("/intent", paymentController.createPaymentIntent);

export default router;
