import React from "react";
import { Box, Button, Popper, IconButton, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Close, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { RootState } from "@/app/redux/reducers";

interface CartModalProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  removeItem: (index: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  anchorEl,
  onClose,
  removeItem,
}) => {
  const theme = useTheme();
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );
  return (
    <Popper open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Box
            sx={{
              border: 1,
              p: 2,
              background: theme.palette.mode === "dark" ? "#141a21" : "#ffffff",
              marginTop: 1,
              boxShadow: 3,
              borderRadius: 3,
              color: theme.palette.mode === "dark" ? "white" : "black",
              overflow: "auto",
              maxHeight: 400,
              width: 350,
            }}
          >
            <div className="w-80 p-6">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Cart
                </h2>
                <div className="bg-red-500 p-1">
                  <Close
                    className="cursor-pointer text-white"
                    onClick={onClose}
                  />
                </div>
              </div>
              <hr className="mt-5" />

              <div className="mt-6 space-y-4">
                {cartItemsFromRedux.length > 0 ? (
                  cartItemsFromRedux.map((item, index) => (
                    <Link
                      href={`/productDetails/${item.product.id}`}
                      key={index}
                    >
                      <div className="flex items-center justify-between p-3">
                        {item.product.photos.length > 0 ? (
                          <Image
                            width={50}
                            height={50}
                            src={item.product.photos[0].src}
                            alt={item.product.name}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 italic">No Image</span>
                        )}

                        <div className="flex-1 mx-3">
                          <p className="font-medium text-gray-800">
                            {item.product.name.slice(0, 40)}
                          </p>
                          <div className="text-sm text-gray-600">
                            <span>{item.quantity}</span> x{" "}
                            <span>৳{item.product.b2bPrice}</span>
                          </div>
                        </div>

                        <IconButton
                          onClick={() => removeItem(index)}
                          aria-label="delete"
                          color="error"
                          className="hover:bg-red-100"
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                )}
              </div>
              <hr />
              <div className="flex justify-between my-5 px-8">
                <p>SubTotal:</p>
                <p className="text-red-500 font-bold">
                  ৳
                  {cartItemsFromRedux
                    .reduce(
                      (acc, item) =>
                        acc + item.product.b2bPrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <hr />
              <div className="uppercase p-3">
                <div className="mt-6">
                  <Link href="/cart">
                    <Button
                      variant="contained"
                      fullWidth
                      className="py-3 rounded-lg bg-[#088178]"
                    >
                      View Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default CartModal;
