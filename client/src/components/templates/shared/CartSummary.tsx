'use client';
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ShoppingCart as CartIcon } from "@mui/icons-material";
import Odometer from "react-odometerjs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import "odometer/themes/odometer-theme-default.css";
import CartDrawer from "./CartDrawer";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import { delete_item } from "@/app/redux/actions/cartAction";

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
                cursor: 'pointer',
                '&:hover': {
                    opacity: 0.8,
                }
            }}
            onClick={toggleCart}
        >
            <div className="text-center text-white">
                <div className="p-2 bg-[#126963] rounded-tl-[25%]">
                    <div>
                        <CartIcon sx={{ marginRight: 1 }} />
                    </div>
                    <Typography variant="body2" className="text-white">
                        {cartItemCount} Items
                    </Typography>
                </div>

                <div className="bg-[#F0F0F0] py-1 text-black">
                    <Typography variant="caption" className="mx-1">
                        ৳
                    </Typography>
                    <Odometer value={parseFloat(grandTotal)} format="d" theme="default" />
                </div>
            </div>
            <CartDrawer open={cartOpen} onClose={toggleCart} removeItem={removeItem} />
        </Box>
    );
};

export default CartSummary;
