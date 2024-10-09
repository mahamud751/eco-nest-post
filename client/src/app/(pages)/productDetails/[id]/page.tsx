"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import AdditionalTab from "@/components/pageComponents/productDetails/AdditionalTab";

import { Category, Product, WishlistItem } from "@/services/types";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import { add_item } from "@/app/redux/actions/cartAction";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { CartItem } from "@/app/redux/types";
import UseFetch from "@/services/hooks/useFetch";
import { useAuth } from "@/services/hooks/auth";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails = ({ params: { id } }: ProductDetailsProps) => {
  const { user } = useAuth();
  const {
    data: categories,
    loading,
    error,
  } = UseFetch<Category[]>("categories");
  const { data: wishlist, reFetch: wishlistRefetch } =
    UseFetch<WishlistItem[]>(`wishlist`);
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const productId = product?.id;
  const userName = user?.name;
  const email = user?.email;
  const exactWishList = wishlist?.filter(
    (wishListItem) => wishListItem?.productId === id
  );
  const userWishList = exactWishList?.find(
    (wishListItem) => wishListItem?.email === email
  );

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/products/${id}?status=active`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  // Add product to wishlist
  const handleAddToWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const wishlistItem = {
        userName,
        productId: productId,
        email,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/wishlist`,
        wishlistItem
      );
      toast.success("Product added to wishlist!");
      wishlistRefetch();
    } catch (err) {
      toast.error("Error adding product to wishlist");
    }
  };

  // Remove product from wishlist
  const handleRemoveFromWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/wishlist/${userWishList?.id}`
      );
      toast.success("Product removed from wishlist!");
      wishlistRefetch(); // Refresh the wishlist data
    } catch (err) {
      toast.error("Error removing product from wishlist");
    }
  };

  const images = product?.photos || [];
  const colors = product?.colors || [];
  const sizes = product?.sizes || [];
  const categoryName = product?.category?.name || "Category not available";

  const handleImageSelect = (src: string) => {
    setSelectedImage(src);
  };

  const notify = () => toast.success("Successfully added your item!");

  const handleAddItem = (item: CartItem) => {
    if (sizes.length > 0 && !size) {
      openSnackbar("Please select a size", "error", "#f44336");
      return;
    }

    if (colors.length > 0 && !color) {
      openSnackbar("Please select a color", "error", "#f44336");
      return;
    }

    dispatch(
      add_item({
        product: item.product,
        quantity: quantity,
        size: size || "N/A",
        color: color || "N/A",
      })
    );

    notify();
    openSnackbar("Item added to cart!", "success", "#088178");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load categories</div>;

  return (
    <Box className="container mx-auto py-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={selectedImage || images[0]?.src || ""}
                alt="Selected Image"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {images.map((img) => (
                <div key={img.src} className="cursor-pointer">
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={100}
                    height={100}
                    className={`border-2 ${
                      selectedImage === img.src
                        ? "border-blue-500"
                        : "border-gray-300"
                    } rounded-lg`}
                    onClick={() => handleImageSelect(img.src)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <p className="font-bold mb-4"> Category: {categoryName}</p>
            <p className="text-gray-600 mb-6">{product?.desc}</p>

            {colors.length > 0 && (
              <div className="mb-4">
                <p className="text-lg font-semibold mb-2">Select Color</p>
                <div className="flex gap-4">
                  {colors.map((clr) => (
                    <button
                      key={clr}
                      className={`w-8 h-8 rounded-full border-2 ${
                        color === clr ? "border-blue-500" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: clr }}
                      onClick={() => setColor(clr)}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mb-4">
                <p className="text-lg font-semibold mb-2">Select Size</p>
                <div className="flex gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`w-10 h-10 text-sm font-bold border-2 ${
                        size === sz
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      } rounded-lg`}
                      onClick={() => setSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center">
              <Button
                variant="outlined"
                className="flex items-center justify-between w-20 border-gray-400 text-black p-1 h-10"
              >
                <span className="flex-grow text-center text-black">
                  {quantity}
                </span>

                <div className="flex flex-col ml-1">
                  <KeyboardArrowUpIcon
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="text-black"
                  />
                  <KeyboardArrowDownIcon
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="text-black mt-[-4px]"
                  />
                </div>
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  product &&
                  handleAddItem({
                    product,
                    quantity: quantity,
                    size: size || "N/A",
                    color: color || "N/A",
                  })
                }
                className="bg-[#088178] px-5 ms-3 shadow-md transition-transform duration-300 ease-in-out group-hover:scale-110 h-10"
                disabled={!product}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                className="ms-2 border-gray-400 h-10 w-1.5 "
              >
                <IconButton
                  onClick={
                    userWishList
                      ? handleRemoveFromWishlist
                      : handleAddToWishlist
                  }
                  className="focus:outline-none"
                >
                  <FavoriteIcon
                    className={`transition-all duration-300 ${
                      userWishList ? "text-red-500" : "text-gray-300"
                    }`}
                  />
                </IconButton>
              </Button>
            </div>
          </div>
          {product && <AdditionalTab product={product} />}
        </div>

        <div className="col-span-12 md:col-span-3 grid grid-cols-1 gap-6">
          <Card className="border">
            <CardContent>
              {categories?.map((category) => (
                <Link href={`/category/${category.id}`} key={category.id}>
                  <div className="flex items-center space-x-4 mt-6">
                    <Image
                      src={category.photos[0]?.src || "/default-image.jpg"}
                      alt={category.photos[0]?.title || category.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <Typography variant="body2">{category.name}</Typography>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="border">
            <CardContent>
              <Image
                src="/image3.jpg"
                alt="Sample Image"
                width={300}
                height={300}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export default ProductDetails;
