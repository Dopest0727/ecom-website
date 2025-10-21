"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items: CartItem[] = JSON.parse(itemsJson);

  const line_items = items.map((item) => ({
    price_data: {
      currency: "sek",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL is not defined in environment variables");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "klarna", "paypal"],
    line_items,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
