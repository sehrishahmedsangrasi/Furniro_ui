// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { writeClient } from "@/lib/writeClient";


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: Request) {
//   const sig = req.headers.get("stripe-signature")!;
//   const rawBody = await req.text();
    

//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
//   } catch (err) {
//     console.error(" Webhook signature verification failed:", err);
//     return new NextResponse("Webhook error", { status: 400 });
//   }
// console.log("Webhook triggered");
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;
//     console.log("metadataaaaaa", session.metadata)
//     const metadata = session.metadata ?? {};


//     const userId = metadata.userId ?? "";
//     let cart = [];

//     try {
//       cart = metadata.cart ? JSON.parse(metadata.cart) : [];
//     } catch (e) {
//       console.error(" Failed to parse cart from metadata:", metadata.cart);
//       console.error("Webhook error:", e);
//       cart = [];
//     }

//     try {
//       await writeClient.create({
//         _type: "order",
//         userId,
//         cart,
//         total: session.amount_total! / 100,
//         createdAt: new Date().toISOString(),
//         paymentIntent: session.payment_intent?.toString() ?? "",
//         deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), //
//       });

//       console.log(" Order saved to Sanity for user:", userId);
//       return new NextResponse("Success", { status: 200 });
//     } catch (err) {
//       console.error(" Sanity push failed:", err);
//       return new NextResponse("Sanity error", { status: 500 });
//     }
//   }

//   return new NextResponse("Event received", { status: 200 });
// }
// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

//  Don't import a pre-initialized client like this:
// import { writeClient } from "@/lib/writeClient"; 

//  Instead import the factory and create the client at runtime:
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const runtime = 'nodejs'; // Use Node runtime

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};

    const userId = metadata.userId ?? "";
    let cart = [];

    try {
      cart = metadata.cart ? JSON.parse(metadata.cart) : [];
    } catch (e) {
      console.error("Failed to parse cart from metadata:", metadata.cart);
      console.log(e)
    }

    // ✅ Dynamically import and initialize Sanity client here
    const { createClient } = await import('@sanity/client');
    const writeClient = createClient({
      projectId: 'srkj07q7',
      dataset: 'production',
      apiVersion: '2023-05-03',
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    try {
      await writeClient.create({
        _type: "order",
        userId,
        cart,
        total: session.amount_total! / 100,
        createdAt: new Date().toISOString(),
        paymentIntent: session.payment_intent?.toString() ?? "",
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });

      console.log("Order saved to Sanity for user:", userId);
      return new NextResponse("Success", { status: 200 });
    } catch (err) {
      console.error("Sanity push failed:", err);
      return new NextResponse("Sanity error", { status: 500 });
    }
  }

  return new NextResponse("Event received", { status: 200 });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
