import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, items } = body;
    


    // Validate user ID
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Validate cart items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "pkr", // Adjust if needed
          product_data: {
            name: item.name,
           
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects smallest currency unit (paisa)
        },
        quantity: item.quantity,
      })),
      success_url: `${req.headers.get("origin")}/order-history?success=true`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      metadata: {
        userId: String(userId),
        cart: JSON.stringify(
          items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            
          }))
        ),
      },
    });

    // Redirect to Stripe Checkout
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err.message || err);
    return NextResponse.json(
      { error: "Stripe checkout session failed" },
      { status: 500 }
    );
  }
}
