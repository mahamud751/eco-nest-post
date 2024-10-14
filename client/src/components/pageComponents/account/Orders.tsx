"use client";
import { useAuth } from "@/services/hooks/auth";
import { Order } from "@/services/types/types";
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
  CircularProgress,
  Button,
  TablePagination,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import dayjs from "dayjs";

import Invoice from "./Invoice";

const OrderDetails = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{
    data: Order[];
    total: number;
    perPage: number;
  } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/myBooking?email=${user.email}&page=${page}&perPage=${rowsPerPage}`
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
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleInvoiceClick = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

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
                  Invoice
                </TableCell>
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
                      color="primary"
                      size="small"
                      onClick={() => handleInvoiceClick(item)}
                    >
                      View Invoice
                    </Button>
                  </TableCell>
                  <TableCell className="p-4">
                    <Button
                      variant="contained"
                      color={item?.status === "delivery" ? "success" : "error"}
                      size="small"
                      style={{
                        borderRadius: "5px",
                        padding: "2px 12px",
                        textTransform: "none",
                      }}
                    >
                      {item?.status === "delivery" ? "Completed" : "Pending"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center mt-6 mb-5">
            <TablePagination
              component="div"
              count={data?.total || 0}
              page={page - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Rows per page:"
              showFirstButton
              showLastButton
            />
          </div>
        </TableContainer>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent>
          <Invoice selectedOrder={selectedOrder} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
