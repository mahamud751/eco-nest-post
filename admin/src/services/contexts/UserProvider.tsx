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
import { useRouter } from "next/navigation";

interface Permission {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  permissions?: Permission[];
  token?: string;
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
  const router = useRouter();
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
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
      localStorage.setItem("token", token || "");
    }
  }, [user, token]);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users/login/admin`,
        { email, password }
      );

      if (response.status === 201) {
        const { data } = response;

        setUser({
          ...data.user,
          permissions: data?.user?.permissions,
          token: data.token,
        });
        setToken(data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...data.user,
            permissions: data?.user?.permissions,
          })
        );
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Login Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    refferCode: string,
    photos: string,
    role?: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/users`,
        {
          name,
          email,
          phone,
          password,
          refferCode,
          photos,
          role,
        }
      );

      if (response.status === 200) {
        const { data } = response;

        setUser({
          ...data.user,
          permissions: data?.user?.permissions,
        });
        setToken(data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...data.user,
            permissions: data?.user?.permissions,
          })
        );
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      MySwal.fire({
        icon: "error",
        title: "Registration Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
