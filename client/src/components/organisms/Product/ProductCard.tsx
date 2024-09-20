import { FC, useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { AddShoppingCart, Favorite, Info } from "@mui/icons-material";
import Image from "next/image";

interface ProductCardProps {
  imageUrl1: string;
  imageUrl2: string;
  productName: string;
  description: string;
  price: string;
}

const ProductCard: FC<ProductCardProps> = ({
  imageUrl1,
  imageUrl2,
  productName,
  description,
  price,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="relative overflow-hidden transition-transform duration-300 ease-in-out border-2 border-[#cce7d0] hover:border-[#088178]"
      style={{ borderRadius: "25px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="absolute top-6 left-8 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
        New
      </span>

      <div
        className="relative h-64 overflow-hidden m-4"
        style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}
      >
        {" "}
        {/* Rounded top */}
        <Image
          src={imageUrl1}
          alt={productName}
          layout="fill"
          objectFit="cover"
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={imageUrl2}
          alt={productName}
          layout="fill"
          objectFit="cover"
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative flex space-x-4">
            <div className="relative group">
              <IconButton
                className={`bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110`}
              >
                <Favorite className="text-[#088178] group-hover:text-white" />
              </IconButton>
              <span
                className={`absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center`}
              >
                Add to Wishlist
                <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
              </span>
            </div>

            <div className="relative group">
              <IconButton
                className={`bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110`}
              >
                <Info className="text-[#088178] group-hover:text-white" />
              </IconButton>
              <span
                className={`absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center`}
              >
                Quick View
                <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent
        style={{
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
      >
        {" "}
        <div className="flex items-center justify-around">
          <div>
            <Typography
              variant="h6"
              component="div"
              className="font-semibold mb-2"
            >
              {productName}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-2">
              {description}
            </Typography>
            <Typography variant="h6" component="div" className="font-bold">
              {price}
            </Typography>
          </div>
          <div className="flex items-center">
            <div className="relative group">
              <IconButton
                className={`bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110`}
              >
                <AddShoppingCart className="text-[#088178] group-hover:text-white" />
              </IconButton>
              <span
                className={`absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center`}
              >
                Add To Cart
                <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
