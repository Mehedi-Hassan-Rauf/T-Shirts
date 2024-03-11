import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/(auth)/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import Stripe from "stripe";
import { CartEntry } from "use-shopping-cart/core";
import { it } from "node:test";
import formatPrice from "@/utils/formatPrice";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2023-10-16",
// });

// const manageStripePaymentIntent = async (
//   payment_intent_id: string,
//   total: number
// ) => {
//   if (payment_intent_id) {
//     const something = await stripe.paymentIntents.update(payment_intent_id, {
//       amount: total,
//     });
//     return something;
//   }
//   // console.log("hey");

//   return await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//     automatic_payment_methods: { enabled: true },
//   });
// };

// const manageOrderInDB = async (
//   paymentIntent: any,
//   total: number,
//   items: CartEntry[],
//   userId: string
// ) => {
//   const existingOrder = await prisma.order.findUnique({
//     where: { paymentIntentID: paymentIntent.id },
//   });

//   if (existingOrder) {
//     return await prisma.order.update({
//       where: { paymentIntentID: paymentIntent.id },
//       data: {
//         userId,
//         amount: total,
//         currency: "usd",
//         status: "awaiting payment",
//       },
//     });
//   }

//   const createdOrder = await prisma.order.create({
//     data: {
//       userId,
//       amount: total,
//       currency: "usd",
//       status: "awaiting payment",
//       paymentIntentID: paymentIntent.id,
//     },
//   });

//   const orderItem = items.map(async (item) => {
//     await prisma.orderItem.create({
//       data: {
//         orderId: createdOrder.id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         image: item.image,
//         size: item.size,
//       },
//     });
//   });

//   await Promise.all(orderItem);
//   return createdOrder;
// };

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "not signed in" }, { status: 403 });
  }

  const userId = user.id;
  const body = await req.json();
  const { items, totalAmount } = body;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const modifiedItems = items.map((item: CartEntry) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price,
      product_data: {
        name: item.name,
        images: [item.image],
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: modifiedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_WEB_URL}/success`,
    cancel_url: `${process.env.NEXT_WEB_URL}/cart`,
    metadata: {
      userId,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
  });
  // return NextResponse.json(session, { status: 200 });
  return NextResponse.json({ id: session.id }, { status: 200 });
}
