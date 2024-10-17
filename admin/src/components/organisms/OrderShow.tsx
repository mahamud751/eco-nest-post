import * as React from "react";
import Image from "next/image";
import { Paper } from "@mui/material";
import { Order } from "@/services/types";
import StatusButton from "../atoms/StatusButton";
import UseFormattedDate from "@/services/hooks/UseFormattedDate";
import InvoiceModal from "@/app/(pages)/(order)/order-list/InvoiceModal";

interface OrderShowProps {
  data: Order;
}

const OrderShow: React.FC<OrderShowProps> = ({ data }) => {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div>
          <strong className="font-bold block mb-2 text-gray-700">ID:</strong>
          <span className="font-normal text-gray-600">{data.id}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            UserName
          </strong>
          <span className="font-normal text-gray-600">
            {data.firstName} {data.lastName}
          </span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">Email</strong>
          <span className="font-normal text-gray-600">{data.email}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">Phone </strong>
          <span className="font-normal text-gray-600">{data.phone}</span>
        </div>

        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Status:
          </strong>
          <StatusButton status={data.status} />
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Invoices:
          </strong>
          <button
            className="mt-3 flex justify-center items-center bg-red-500 text-white px-4 rounded"
            onClick={() => handleOpenModal(data)}
            style={{ height: 27 }}
          >
            View Invoice
          </button>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Created At:
          </strong>
          <span className="font-normal text-gray-600">
            {UseFormattedDate(data.createdAt)}
          </span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Updated At:
          </strong>
          <span className="font-normal text-gray-600">
            {UseFormattedDate(data.updatedAt)}
          </span>
        </div>
        {selectedOrder && (
          <InvoiceModal
            open={isModalOpen}
            onClose={handleCloseModal}
            selectedOrder={selectedOrder}
          />
        )}
      </div>
    </Paper>
  );
};

export default OrderShow;
