"use client";

import { Drawer, IconButton, Button } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  removeItem: (index: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  removeItem,
}) => {
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-80 p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
          <div className="bg-red-500 p-1">
            <Close className="cursor-pointer text-white" onClick={onClose} />
          </div>
        </div>
        <hr className="mt-5" />

        <div className="mt-6 space-y-4">
          {cartItemsFromRedux.length > 0 ? (
            cartItemsFromRedux.map((item, index) => (
              <Link href={`/productDetails/${item.product.id}`} key={index}>
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
                      {item.product.name}
                    </p>
                    <div className="text-sm text-gray-800">
                      <span>{item.quantity}</span> x{" "}
                      <span>৳{item.product.discountPrice}</span>
                      <span className="text-gray-400 line-through ms-2">
                        ৳{item.product.price}
                      </span>
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
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        <hr />
        <div className="flex justify-between my-5 px-8">
          <p>SubTotal:</p>
          <p className="text-red-500 font-bold">
            ৳
            {cartItemsFromRedux
              .reduce(
                (acc, item) => acc + item.product.discountPrice * item.quantity,
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
          <div className="mt-6">
            <Link href="/cart">
              <Button
                variant="contained"
                fullWidth
                className="py-3 rounded-lg bg-[#088178]"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
