import asyncHandler from "../../shared/middleware/asyncHandler.js";
import * as paymentService from "./payment.service.js";

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { price } = req.body;
  const result = await paymentService.createPaymentIntent(price);
  res.send(result);
});
