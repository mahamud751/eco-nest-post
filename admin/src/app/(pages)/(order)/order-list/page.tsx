"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";
import InvoiceModal from "./InvoiceModal";
import { Order } from "@/services/types";
import CustomerAssignRider from "@/components/molecules/CustomerAssignRider";
import { useAuth } from "@/services/hooks/auth";

const OrderList = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedRiderOrder, setSelectedRiderOrder] = useState<Order | null>(
    null
  );
  const [isModalOpenInvoice, setIsModalOpenInvoice] = useState(false);

  const handleAssignClick = (row: Order) => {
    setSelectedRiderOrder(row);
  };

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpenInvoice(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenInvoice(false);
    setSelectedOrder(null);
  };

  const fetchUrl =
    user?.role === "rider"
      ? `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/${user?.id}/riderOrder`
      : `${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      renderCell: (params) => (
        <p>
          {params.row?.firstName} {params.row?.lastName}
        </p>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "invoice",
      headerName: "Invoice",
      flex: 1,
      renderCell: (params) => (
        <button
          className="mt-3 flex justify-center items-center bg-red-500 text-white px-4 rounded"
          onClick={() => handleOpenModal(params.row)}
          style={{ height: 27 }}
        >
          View Invoice
        </button>
      ),
    },
  ];
  if (user?.role !== "rider") {
    columns.push({
      field: "assignRider",
      headerName: "Assign Rider",
      flex: 1,
      renderCell: (params) => (
        <button
          className="mt-3 flex justify-center items-center bg-gray-700 text-white rounded w-[80px] h-[28px]"
          onClick={() => handleAssignClick(params.row)}
        >
          Assign
        </button>
      ),
    });
  }

  return (
    <>
      <DataTable
        fetchUrl={fetchUrl}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`}
        columns={columns}
        searchField="name"
        link="order-list"
        isJustCreateData={false}
      />
      {selectedOrder && (
        <InvoiceModal
          open={isModalOpenInvoice}
          onClose={handleCloseModal}
          selectedOrder={selectedOrder}
        />
      )}
      {selectedRiderOrder && (
        <CustomerAssignRider
          data={selectedRiderOrder}
          onClose={() => setSelectedRiderOrder(null)}
        />
      )}
    </>
  );
};

export default OrderList;
