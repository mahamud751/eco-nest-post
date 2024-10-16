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
  Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import StarRatings from "react-star-ratings";

import AdditionalTab from "@/components/pageComponents/productDetails/AdditionalTab";
import {
  Category,
  Product,
  Review,
  WishlistItem,
} from "@/services/types/types";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import { add_item } from "@/app/redux/actions/cartAction";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { CartItem } from "@/app/redux/types";
import UseFetch from "@/services/hooks/useFetch";
import { useAuth } from "@/services/hooks/auth";
import LatestProduct from "@/components/pageComponents/home/LatestProduct";

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
  const [averageRating, setAverageRating] = useState<number>(0);
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
      calculateAverageRating(response.data.reviews);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
  };
  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;
      setAverageRating(avgRating);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [id]);

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
      openSnackbar(
        `${product?.name} Item successfully add to wishlist!`,
        "success",
        "#4caf50"
      );
      wishlistRefetch();
    } catch (err) {
      toast.error("Error adding product to wishlist");
    }
  };

  const handleRemoveFromWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/wishlist/${userWishList?.id}`
      );
      openSnackbar(
        `${product?.name} Item removed from wishlist!`,
        "error",
        "#4caf50"
      );
      wishlistRefetch();
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
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 9 }}>
          <div>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <div className="border rounded-lg overflow-hidden mt-16">
                  <Image
                    src={selectedImage || images[0]?.src || ""}
                    alt="Selected Image"
                    width={500}
                    height={600}
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
                        className={`border-2 ${selectedImage === img.src
                            ? "border-blue-500"
                            : "border-gray-300"
                          } rounded-lg`}
                        onClick={() => handleImageSelect(img.src)}
                      />
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card className="shadow-lg rounded-lg p-5 h-[650px]">
                  <CardContent>
                    <h1 className="text-xl font-bold mb-2">{product?.name}</h1>
                    <div className="flex items-center mb-4">
                      <StarRatings
                        rating={averageRating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                        name="averageRating"
                      />
                      <p className="ms-3 mt-[2px]">
                        ({averageRating.toFixed(1)} / 5)
                      </p>
                    </div>
                    <Typography variant="h6" className="font-bold my-4">
                      Category: {categoryName}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mb-4">
                      {product?.desc.slice(0, 300)}...
                    </Typography>
                    <Box className="flex items-center space-x-2 mb-6">
                      <VisibilityIcon className="text-[#286156]" />
                      <Typography
                        variant="body1"
                        className="text-[#4a69b8] font-semibold"
                      >
                        {product?.views} Users Recently Viewed This Product
                      </Typography>
                    </Box>

                    {colors.length > 0 && (
                      <div className="mb-4">
                        <Typography
                          variant="body1"
                          className="text-lg font-semibold mb-2"
                        >
                          Select Color
                        </Typography>
                        <div className="flex gap-4">
                          {colors.map((clr) => (
                            <button
                              key={clr}
                              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${color === clr
                                  ? "border-blue-500 ring-2 ring-blue-200"
                                  : "border-gray-300"
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
                        <Typography
                          variant="body1"
                          className="text-lg font-semibold mb-2"
                        >
                          Select Size
                        </Typography>
                        <div className="flex gap-2">
                          {sizes.map((sz) => (
                            <button
                              key={sz}
                              className={`w-10 h-10 text-sm font-bold border-2 transition-all duration-300 ${size === sz
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

                    <div className="flex items-center mb-4">
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
                            className="text-black cursor-pointer"
                          />
                          <KeyboardArrowDownIcon
                            onClick={() =>
                              setQuantity((prev) => Math.max(1, prev - 1))
                            }
                            className="text-black cursor-pointer mt-[-4px]"
                          />
                        </div>
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          product &&
                          handleAddItem({
                            product,
                            quantity,
                            size: size || "N/A",
                            color: color || "N/A",
                          })
                        }
                        className="bg-[#088178] px-5 ms-3 shadow-md transition-transform duration-300 ease-in-out hover:scale-110 h-10"
                        disabled={!product}
                      >
                        Add to Cart
                      </Button>

                      <Button
                        variant="outlined"
                        className="ms-2 border-gray-400 h-10"
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
                            className={`transition-all duration-300 ${userWishList ? "text-red-500" : "text-gray-300"
                              }`}
                          />
                        </IconButton>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                {product && <AdditionalTab product={product} />}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
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

          <Card className="border mt-3">
            <CardContent>
              <LatestProduct />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
