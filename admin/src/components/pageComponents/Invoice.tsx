import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { Order } from "@/services/types";

interface InvoiceProps {
  selectedOrder: Order | null;
}

const Invoice: React.FC<InvoiceProps> = ({ selectedOrder }) => {
  if (!selectedOrder) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="sm:block md:flex items-center">
          <Image
            src={"https://i.ibb.co/CMkLbff/Icon.png"}
            width={30}
            height={20}
            alt="icon"
            className="ml-2"
          />
          <div className="text-gray-700 font-semibold text-lg mt-3 ms-3">
            KorboJoy
          </div>
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-xl mb-2">INVOICE</div>
          <div className="text-sm">
            Date: {dayjs(selectedOrder.createdAt).format("MMM D, YYYY")}
          </div>
          <div className="text-sm">Invoice #: {selectedOrder.id}</div>
        </div>
      </div>

      <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">
          {selectedOrder.firstName} {selectedOrder.lastName}
        </div>
        <div className="text-gray-700 mb-2">{selectedOrder?.email}</div>
        <div className="text-gray-700 mb-2">{selectedOrder?.phone}</div>
        <div className="text-gray-700 mb-2">
          {selectedOrder.streetAddress}, {selectedOrder.city}
        </div>
      </div>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Product Name",
                "Product Image",
                "Product Size",
                "Product Color",
                "Quantity",
                "Price",
                "Total",
              ].map((header) => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "text.secondary",
                    padding: "16px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder?.getState.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  {item?.product?.name}
                </TableCell>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  {item?.product?.photos.length > 0 ? (
                    <Image
                      width={50}
                      height={50}
                      src={item?.product?.photos[0].src}
                      alt={item?.product?.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  {item.size && item.size !== "N/A" ? (
                    <span>{item.size}</span>
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  {item.color && item.color !== "N/A" ? (
                    <span>{item.color}</span>
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  {item.quantity}
                </TableCell>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  ৳ {item.product.price}
                </TableCell>
                <TableCell align="center" sx={{ padding: "12px" }}>
                  ৳ {(item.product.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-end mb-8 mt-5">
        <div className="text-gray-700 mr-2">Subtotal:</div>
        <div className="text-gray-700">
          ৳{" "}
          {selectedOrder.getState
            .reduce(
              (sum, item) =>
                sum +
                (item.product.price ? item.product.price * item.quantity : 0),
              0
            )
            .toFixed(2)}
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Tax:</div>
        <div className="text-gray-700">৳ 40.00</div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Total:</div>
        <div className="text-gray-700 font-bold text-xl">
          ৳{" "}
          {(
            selectedOrder.getState.reduce(
              (sum, item) =>
                sum +
                (item.product.price ? item.product.price * item.quantity : 0),
              0
            ) + 40
          ).toFixed(2)}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-300 pt-8 mb-8">
        <div className="text-gray-700 mb-2">
          Payment is due within 30 days. Late payments are subject to fees.
        </div>
      </div>
    </div>
  );
};

export default Invoice;
