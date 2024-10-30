import axios from "axios";
import { FC, useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { AddShoppingCart, Favorite, Info } from "@mui/icons-material";
import Image from "next/image";
import Swal from "sweetalert2";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";

import { useAuth } from "@/services/hooks/auth";
import UseFetch from "@/services/hooks/useFetch";
import { WishlistItem } from "@/services/types/types";
import { useSnackbar } from "@/services/contexts/useSnackbar";

interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  photos: { src: string }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [hover, setHover] = useState(false);
  const { user } = useAuth();
  const MySwal = withReactContent(Swal);
  const { openSnackbar } = useSnackbar();
  const { data: wishlist, reFetch: wishlistRefetch } =
    UseFetch<WishlistItem[]>(`wishlist`);

  const handleAddToWishlist = async () => {
    if (!user) {
      MySwal.fire("Please login first", "", "error");
      return;
    }

    try {
      const wishlistItem = {
        userName: user.name,
        productId: product.id,
        email: user.email,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/wishlist`,
        wishlistItem
      );
      openSnackbar(
        `${product.name} Item successfully add to wishlist!`,
        "success",
        "#4caf50"
      );
      wishlistRefetch();
    } catch (error) {
      MySwal.fire("Error", "Something went wrong!", "error");
    }
  };
  const email = user?.email;
  const exactWishList = wishlist?.filter(
    (wishListItem) => wishListItem?.productId === product.id
  );
  const userWishList = exactWishList?.find(
    (wishListItem) => wishListItem?.email === email
  );
  const handleRemoveFromWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/wishlist/${userWishList?.id}`
      );
      openSnackbar(
        `${product.name} Item removed from wishlist!`,
        "error",
        "#4caf50"
      );
      wishlistRefetch();
    } catch (err) {
      toast.error("Error removing product from wishlist");
    }
  };

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
        <Image
          src={hover ? product.photos[1]?.src : product.photos[0]?.src}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative flex space-x-4">
            <div className="relative group">
              <IconButton
                className={`bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out  group-hover:scale-110 ${
                  userWishList
                    ? "group-hover:bg-[#e8f6ea]"
                    : "group-hover:bg-[#088178]"
                }`}
                onClick={
                  userWishList ? handleRemoveFromWishlist : handleAddToWishlist
                }
              >
                <Favorite
                  className={`${
                    userWishList ? "text-red-500" : "text-[#088178]"
                  } ${
                    userWishList
                      ? "group-hover:text-red-500"
                      : "group-hover:text-white"
                  } `}
                />
              </IconButton>
              <span className="absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center">
                {userWishList ? "Remove from Wishlist" : "Add to Wishlist"}
                <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
              </span>
            </div>
            <Link href={`/productDetails/${product.id}`}>
              <div className="relative group">
                <IconButton className="bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110">
                  <Info className="text-[#088178] group-hover:text-white" />
                </IconButton>
                <span className="absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center">
                  Quick View
                  <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <CardContent
        style={{
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
      >
        <Link href={`/productDetails/${product.id}`}>
          <Typography
            variant="body1"
            component="div"
            className="font-semibold mb-2"
          >
            {product.name.slice(0, 20)} ...
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-2">
            {product.desc.slice(0, 50)} ...
          </Typography>
          <div className="flex items-center justify-around">
            <div>
              <Typography
                variant="h6"
                color="textSecondary"
                className="mb-2 text-[#088178] font-extrabold"
              >
                ৳ {product.price}
              </Typography>
            </div>
            <div className="relative group">
              <IconButton className="bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110">
                <AddShoppingCart className="text-[#088178] group-hover:text-white" />
              </IconButton>
              <span className="absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center">
                Add to Cart
                <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
