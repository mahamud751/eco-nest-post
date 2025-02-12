"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/services/hooks/auth";
// import { signIn } from "next-auth/react";
import LogInAnimation from "@/components/dynamics/animations/LogInAnimation";

interface FormInputs {
  name?: string;
  email: string;
  phone?: string;
  password: string;
}

const Auth: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const [authError, setAuthError] = useState("");
  const { loginUser, registerUser } = useAuth();

  if (!loginUser || !registerUser) {
    throw new Error(
      "AuthContext is undefined. Please ensure you are using UserProvider."
    );
  }

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signIn("google");

  //     if (result?.error) {
  //       setAuthError("Failed to sign in with Google. Please try again.");
  //     } else {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     setAuthError("Failed to sign in with Google. Please try again.");
  //   }
  // };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, phone, password } = data;
    setLoading(true);
    setAuthError("");
    try {
      if (isSignup) {
        await registerUser(name!, email, phone!, password);
      } else {
        await loginUser(email, password);
      }
    } catch (error) {
      console.error(error);
      setAuthError("Failed to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="hidden lg:block">
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <LogInAnimation />
        </div>
      </div>

      <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-12 w-full max-w-lg">
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image
                src={"https://i.ibb.co/CMkLbff/Icon.png"}
                width={30}
                height={20}
                alt="icon"
                className="ml-2"
              />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 ms-2 mt-2 uppercase">
              Korbo Joy
            </h2>
          </div>
          <h2 className="text-2xl font-bold text-purple-800 text-center mb-5">
            {isSignup ? "Create Account" : "Hi, Welcome Back"}
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {isSignup && (
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            {isSignup && (
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                {...register("phone", { required: "Phone number is required" })}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
              />
            )}

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {authError && <p className="text-red-500">{authError}</p>}
            <Button
              className={`bg-purple-800 text-white p-4 w-full mt-12 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          {/* <Button
            onClick={handleGoogleSignIn}
            className="bg-blue-600 text-white p-4 w-full mt-4 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition-all duration-300 ease-in-out"
            disabled={loading}
          >
            Sign In with Google
          </Button> */}
          <div className="text-center mt-4">
            <p className="text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                className="text-purple-800 font-bold"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
