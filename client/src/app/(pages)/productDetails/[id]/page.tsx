"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import AdditionalTab from "@/components/pageComponents/productDetails/AdditionalTab";
import axios from "axios";
import { Product } from "@/services/types";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import { add_item } from "@/app/redux/actions/cartAction"; // Adjust path as needed
import { useSnackbar } from "@/services/contexts/useSnackbar";
import toast from "react-hot-toast";
import { CartItem } from "@/app/redux/types";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails = ({ params: { id } }: ProductDetailsProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [color, setColor] = useState<string>(""); // Default to empty string
  const [size, setSize] = useState<string>(""); // Default to empty string
  const [quantity, setQuantity] = useState<number>(1); // State for quantity

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product>(
        `https://api.korbojoy.shop/v1/products/${id}`
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

  const images = product?.photos || [];
  const colors = product?.colors || [];
  const sizes = product?.sizes || [];
  const categoryName = product?.category?.name || "Category not available";

  const handleImageSelect = (src: string) => {
    setSelectedImage(src);
  };

  const notify = () => toast.success("Successfully added your item!");

  const handleAddItem = (item: CartItem) => {
    if ((sizes.length > 0 && !size) || (colors.length > 0 && !color)) {
      toast.error("Please select a size and color");
      return;
    }

    dispatch(
      add_item({
        product: item.product,
        quantity: quantity,
        size: size || "N/A", // Set 'N/A' if no size is available
        color: color || "N/A", // Set 'N/A' if no color is available
      })
    );
    notify();
    openSnackbar("Item added to cart!", "success", "#088178");
  };

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

            {/* Conditionally render color selection if colors are available */}
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

            {/* Conditionally render size selection if sizes are available */}
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

            {/* Quantity Control */}
            <div className="flex items-center space-x-2 mb-4">
              <IconButton
                className="bg-[#edf2ee] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <RemoveIcon className="text-[#088178] group-hover:text-white" />
              </IconButton>

              {/* Input field for quantity */}
              <TextField
                type="number"
                variant="outlined"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setQuantity(isNaN(value) ? 1 : Math.max(1, value));
                }}
                inputProps={{ min: 1 }}
                className="w-16 text-center bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                size="small"
              />

              <IconButton
                className="bg-[#edf2ee] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <AddIcon className="text-[#088178] group-hover:text-white" />
              </IconButton>
            </div>

            <Button
              variant="contained"
              onClick={() =>
                handleAddItem({
                  product,
                  quantity: quantity,
                  size: size || "N/A",
                  color: color || "N/A",
                })
              }
              className="bg-[#088178] px-5 rounded-lg shadow-md transition-transform duration-300 ease-in-out group-hover:scale-110"
            >
              Add to Cart
            </Button>
          </div>
          <AdditionalTab />
        </div>

        <div className="col-span-12 md:col-span-3 grid grid-cols-1 gap-6">
          <Card className="border">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4">
                Category: {categoryName}
              </Typography>
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
