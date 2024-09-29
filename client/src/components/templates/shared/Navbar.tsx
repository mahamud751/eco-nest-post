"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Drawer,
  Badge,
  Button,
  Box,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { CategoryMenu } from "@/components/templates/shared/CategoryMenu";
import { useAuth } from "@/services/hooks/auth";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";

import { RootState } from "@/app/redux/reducers";
import { delete_item } from "@/app/redux/actions/cartAction";
import { useSnackbar } from "@/services/contexts/useSnackbar";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  console.log(cartItemsFromRedux);

  const handleLogOut = () => {
    logoutUser();
  };

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

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;

    if (target && !target.closest(".category-dropdown")) {
      setCategoriesOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppBar
      position="static"
      className="bg-white text-black shadow-md text-[14px]"
    >
      <Toolbar
        className="flex justify-between"
        style={{ background: "linear-gradient(to right, #020304, #071e37)" }}
      >
        <Box className="container mx-auto text-white">
          <div className="flex justify-between ">
            <div className="flex">
              <p className="font-bold ]">SHOP EVENTS & SAVE UP TO 65% OFF!</p>
              <p className="font-bold ms-24 me-5">Call Us: +8801789999751</p>
              <FacebookIcon />
            </div>

            <div>
              <Link href="/" className="font-bold">
                Order Request
              </Link>
              <Link href="/" className="font-bold ms-10">
                Vendor Request
              </Link>
            </div>
          </div>
        </Box>
      </Toolbar>
      <Toolbar className="flex justify-between">
        <Box className="container mx-auto">
          <div className="flex justify-between">
            <Link href="/" className="text-xl font-bold">
              KorboJoy
            </Link>

            <div className="hidden sm:flex w-1/2 items-center bg-gray-100 p-2 rounded">
              <InputBase
                placeholder="Search products..."
                fullWidth
                className="text-black"
              />
            </div>

            <IconButton color="inherit" onClick={toggleCart}>
              <Badge badgeContent={cartItemsFromRedux?.length} color="success">
                <HiOutlineShoppingBag />
              </Badge>
            </IconButton>

            <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
              <div className="w-80 p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Your Cart
                  </h2>
                  <div className="bg-red-500 p-1">
                    <CloseIcon
                      className="cursor-pointer text-white"
                      onClick={toggleCart}
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
                        <div
                          key={index}
                          className="flex items-center justify-between p-3"
                        >
                          {item.product.photos.length > 0 ? (
                            <Image
                              width={50}
                              height={50}
                              src={item.product.photos[0].src}
                              alt={item.product.name}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <span className="text-gray-500 italic">
                              No Image
                            </span>
                          )}

                          <div className="flex-1 mx-3">
                            <p className="font-medium text-gray-800">
                              {item.product.name}
                            </p>
                            <div className="text-sm text-gray-600">
                              <span>{item.quantity}</span> x{" "}
                              <span>৳{item.product.price}</span>
                            </div>
                          </div>

                          <IconButton
                            onClick={() => removeItem(index)}
                            aria-label="delete"
                            color="error"
                            className="hover:bg-red-100"
                          >
                            <DeleteIcon />
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
              </div>
              <hr />
              <div className="flex justify-between my-5 px-8">
                <p>SubTotal:</p>
                <p className="text-red-500 font-bold">
                  ৳
                  {cartItemsFromRedux
                    .reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <hr />
              <div className="uppercase p-3">
                <div className="mt-6">
                  <Link href={"/cart"}>
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
                  <Link href={"/cart"}>
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
            </Drawer>
          </div>
        </Box>
      </Toolbar>

      <Toolbar className="bg-gray-100 mt-5">
        <Box className="container mx-auto">
          <div className="flex justify-between">
            {" "}
            <div className="flex">
              <div className="relative category-dropdown">
                <Button
                  onClick={toggleCategories}
                  className="bg-black text-white px-5 py-2 flex justify-between items-center"
                  style={{ minWidth: "300px", width: "300px", height: 70 }}
                >
                  <span className="flex-1 text-left ms-4">Categories</span>
                  <DensityMediumIcon style={{ fontSize: 16 }} />
                </Button>

                {categoriesOpen && <CategoryMenu />}
              </div>
              <div className="flex space-x-4 mt-6 uppercase ms-24">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <div className="mt-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span>Welcome, {user.name}</span>
                  <span
                    onClick={handleLogOut}
                    className="cursor-pointer text-gray-700 hover:text-blue-500"
                  >
                    Log Out
                  </span>
                </div>
              ) : (
                <Link href="/login">
                  <span className="cursor-pointer text-gray-700 hover:text-blue-500">
                    Sign Up / Log In
                  </span>
                </Link>
              )}
            </div>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
