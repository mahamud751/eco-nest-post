"use client";
import { useAuth } from "@/services/hooks/auth";
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
  TablePagination,
} from "@mui/material";
import dayjs from "dayjs";
import { WishlistItem } from "@/services/types/types";

const Wishlist = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{
    data: WishlistItem[];
    total: number;
    perPage: number;
  } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async () => {
    if (!user || !user.email) {
      console.error("User is not logged in");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<{
        data: WishlistItem[];
        total: number;
        perPage: number;
      }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist?email=${user.email}&page=${page}&perPage=${rowsPerPage}`
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
        Wishlist List
      </h1>

      {data?.data.length ? (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-[#2196F3]">
              <TableRow>
                <TableCell className="p-4 text-white font-bold">
                  Wishlist ID
                </TableCell>
                <TableCell className="p-4 text-white font-bold">Name</TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Email
                </TableCell>
                <TableCell className="p-4 text-white font-bold">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <TableCell className="p-4">{item.id}</TableCell>
                  <TableCell className="p-4">{item.userName}</TableCell>
                  <TableCell className="p-4">{item.email}</TableCell>
                  <TableCell className="p-4">
                    {dayjs(item.createdAt).format("MMM D, YYYY")}
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
    </div>
  );
};

export default Wishlist;
