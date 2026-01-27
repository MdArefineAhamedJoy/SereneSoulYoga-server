import Stripe from "stripe";

let stripe;
if (process.env.PAYMENT_KEY) {
  stripe = new Stripe(process.env.PAYMENT_KEY);
} else {
  console.warn("PAYMENT_KEY is not defined in environment variables.");
}

export const createPaymentIntent = async (price) => {
  if (!stripe) throw new Error("Stripe is not initialized");

  if (price) {
    const amount = parseFloat(price) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });
    return { clientSecret: paymentIntent.client_secret };
  }
  return {};
};
