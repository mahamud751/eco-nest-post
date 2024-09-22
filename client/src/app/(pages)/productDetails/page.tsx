"use client";
import { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState<string>("image1.jpg");
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const images = [
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.jpg", alt: "Image 2" },
    { src: "image3.jpg", alt: "Image 3" },
    { src: "image4.jpg", alt: "Image 4" },
  ];

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
      {" "}
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        {/* Left Side: Image Section */}
        <div className="w-full lg:w-1/2">
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

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Product Name</h1>
          <p className="text-gray-600 mb-6">
            This is a detailed description of the product. It highlights
            features, specifications, and other important information about the
            product.
          </p>

          {/* Color Selector */}
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel>Color</InputLabel>
            <Select value={color} onChange={(e) => setColor(e.target.value)}>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="green">Green</MenuItem>
            </Select>
          </FormControl>

          {/* Size Selector */}
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel>Size</InputLabel>
            <Select value={size} onChange={(e) => setSize(e.target.value)}>
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>

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
      </div>
    </Box>
  );
};

export default ProductDetails;
