"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

const Success = () => {
  const { cartDetails, removeItem, totalPrice } = useShoppingCart();
  const items = Object.values(cartDetails ?? {});
  const router = useRouter();
  const final = async () => {
    try {
      const response = await fetch("/api/save-in-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
          totalAmount: totalPrice,
        }),
      });
      if (response.status === 403) {
        toast.error("Please Sign In");
        router.push("/sign-in");
      }
      const res = await response.json();
      for (let i = 0; i < items.length; i++) {
        removeItem(items[i].id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (items.length > 0) {
      final();
    }
  });
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-semibold">
        Thank you for using our product!
      </h1>
      <Link href={"/"}>
        <p className="hover:font-bold border-b border-black">
          Go back to shopping --{">"}
        </p>
      </Link>
    </div>
  );
};

export default Success;
