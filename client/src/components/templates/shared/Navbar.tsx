"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Article as BlogIcon,
  ContactMail as ContactIcon,
  AccountCircle as AccountIcon,
  Facebook,
  Home,
  Info,
  Category as CategoryIcon,
  AccountCircle,
  Search,
  DensityMedium,
  Person,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";

import { HiOutlineShoppingBag } from "react-icons/hi2";

import { CategoryMenu } from "@/components/templates/shared/CategoryMenu";
import { useAuth } from "@/services/hooks/auth";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import { RootState } from "@/app/redux/reducers";
import { delete_item } from "@/app/redux/actions/cartAction";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import { Category, User } from "@/services/types/types";
import UseFetch from "@/services/hooks/useFetch";

import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { user, logoutUser } = useAuth();

  const { data: session } = useSession();

  const [cartOpen, setCartOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSearchResults] = useState([]);
  const [value, setValue] = useState(0);
  const { data: categories } = UseFetch<Category[]>("categories");

  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const toggleCategoryModal = () => setCategoryModalOpen(!categoryModalOpen);
  const toggleAccountModal = () => setAccountModalOpen(!accountModalOpen);
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  const [data, setData] = useState<User | null>(null);
  const fetchData = async () => {
    try {
      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user?.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const handleLogOut = () => {
    logoutUser();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

    if (target && !target.closest(".MuiDrawer-root")) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.dsmartuniforms.com/api/product/user?query=${searchQuery}`
      );

      setSearchResults(response.data);

      const searchUrl = `/product?search=${encodeURIComponent(searchQuery)}`;
      router.push(searchUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
    setCategoryModalOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        className={`bg-white text-black shadow-md text-[14px]`}
      >
        <Toolbar className="hidden sm:flex justify-between bg-gradient-to-r from-[#020304] to-[#071e37]">
          <Box className="container mx-auto text-white">
            <div className="flex justify-between ">
              <div className="flex">
                <p className="font-bold">SHOP EVENTS & SAVE UP TO 65% OFF!</p>
                <p className="font-bold ms-24 me-5">Call Us: +8801789999751</p>
                <Facebook />
              </div>

              <div>
                {/* <Link href="/" className="font-bold">
                  Order Request
                </Link> */}
                <Link href="/vendor" className="font-bold ms-10">
                  Become A Vendor
                </Link>
              </div>
            </div>
          </Box>
        </Toolbar>

        <Toolbar className="flex justify-between mb-0 md:mb-5 px-5 pt-0 md:px-0 md:pt-0 fixed top-0 left-0 w-full z-50 bg-white shadow-md md:static">
          <Box className="container mx-auto">
            <div className="flex justify-between">
              <Link href="/" className="flex mt-5">
                <div>
                  <Image
                    src={"https://i.ibb.co/CMkLbff/Icon.png"}
                    width={30}
                    height={20}
                    alt="icon"
                    className="ml-2"
                  />
                </div>
                <Typography
                  variant="h6"
                  component="div"
                  className="font-semibold mb-2 mt-1 ms-1 text-2xl"
                >
                  KorboJoy
                </Typography>
              </Link>

              <div className="hidden sm:flex w-[75%] px-12 items-center rounded">
                <div className="flex justify-end items-center w-full p-2 mt-2">
                  <div className="relative w-full flex items-center">
                    <InputBase
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search your favorite products"
                      className="px-3 py-2 w-full rounded-l-md border border-gray-300 focus:outline-none"
                      sx={{
                        paddingRight: "50px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="absolute right-0 bg-red-500 hover:bg-red-600 text-white px-3 py-[13px]"
                    >
                      <Search />
                    </button>
                  </div>
                </div>
              </div>

              <IconButton
                onClick={toggleCart}
                sx={{
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                <Badge badgeContent={cartItemsFromRedux?.length} color="error">
                  <HiOutlineShoppingBag style={{ color: "black" }} />
                </Badge>
              </IconButton>
            </div>
          </Box>
        </Toolbar>

        <Toolbar
          className={`bg-gray-100 hidden sm:flex justify-between ${
            isSticky ? "fixed top-0 left-0 right-0 z-50" : ""
          }`}
        >
          <Box className="container mx-auto">
            <div className="flex justify-between">
              <div className="flex">
                <div className="relative category-dropdown">
                  <Button
                    onClick={toggleCategories}
                    className="bg-black text-white px-5 py-2 flex justify-between items-center"
                    style={{ minWidth: "300px", width: "300px", height: 70 }}
                  >
                    <span className="flex-1 text-left ms-4">Categories</span>
                    <DensityMedium style={{ fontSize: 16 }} />
                  </Button>

                  {categoriesOpen && (
                    <CategoryMenu setCategoriesOpen={setCategoriesOpen} />
                  )}
                </div>
                <div className="hidden sm:flex space-x-4 mt-6 uppercase ms-24">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/cart">Cart</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/contact">Contact</Link>
                  {user && <Link href="/account">Account</Link>}
                </div>
              </div>
              <div className="mt-6">
                {session && session.user?.email}
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span>
                      <Link href={"/account"}>
                        <Person style={{ marginRight: 5 }} />
                        {data?.name}
                      </Link>
                    </span>
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
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
          background: "#fff",
          zIndex: 1000,
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            switch (newValue) {
              case 0:
                toggleCategoryModal();
                break;
              case 1:
                toggleCart();
                break;
              case 2:
                router.push("/");
                break;
              case 3:
                router.push("/account");
                break;
              case 4:
                toggleAccountModal();
                break;
              default:
                break;
            }
          }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          <BottomNavigationAction
            icon={<CategoryIcon sx={{ color: "#4CAF50" }} />}
            sx={{ flex: 1, display: "flex", justifyContent: "center" }}
          />
          <BottomNavigationAction
            icon={<HiOutlineShoppingBag style={{ color: "#FF9800" }} />}
            sx={{ flex: 1, display: "flex", justifyContent: "center" }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "red",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={() => router.push("/")}
              sx={{
                color: "white",
                padding: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Home sx={{ fontSize: "30px" }} />{" "}
            </IconButton>
          </Box>

          <BottomNavigationAction
            icon={<AccountCircle sx={{ color: "#2196F3" }} />}
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              marginLeft: 10,
            }}
          />
          <BottomNavigationAction
            icon={<Info sx={{ color: "#9C27B0" }} />}
            sx={{ flex: 1, display: "flex", justifyContent: "center" }}
          />
        </BottomNavigation>
      </Box>
      <Drawer
        anchor="left"
        open={categoryModalOpen}
        onClose={toggleCategoryModal}
      >
        <div className="p-4 w-64">
          <Typography variant="h6" className="mb-2">
            Categories
          </Typography>

          {categories &&
            categories.map((category) => (
              <div key={category.id} className="flex items-center mb-2">
                <Image
                  src={category.photos[0]?.src || "/default-image.jpg"}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <Link
                  href={`/category/${category.id}`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <Typography variant="body2">{category.name}</Typography>
                </Link>
              </div>
            ))}
        </div>
      </Drawer>
      <Drawer
        anchor="left"
        open={accountModalOpen}
        onClose={toggleAccountModal}
      >
        <div className="p-4 w-64 bg-gray-50">
          <List>
            <Link href="/" passHref>
              <ListItem
                component="a"
                onClick={toggleAccountModal}
                className="hover:bg-[#EEF5FF]"
              >
                <ListItemIcon>
                  <Home sx={{ color: "#088178" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className="text-[#088178]">
                    Home
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>

            <Link href="/about" passHref>
              <ListItem
                component="a"
                onClick={toggleAccountModal}
                className="hover:bg-[#EEF5FF]"
              >
                <ListItemIcon>
                  <Info sx={{ color: "#FF6F61" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className="text-[#FF6F61]">
                    About
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>

            <Link href="/cart" passHref>
              <ListItem
                component="a"
                onClick={toggleAccountModal}
                className="hover:bg-[#EEF5FF]"
              >
                <ListItemIcon>
                  <CartIcon sx={{ color: "#FFD700" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className="text-[#FFD700]">
                    Cart
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>

            <Link href="/blog" passHref>
              <ListItem
                component="a"
                onClick={toggleAccountModal}
                className="hover:bg-[#EEF5FF]"
              >
                <ListItemIcon>
                  <BlogIcon sx={{ color: "#FF8C00" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className="text-[#FF8C00]">
                    Blog
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>

            <Link href="/contact" passHref>
              <ListItem
                component="a"
                onClick={toggleAccountModal}
                className="hover:bg-[#EEF5FF]"
              >
                <ListItemIcon>
                  <ContactIcon sx={{ color: "#6A5ACD" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" className="text-[#6A5ACD]">
                    Contact
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>

            {user && (
              <Link href="/account" passHref>
                <ListItem
                  component="a"
                  onClick={toggleAccountModal}
                  className="hover:bg-[#EEF5FF]"
                >
                  <ListItemIcon>
                    <AccountIcon sx={{ color: "#32CD32" }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2" className="text-[#32CD32]">
                      Account
                    </Typography>
                  </ListItemText>
                </ListItem>
              </Link>
            )}
          </List>
        </div>
      </Drawer>
      <CartDrawer
        open={cartOpen}
        onClose={toggleCart}
        removeItem={removeItem}
      />
    </>
  );
}
