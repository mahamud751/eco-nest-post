"use client";
import { useState } from "react";
import {
  Button,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import AdditionalTab from "@/components/pageComponents/productDetails/AdditionalTab";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState<string>("image1.jpg");
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("red");
  const [size, setSize] = useState<string>("medium");

  const images = [
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.jpg", alt: "Image 2" },
    { src: "image3.jpg", alt: "Image 3" },
    { src: "image4.jpg", alt: "Image 4" },
  ];

  const colors = ["red", "blue", "green"];
  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const categories = ["Category 1", "Category 2", "Category 3"]; // Example categories

  const handleImageSelect = (src: string) => {
    setSelectedImage(src);
  };

  const handleQuantityChange = (action: string) => {
    if (action === "add") {
      setQuantity(quantity + 1);
    } else if (action === "subtract" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box className="container mx-auto py-10">
      {/* 12 column grid: left side (8 columns), right side (4 columns) */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Side (8 Columns): Image and Product Details */}
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Section */}
          <div>
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={`/${selectedImage}`}
                alt="Selected Image"
                width={500}
                height={500}
              />
            </div>
            <div className="flex gap-4 mt-4">
              {images.map((img) => (
                <div key={img.src} className="cursor-pointer">
                  <Image
                    src={`/${img.src}`}
                    alt={img.alt}
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

          {/* Right Column: Product Details Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4">Product Name</h1>
            <p className="text-gray-600 mb-6">
              This is a detailed description of the product. It highlights
              features, specifications, and other important information about
              the product.
            </p>

            {/* Color Selector */}
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">Select Color</p>
              <div className="flex gap-4">
                {colors.map((clr) => (
                  <button
                    key={clr}
                    className={`w-10 h-10 rounded-full border-2 ${
                      color === clr ? "border-blue-500" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: clr }}
                    onClick={() => setColor(clr)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">Select Size</p>
              <div className="flex gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    className={`w-12 h-12 text-sm font-bold border-2 ${
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

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <IconButton onClick={() => handleQuantityChange("subtract")}>
                <RemoveIcon />
              </IconButton>
              <span className="mx-4">{quantity}</span>
              <IconButton onClick={() => handleQuantityChange("add")}>
                <AddIcon />
              </IconButton>
            </div>

            {/* Add to Cart Button */}
            <Button variant="contained" color="primary" className="w-full py-3">
              Add to Cart
            </Button>
          </div>
          <AdditionalTab />
        </div>

        {/* Right Side (4 Columns): Grid with 2 Columns for Image and Details */}
        <div className="col-span-12 md:col-span-3 grid grid-cols-1 gap-6">
          {/* First Card: Category List */}
          <Card className="border">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4">
                Category List
              </Typography>
              <ul>
                {categories.map((category) => (
                  <li key={category} className="mb-2">
                    {category}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Second Card: Just Hello */}
          <Card className="border">
            <CardContent>
              <Typography variant="h6" className="font-bold">
                Hello
              </Typography>
            </CardContent>
          </Card>

          {/* Image Card */}
          <Card className="border">
            <CardContent>
              <Image
                src="/image3.jpg" // Example image
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
