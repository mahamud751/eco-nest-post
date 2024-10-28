import React, { useState } from "react";
import { Card, TextField, Button, Snackbar } from "@mui/material";
import { CartItem } from "@/app/redux/types";
import Swal from "sweetalert2";

export const PriceTotal: React.FC<{
  cartItems: CartItem[];
  discountAmount?: number;
}> = ({ cartItems, discountAmount = 0 }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [apiError, setApiError] = useState("");
  const [currentDiscountAmount, setCurrentDiscountAmount] =
    useState(discountAmount);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const vat = 40;
  const total = subtotal + vat - currentDiscountAmount;

  const handleApplyDiscount = async () => {
    try {
      const discountResponse = await fetch(
        `https://api.korbojoy.shop/v1/discounts?page=1&perPage=10&name=${discountCode}`
      );

      if (!discountResponse.ok) {
        throw new Error("Invalid discount code");
      }

      const { data } = await discountResponse.json();

      if (data.length > 0) {
        const discountData = data[0];
        const discountAmount = parseFloat(discountData.amount);
        setCurrentDiscountAmount(discountAmount);
        setDiscountCode("");
      } else {
        Swal.fire({
          icon: "warning",
          title: "No Discount Found",
          text: "The discount code you entered is not valid.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No Discount Found",
      });
    }
  };

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

        {currentDiscountAmount > 0 && (
          <div className="flex justify-between w-full mt-2">
            <span>Discount:</span>
            <span>-৳{currentDiscountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between w-full mt-2">
          <span>Total:</span>
          <span>৳{total.toFixed(2)}</span>
        </div>

        <div className="flex flex-col items-end mt-4">
          <div className="flex gap-2">
            <TextField
              variant="outlined"
              label="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              sx={{ width: 200 }}
            />
            <Button variant="contained" onClick={handleApplyDiscount}>
              Apply
            </Button>
          </div>
          <Snackbar
            open={!!apiError}
            autoHideDuration={6000}
            onClose={() => setApiError("")}
            message={apiError}
          />
        </div>
      </div>
    </Card>
  );
};
