"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface ApiError {
  message: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    phone: string,
    password: string,
    refferCode: string,
    photos: string,
    role?: string
  ) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const MySwal = withReactContent(Swal);
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || null;
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token || "");
    }
  }, [user, token]);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/login`,
        { email, password }
      );

      if (response.status === 201) {
        const { data } = response;
        setUser(data.user);
        setToken(data.token);
        document.cookie = `authToken=${data.token}; path=/; max-age=3600`;
        setLoading(false);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: unknown) {
      const errorMessage = isApiError(error)
        ? error.message
        : "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Login Error",
        text: errorMessage,
      });
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/register`,
        {
          name,
          email,
          phone,
          password,
        }
      );

      if (response.status === 201) {
        const { data } = response;
        setUser(data.user);
        setToken(data.token);
        document.cookie = `authToken=${data.token}; path=/; max-age=3600`;
        setLoading(false);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: unknown) {
      const errorMessage = isApiError(error)
        ? error.message
        : "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Registration Error",
        text: errorMessage,
      });
    }
  };

  const isApiError = (error: unknown): error is ApiError => {
    return (error as ApiError).message !== undefined;
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
