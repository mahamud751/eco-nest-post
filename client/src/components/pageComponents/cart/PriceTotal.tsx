import React from "react";
import { Card } from "@mui/material";
import { CartItem } from "@/app/redux/types";

export const PriceTotal: React.FC<{
  cartItems: CartItem[];
}> = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const vat = 40;
  const total = subtotal + vat;

  return (
    <Card
      className="p-2 mt-12 shadow-lg"
      sx={{
        border: "1px dotted #ccc",
        borderRadius: "12px",

        marginLeft: "auto",
      }}
    >
      <div
        className="flex flex-col items-end text-lg font-bold mb-4 w-full sm:w-350px md:w-400px"
        style={{
          marginLeft: "auto",
        }}
      >
        <div className="flex justify-between w-full">
          <span>Subtotal:</span>
          <span>৳{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between w-full mt-2">
          <span>VAT:</span>
          <span>40 TK</span>
        </div>

        <div className="flex justify-between w-full mt-2">
          <span>Total:</span>
          <span>৳{total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};
