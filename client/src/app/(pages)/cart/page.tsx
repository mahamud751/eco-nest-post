"use client";
import React, { FormEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import {
  Delete,
  ShoppingCart,
  Payment,
  CheckCircle,
  KeyboardArrowDown,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import { CartItem } from "@/app/redux/types";
import {
  clear_cart,
  delete_item,
  remove_item,
  update_quantity,
} from "@/app/redux/actions/cartAction";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";

import { useSnackbar } from "@/services/contexts/useSnackbar";
import PaymentCheckout from "@/components/pageComponents/cart/PaymentCheckout";
import { PriceTotal } from "@/components/pageComponents/cart/PriceTotal";
import SuccessAnimation from "@/components/dynamics/animations/SuccessAnimation";

const steps = [
  {
    label: "Shopping Cart",
    icon: <ShoppingCart style={{ color: "red" }} />,
  },
  {
    label: "Checkout",
    icon: <Payment style={{ color: "green" }} />,
  },
  {
    label: "Order Complete",
    icon: <CheckCircle style={{ color: "blue" }} />,
  },
];

const ShoppingCartStep: React.FC<{
  cartItems: CartItem[];
  onUpdate: (index: number, change: number) => void;
  onRemove: (index: number) => void;
  onProceedToCheckout: () => void;
}> = ({ cartItems, onUpdate, onRemove, onProceedToCheckout }) => (
  <>
    <Card className="p-4 mt-10">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={item.product.id}>
                <TableCell>
                  {item.product.photos.length > 0 ? (
                    <Image
                      width={400}
                      height={400}
                      src={item.product.photos[0].src}
                      alt={item.product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>
                  {item.color ? (
                    <span
                      style={{
                        backgroundColor: item.color,
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.color}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>N/A</span>
                  )}
                </TableCell>
                <TableCell>{item.size || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      variant="outlined"
                      className="flex items-center justify-between w-20 border-gray-400 text-black p-1"
                    >
                      <span className="flex-grow text-center text-black">
                        {item.quantity}
                      </span>

                      <div className="flex flex-col ml-1">
                        <KeyboardArrowDown
                          onClick={() => onUpdate(index, 1)}
                          className="text-black"
                        />
                        <KeyboardArrowDown
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdate(index, -1);
                          }}
                          className="text-black mt-[-4px]"
                        />
                      </div>
                    </Button>
                  </div>
                </TableCell>

                <TableCell>
                  {(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      onRemove(index);
                    }}
                    aria-label="delete"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>

    <PriceTotal cartItems={cartItems} />
    <div className="flex justify-end mt-6">
      <Button
        variant="contained"
        color="primary"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        onClick={onProceedToCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  </>
);

const CheckoutStep: React.FC<{
  cartItems: CartItem[];
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}> = ({ cartItems, handleFormSubmit }) => (
  <form onSubmit={handleFormSubmit}>
    <div className="flex justify-between">
      <div className="w-1/2 p-4">
        <h2 className="font-bold mb-2">User Details</h2>
        <TextField
          label="Enter your first name"
          name="firstName"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Enter your last name"
          name="lastName"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Enter your email"
          name="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField label="Phone" name="phone" fullWidth margin="normal" />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="font-bold mb-2">Billing Information</h2>
        <TextField
          label="House number and street address"
          name="streetAddress"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Town / City"
          name="city"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Country"
          name="country"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Postal Code"
          name="postCode"
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <PriceTotal cartItems={cartItems} />
        <PaymentCheckout />
      </div>
    </div>
    <div className="flex justify-end mt-12">
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        Place Order
      </Button>
    </div>
  </form>
);

const OrderCompleteStep: React.FC = () => (
  <div className="text-center">
    <Grid container size={{ xs: 12, md: 6 }} className="flex justify-center">
      <SuccessAnimation />
    </Grid>
    <Box className="main-txt text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Typography
          variant="h2"
          className="text-[#0F4C75] font-bold leading-tight"
        >
          Thank you for your order!
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Typography
          variant="h5"
          className="text-gray-700 font-bold leading-tight"
        >
          Your order has been placed successfully.
        </Typography>
      </motion.div>
    </Box>
  </div>
);

const CustomizedStepper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleProceedToCheckout = () => handleNext();
  const handleStepClick = (step: number) => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

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

  const updateQuantity = (index: number, change: number) => {
    if (index < 0 || index >= cartItemsFromRedux.length) return;
    const item = cartItemsFromRedux[index];

    if (item) {
      const newQuantity = item.quantity + change;

      if (newQuantity <= 0) {
        dispatch(remove_item(item.product.id, item.size, item.color));
      } else {
        dispatch(
          update_quantity(item.product.id, newQuantity, item.size, item.color)
        );
      }
    }
  };
  const vat = 40;
  const grandTotal = (
    cartItemsFromRedux.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) + vat
  ).toFixed(2);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      streetAddress: formData.get("streetAddress"),
      city: formData.get("city"),
      country: formData.get("country"),
      postCode: formData.get("postCode"),
      transactionId: formData.get("transactionId"),
      bkashNumber: formData.get("bkashNumber"),
      rocketNumber: formData.get("rocketNumber"),
      grandPrice: grandTotal,
      getState: cartItemsFromRedux,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      openSnackbar("Order placed successfully!", "success", "#4caf50");
      setActiveStep(2);
      dispatch(clear_cart());
    } catch (error) {
      console.error("Error placing order:", error);
      openSnackbar("Failed to place order!", "error", "#f44336");
    }
  };

  return (
    <Box className="container mx-auto py-10">
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <CustomStep key={index} onClick={() => handleStepClick(index)}>
            <CustomStepButton>
              {step.icon}
              <StepLabel className="ms-5">{step.label}</StepLabel>
            </CustomStepButton>
          </CustomStep>
        ))}
      </CustomStepper>
      <div>
        {activeStep === 0 && (
          <ShoppingCartStep
            cartItems={cartItemsFromRedux}
            onUpdate={updateQuantity}
            onRemove={removeItem}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}
        {activeStep === 1 && (
          <CheckoutStep
            cartItems={cartItemsFromRedux}
            handleFormSubmit={handleSubmit}
          />
        )}
        {activeStep === 2 && <OrderCompleteStep />}
      </div>
    </Box>
  );
};

export default CustomizedStepper;

const CustomStepper = styled(Stepper)(({}) => ({
  backgroundColor: "transparent",
  padding: "20px",
  position: "relative",
  "& .MuiStepConnector-root": {
    display: "none",
  },
}));

const CustomStep = styled(Step)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  padding: "0 20px",
  "&:hover .MuiStepLabel-root": {
    color: theme.palette.primary.main,
  },
}));

const CustomStepButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: "20px",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
  margin: "0 10px",
  width: "100%",

  "& .MuiStepLabel-root": {
    color: "white",
    textAlign: "center",
  },
}));
