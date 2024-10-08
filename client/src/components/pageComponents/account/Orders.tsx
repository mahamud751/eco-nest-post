"use client";
import { useAuth } from "@/services/hooks/auth";
import { Order } from "@/services/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CircularProgress,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

const OrderDetails = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{
    data: Order[];
    total: number;
    perPage: number;
  } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const perPage = 10;

  const fetchOrders = async () => {
    if (!user || !user.email) {
      console.error("User is not logged in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{
        data: Order[];
        total: number;
        perPage: number;
      }>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/myBooking?email=${user.email}&page=${page}&perPage=${perPage}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const totalPages = data ? Math.ceil(data.total / perPage) : 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-center mb-6 text-green-600">
        My Orders
      </h1>

      <div className="text-right mb-4">
        <p className="text-gray-600">Total Orders: {data?.total}</p>
      </div>

      {data?.data.length ? (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-[#9C27B0]">
              <TableRow>
                <TableCell className="p-4 text-white font-bold">
                  Order ID
                </TableCell>
                <TableCell className="p-4 text-white font-bold">Name</TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Email
                </TableCell>
                <TableCell className="p-4 text-white font-bold">Date</TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <TableCell className="p-4">{item.id}</TableCell>
                  <TableCell className="p-4">
                    {item.firstName} {item.lastName}
                  </TableCell>
                  <TableCell className="p-4">{item.email}</TableCell>
                  <TableCell className="p-4">
                    {dayjs(item.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                  <TableCell className="p-4">
                    <Button
                      variant="contained"
                      color={item.status === "APPROVED" ? "success" : "error"}
                      size="small"
                      style={{
                        borderRadius: "5px",
                        padding: "2px 12px",
                        textTransform: "none",
                        border: "none",
                      }}
                    >
                      {item.status === "APPROVED" ? "Completed" : "Pending"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center mt-6 mb-5">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              showFirstButton
              showLastButton
            />
          </div>
        </TableContainer>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderDetails;
