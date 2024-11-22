import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stripe, SUBSCRIPTION_PLANS } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const subscriptionUrl = absoluteUrl("/dashboard/subscription");

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { priceId } = await req.json();

    // Validate price ID
    if (!Object.values(SUBSCRIPTION_PLANS).some(plan => plan.priceId === priceId)) {
      return new NextResponse("Invalid price ID", { status: 400 });
    }

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      client_reference_id: session.user.id,
      customer_email: session.user.email!,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${subscriptionUrl}?success=true`,
      cancel_url: `${subscriptionUrl}?success=false`,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Subscription error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}