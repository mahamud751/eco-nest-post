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

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

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
            <TableRow key={index}>
              <TableCell>
                <img src={item.image} alt={item.name} className="w-20" />
                {item.name}
              </TableCell>
              <TableCell>
                <Button onClick={() => onUpdate(index, -1)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => onUpdate(index, 1)}>+</Button>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
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
      {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
    </div>
  </Card>
);

const CheckoutStep: React.FC = () => (
  <div className="flex justify-between">
    <div className="w-1/2 p-4">
      <h2>User Details</h2>
      <TextField label="Name" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Phone" fullWidth margin="normal" />
    </div>
    <div className="w-1/2 p-4">
      <h2>Billing Information</h2>
      <TextField label="Address" fullWidth margin="normal" />
      <TextField label="City" fullWidth margin="normal" />
      <TextField label="Postal Code" fullWidth margin="normal" />
    </div>
  </div>
);

const OrderCompleteStep: React.FC = () => (
  <div>
    <h2>Thank you for your order!</h2>
    <p>Your order has been placed successfully.</p>
  </div>
);

const CustomizedStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { name: "Item 1", image: "/path/to/image1.jpg", price: 20, quantity: 1 },
    // Add more items as needed
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateQuantity = (index: number, change: number) => {
    const newItems = [...cartItems];
    newItems[index].quantity = Math.max(0, newItems[index].quantity + change);
    setCartItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  return (
    <div className="p-6">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <ShoppingCartStep
          cartItems={cartItems}
          onUpdate={updateQuantity}
          onRemove={removeItem}
        />
      )}
      {activeStep === 1 && <CheckoutStep />}
      {activeStep === 2 && <OrderCompleteStep />}

      <div className="flex justify-between mt-4">
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={() => alert("Order placed!")}>Finish</Button>
        )}
      </div>
    </div>
  );
};

export default CustomizedStepper;
