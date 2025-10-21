"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/constants";

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "klarna", "paypal"],
    line_items,
    mode: "payment",
    success_url: `${BASE_URL}/success`,
    cancel_url: `${BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
