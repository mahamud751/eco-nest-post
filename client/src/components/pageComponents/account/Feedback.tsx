"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
} from "@mui/material";
import { Feedbacks } from "@/services/types";
import { useAuth } from "@/services/hooks/auth";

const Feedback = () => {
  const { user } = useAuth();
  const [data, setData] = useState<{
    data: Feedbacks[];
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
        data: Feedbacks[];
        total: number;
        perPage: number;
      }>(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/myBooking?email=${user.email}&allOrder=yes&page=${page}&perPage=${rowsPerPage}`
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
        Product Feeback
      </h1>

      {data?.data.length ? (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-[#FF9800]">
              <TableRow>
                <TableCell className="p-4 text-white font-bold">
                  Product Image
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Product Name
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Views
                </TableCell>
                <TableCell className="p-4 text-white font-bold">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <TableCell className="p-4">{item?.product?.name}</TableCell>
                  <TableCell className="p-4">
                    {" "}
                    <div className="flex">
                      {" "}
                      {item?.product?.photos.map((img, index) => (
                        <div key={index} className="cursor-pointer">
                          <Image
                            src={img.src}
                            alt={img.title}
                            width={100}
                            height={100}
                            className={`border-2 rounded-lg ms-3 w-[40px]`}
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="p-4">{item?.product?.views}</TableCell>
                  <TableCell className="p-4">
                    {" "}
                    <Button
                      variant="contained"
                      color={
                        item?.product?.status === "active" ? "success" : "error"
                      }
                      size="small"
                      style={{
                        borderRadius: "5px",
                        textTransform: "none",
                        border: "none",
                      }}
                    >
                      {item?.product?.status}
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
    </div>
  );
};

export default Feedback;
