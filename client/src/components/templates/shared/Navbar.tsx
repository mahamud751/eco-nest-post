"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Drawer,
  Badge,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { FiUser } from "react-icons/fi";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Link from "next/link";
import { CategoryMenu } from "@/components/templates/shared/CategoryMenu";

import { useAuth } from "@/services/hooks/auth";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  const handleLogOut = () => {
    logoutUser();
  };

  const [cartOpen, setCartOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);

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
    <AppBar position="static" className="bg-white text-black shadow-md">
      <Toolbar className="flex justify-between">
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
          <Badge badgeContent={2} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
          <div className="w-80 p-4">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p>Product Name</p>
                  <p>$50</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="contained" color="primary" fullWidth>
                Checkout
              </Button>
            </div>
          </div>
        </Drawer>

        {/* Conditional rendering for user login state */}
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
      </Toolbar>

      <Toolbar className="bg-gray-100">
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

        <div className="ml-auto flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
