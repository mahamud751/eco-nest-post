import axios from "axios";
import { FC, useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { AddShoppingCart, Favorite, Info } from "@mui/icons-material";
import Image from "next/image";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
import { useAuth } from "@/services/hooks/auth";
import UseFetch from "@/services/hooks/useFetch";
import { CartItem } from "@/app/redux/types";
import { add_item } from "@/app/redux/actions/cartAction";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    fulldesc: string;
    photos: { src: string }[];
  };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  console.log(product);

  const { id, name, price, fulldesc, photos } = product;
  const [hover, setHover] = useState(false);
  const { user } = useAuth();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  // Fetching wishlist
  const { data: wishlist, reFetch: wishlistRefetch } = UseFetch(`wishlist`);

  // Notify user of success
  const notify = () => toast.success("Successfully added your item!");

  // In your component
  const handleAddItem = (item: CartItem) => {
    dispatch(add_item(item));
    notify();
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      MySwal.fire("Please login first", "", "error");
      return;
    }

    try {
      const wishlistItem = {
        userName: user.name,
        productId: id,
        email: user.email,
      };
      await axios.post(
        "https://api.dsmartuniforms.com/api/wishlist",
        wishlistItem
      );
      wishlistRefetch();
    } catch (error) {
      MySwal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleRemoveFromWishlist = async () => {
    const userWishList = wishlist?.find(
      (wish: any) => wish?.product?._id === id && wish.email === user?.email
    );

    if (!userWishList) return;

    try {
      await axios.delete(
        `https://api.dsmartuniforms.com/api/wishlist/${userWishList._id}`
      );
      wishlistRefetch();
    } catch (error) {
      MySwal.fire("Error", "Unable to remove from wishlist", "error");
    }
  };

  const checkInWishlist = wishlist?.some(
    (wish: any) => wish?.product?._id === id && wish?.email === user?.email
  );

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
          src={hover ? photos[1]?.src : photos[0]?.src}
          alt={name}
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
                className="bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110"
                onClick={
                  checkInWishlist
                    ? handleRemoveFromWishlist
                    : handleAddToWishlist
                }
              >
                <Favorite
                  className={`${
                    checkInWishlist ? "text-red-500" : "text-[#088178]"
                  } group-hover:text-white`}
                />
              </IconButton>
              <span className="absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center">
                {checkInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
              </span>
            </div>

            <div className="relative group">
              <IconButton className="bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110">
                <Info className="text-[#088178] group-hover:text-white" />
              </IconButton>
              <span className="absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center">
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
        <div className="flex items-center justify-around">
          <div>
            <Typography
              variant="h6"
              component="div"
              className="font-semibold mb-2"
            >
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-2">
              {fulldesc}
            </Typography>
            <Typography variant="h6" component="div" className="font-bold">
              ৳{price}
            </Typography>
          </div>
          <div className="relative group">
            <IconButton
              className="bg-[#e8f6ea] rounded-full p-2 shadow-md transition-transform duration-300 ease-in-out group-hover:bg-[#088178] group-hover:scale-110"
              onClick={() =>
                handleAddItem({
                  productId: id,
                  productName: name,
                  price: price,
                  quantity: 0,
                })
              }
            >
              <AddShoppingCart className="text-[#088178] group-hover:text-white" />
            </IconButton>
            <span className="absolute -mt-24 top-full left-1/2 transform -translate-x-1/2 bg-[#088178] text-white text-xs font-bold px-4 py-2 rounded transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 w-[120px] text-center">
              Add to Cart
              <span className="block absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-t-[#088178] border-l-transparent border-r-transparent"></span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
