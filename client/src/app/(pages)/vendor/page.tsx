"use client";

import React, { FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



const Vendor: React.FC = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const orderData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),

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
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 p-2">
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
                            defaultValue={user?.email || ""}
                            disabled
                        />
                        <TextField label="Phone" name="phone" fullWidth margin="normal" />
                    </div>

                    <div className="flex-1 p-2">
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


                </div>

                <div className="flex justify-end mt-6">
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

        </div>
    );
};

export default Vendor;
