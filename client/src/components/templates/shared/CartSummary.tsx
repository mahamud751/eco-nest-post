"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ShoppingCart as CartIcon } from "@mui/icons-material";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Odometer from "react-odometerjs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import "odometer/themes/odometer-theme-default.css";
import CartDrawer from "./CartDrawer";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import { delete_item } from "@/app/redux/actions/cartAction";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const CartSummary = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { openSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const toggleCart = () => setCartOpen(!cartOpen);

  const grandTotal = cartItemsFromRedux
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  const cartItemCount = cartItemsFromRedux.length;

  const removeItem = (index: number) => {
    if (index < 0 || index >= cartItemsFromRedux.length) return;
    const item = cartItemsFromRedux[index];
    if (item) {
      dispatch(delete_item(item.product.id, item.size, item.color));
      openSnackbar(
        `${item.product.name} Item removed from cart!`,
        "success",
        "#f44336"
      );
    }
  };

  return (
    <Box
      position="fixed"
      top="50%"
      right={1}
      zIndex={1000}
      sx={{
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
      onClick={toggleCart}
    >
      <div className="text-center text-white">
        <div className="px-3 py-5 bg-[#1F9F7F] rounded-tl-[10%] rounded-bl-[10%]">
          <div className="flex">
            <LocalMallIcon sx={{ color: "#FFFFFF", fontSize: 18 }} />
            <Typography
              variant="body2"
              className="text-white font-extrabold ms-2"
            >
              {cartItemCount} Items
            </Typography>
          </div>
          <div className="bg-[#F0F0F0] py-1 text-[#1F9F7F] rounded-[7%] mt-3 font-extrabold text-[12px]">
            <Typography variant="caption" className="mx-1 ">
              ৳
            </Typography>
            <Odometer
              value={parseFloat(grandTotal)}
              format="d"
              theme="default"
            />
          </div>
        </div>
      </div>
      <CartDrawer
        open={cartOpen}
        onClose={toggleCart}
        removeItem={removeItem}
      />
    </Box>
  );
};

export default CartSummary;
