"use client";
import React, { useState } from "react";
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
                <Button onClick={() => onUpdate(index, -1)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => onUpdate(index, 1)}>+</Button>
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

const CheckoutStep: React.FC = () => (
  <div className="flex justify-between">
    <div className="w-1/2 p-4">
      <h2 className="font-bold mb-2">User Details</h2>
      <TextField label="Name" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Phone" fullWidth margin="normal" />
    </div>
    <div className="w-1/2 p-4">
      <h2 className="font-bold mb-2">Billing Information</h2>
      <TextField label="Address" fullWidth margin="normal" />
      <TextField label="City" fullWidth margin="normal" />
      <TextField label="Postal Code" fullWidth margin="normal" />
    </div>
  </div>
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

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const removeItem = (index: number) => {
    if (index < 0 || index >= cartItemsFromRedux.length) return;
    const item = cartItemsFromRedux[index];
    if (item) {
      dispatch(delete_item(item.product.id, item.size, item.color));
      openSnackbar(
        `${item.product.name} Item removed from cart!`,
        "error",
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
        {activeStep === 1 && <CheckoutStep />}
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
