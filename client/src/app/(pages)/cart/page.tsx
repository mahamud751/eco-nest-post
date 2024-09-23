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
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers"; // Adjust path as needed
import { CartItem } from "@/app/redux/types"; // Adjust path as needed
import {
  delete_item,
  remove_item,
  update_quantity,
} from "@/app/redux/actions/cartAction"; // Adjust path as needed
import { useAppDispatch } from "@/services/hooks/useAppDispatch";

const steps = ["Shopping Cart", "Checkout", "Order Complete"];

const ShoppingCartStep: React.FC<{
  cartItems: CartItem[];
  onUpdate: (index: number, change: number) => void;
  onRemove: (index: number) => void;
}> = ({ cartItems, onUpdate, onRemove }) => (
  <Card className="p-4">
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={item.product.id}>
              <TableCell>{item.product.name}</TableCell>{" "}
              {/* Update to access product's name */}
              <TableCell>
                <Button onClick={() => onUpdate(index, -1)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => onUpdate(index, 1)}>+</Button>
              </TableCell>
              <TableCell>
                {(item.product.price * item.quantity).toFixed(2)}
              </TableCell>{" "}
              {/* Update to access product's price */}
              <TableCell>
                <Button onClick={() => onRemove(index)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      Total:{" "}
      {cartItems
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0) // Update to access product's price
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
  const cartItemsFromRedux = useSelector(
    (state: RootState) => state.cart.cartItems
  );
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const updateQuantity = (index: number, change: number) => {
    if (index < 0 || index >= cartItemsFromRedux.length) return; // Validate index
    const item = cartItemsFromRedux[index];

    if (item) {
      const newQuantity = item.quantity + change;

      if (newQuantity <= 0) {
        dispatch(remove_item(item.product.id)); // Use product.id
      } else {
        dispatch(update_quantity(item.product.id, newQuantity)); // Use product.id
      }
    }
  };

  const removeItem = (index: number) => {
    if (index < 0 || index >= cartItemsFromRedux.length) return;
    const item = cartItemsFromRedux[index];
    if (item) {
      dispatch(delete_item(item.product.id)); // Make sure item.product.id is correct
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default CustomizedStepper;
