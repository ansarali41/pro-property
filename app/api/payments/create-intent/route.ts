import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { amount, paymentType, propertyId } = await req.json();

    // Create payment record
    const payment = await db.execute(
      `INSERT INTO payments (id, amount, type, status, property_id, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [nanoid(), amount, paymentType, "PENDING", propertyId, session.user.id]
    );

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      metadata: {
        paymentId: payment.rows[0].id,
        propertyId,
        userId: session.user.id
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}