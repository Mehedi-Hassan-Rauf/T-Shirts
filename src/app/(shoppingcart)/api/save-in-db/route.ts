import { CartEntry } from "use-shopping-cart/core";
// import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/(auth)/actions/getCurrentUser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const manageOrderInDB = async (
  items: CartEntry[],
  total: number,
  userId: string
) => {
  const createdOrder = await prisma.order.create({
    data: {
      userId,
      amount: total,
      currency: "usd",
      status: "Payment done",
    },
  });
  console.log("Order created");
  const orderItem = items.map(async (item) => {
    await prisma.orderItem.create({
      data: {
        orderId: createdOrder.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        size: item.size,
      },
    });
  });

  await Promise.all(orderItem);
  return createdOrder;
};

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "not signed in" }, { status: 403 });
  }
  const userId = user.id;
  try {
    const body = await req.json();
    const { items, totalAmount } = body;
    // return NextResponse.json({ items: items }, { status: 200 });
    const createdOrder = await manageOrderInDB(items, totalAmount, userId);
    // console.log(createdOrder);
    return NextResponse.json(createdOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
