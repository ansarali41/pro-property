import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const { type, data: { object } } = event;

  switch (type) {
    case "payment_intent.succeeded":
      // Update payment status
      await db.execute(
        `UPDATE payments 
         SET status = 'COMPLETED', stripe_payment_id = $1
         WHERE id = $2`,
        [object.id, object.metadata.paymentId]
      );

      // Send confirmation email
      const payment = await db.execute(
        `SELECT p.*, u.email, u.name
         FROM payments p
         JOIN users u ON p.user_id = u.id
         WHERE p.id = $1`,
        [object.metadata.paymentId]
      );

      if (payment.rows[0]) {
        await sendEmail({
          to: payment.rows[0].email,
          subject: "Payment Confirmation",
          template: "payment-confirmation",
          variables: {
            name: payment.rows[0].name,
            amount: (object.amount / 100).toFixed(2),
            date: new Date().toLocaleDateString()
          }
        });
      }
      break;

    case "payment_intent.payment_failed":
      // Update payment status
      await db.execute(
        `UPDATE payments 
         SET status = 'FAILED', stripe_payment_id = $1
         WHERE id = $2`,
        [object.id, object.metadata.paymentId]
      );

      // Send failure notification
      const failedPayment = await db.execute(
        `SELECT p.*, u.email, u.name
         FROM payments p
         JOIN users u ON p.user_id = u.id
         WHERE p.id = $1`,
        [object.metadata.paymentId]
      );

      if (failedPayment.rows[0]) {
        await sendEmail({
          to: failedPayment.rows[0].email,
          subject: "Payment Failed",
          template: "payment-failed",
          variables: {
            name: failedPayment.rows[0].name,
            amount: (object.amount / 100).toFixed(2)
          }
        });
      }
      break;
  }

  return new NextResponse(null, { status: 200 });
}