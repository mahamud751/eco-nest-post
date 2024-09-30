"use client";
import React, { FormEvent, useState } from "react";
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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import { CartItem } from "@/app/redux/types";
import {
  delete_item,
  remove_item,
  update_quantity,
} from "@/app/redux/actions/cartAction";
import { useAppDispatch } from "@/services/hooks/useAppDispatch";
import Image from "next/image";
import { useSnackbar } from "@/services/contexts/useSnackbar";
import PaymentCheckout from "@/components/pageComponents/cart/PaymentCheckout";

const steps = ["Shopping Cart", "Checkout", "Order Complete"];

const ShoppingCartStep: React.FC<{
  cartItems: CartItem[];
  onUpdate: (index: number, change: number) => void;
  onRemove: (index: number) => void;
}> = ({ cartItems, onUpdate, onRemove }) => (
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
                      <KeyboardArrowUpIcon
                        onClick={() => onUpdate(index, 1)}
                        className="text-black"
                      />
                      <KeyboardArrowDownIcon
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
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      Total:{" "}
      {cartItems
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        .toFixed(2)}
    </div>
  </Card>
);

const CheckoutStep: React.FC<{
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Updated to match the type
  handleOnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}> = ({ handleFormSubmit, handleOnBlur }) => (
  <form onSubmit={handleFormSubmit}>
    <div className="flex justify-between">
      <div className="w-1/2 p-4">
        <h2 className="font-bold mb-2">User Details</h2>
        <TextField
          label="Enter your first name"
          name="firstName"
          onBlur={handleOnBlur}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Enter your last name"
          name="lastName"
          onBlur={handleOnBlur}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Enter your email"
          name="email"
          onBlur={handleOnBlur}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          onBlur={handleOnBlur}
          fullWidth
          margin="normal"
        />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="font-bold mb-2">Billing Information</h2>
        <TextField
          label="House number and street address"
          name="address"
          onBlur={handleOnBlur}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Town / City"
          name="city"
          onBlur={handleOnBlur}
          fullWidth
          margin="normal"
        />
      </div>
    </div>

    <Button type="submit" variant="contained" color="primary">
      Submit Order
    </Button>
  </form>
);

const OrderCompleteStep: React.FC = () => (
  <div>
    <h2 className="text-xl font-bold">Thank you for your order!</h2>
    <p>Your order has been placed successfully.</p>
  </div>
);

const CustomizedStepper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const orderData = {
      cartItems: cartItemsFromRedux,
      totalPrice: cartItemsFromRedux
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        .toFixed(2),
    };

    try {
      const response = await fetch("https://api.korbojoy.shop/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      openSnackbar("Order placed successfully!", "success", "#4caf50");
      setActiveStep((prev) => prev + 1); // Move to "Order Complete" step
    } catch (error) {
      openSnackbar("Order submission failed!", "error", "#f44336");
      console.error("Order submission error:", error);
    }
  };

  return (
    <Box className="container mx-auto py-10">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <ShoppingCartStep
            cartItems={cartItemsFromRedux}
            onUpdate={updateQuantity}
            onRemove={removeItem}
          />
        )}
        {activeStep === 1 && (
          <CheckoutStep
            handleFormSubmit={handleSubmit}
            handleOnBlur={handleOnBlur}
          />
        )}
        {activeStep === 2 && <OrderCompleteStep />}
      </div>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={activeStep === steps.length - 1 ? undefined : handleNext}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </Box>
  );
};

export default CustomizedStepper;
