import { Box, Typography } from "@mui/material";
import { ShoppingCart as CartIcon } from "@mui/icons-material";
import Odometer from "react-odometerjs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import "odometer/themes/odometer-theme-default.css";

const CartSummary = () => {
    const cartItemsFromRedux = useSelector(
        (state: RootState) => state.cart.cartItems
    );

    const grandTotal = cartItemsFromRedux
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        .toFixed(2);

    const cartItemCount = cartItemsFromRedux.length;

    return (
        <Box padding={2}>
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
        </Box>
    );
};

export default CartSummary;
