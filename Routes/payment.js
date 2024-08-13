import express from "express";
import stripFunc from "stripe"

const paymentRouter = express.Router();

const stripe = stripFunc(process.env.STRIPE_SECRET_KEY)

paymentRouter.post("/get-payment-session", async (req, res) => {
    const { bookings = [] } = req.body;

    const lineItems = bookings.map((pd) => ({
        price_data: {
            currency: "USD",
            booking_data: {
              name: pd.name,
              images: pd.images,
            },
            unit_amount: pd.price * 100, // 109899 -> 1098.99
          },
          
        }));
      
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.FE_URL}/bookingSuccess`,
        cancel_url: `${process.env.FE_URL}/cart?payment=cancelled`,
    });
    res.json({ id: session.id });
});

export default paymentRouter;