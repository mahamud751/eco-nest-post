import * as React from "react";
import axios from "axios";
import { Order } from "@/services/types/types";

interface InvoiceProps {
  selectedOrder: Order | null;
}
interface AuditLog {
  action: string;
  newValue: {
    status: string;
  };
  timestamp: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#FEF3C7";
    case "processing":
      return "#BFDBFE";
    case "approved":
      return "#86EFAC";
    case "delivered":
      return "#6EE7B7";
    case "canceled":
      return "#FECACA";
    default:
      return "#000000";
  }
};

const indexColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
];

const History: React.FC<InvoiceProps> = ({ selectedOrder }) => {
  const [logs, setLogs] = React.useState<AuditLog[]>([]);
  const entityId = selectedOrder?.id;

  React.useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get<AuditLog[]>(
          `https://api.korbojoy.shop/v1/audit-logs?entityId=${entityId}`
        );
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };

    if (entityId) {
      fetchLogs();
    }
  }, [entityId]);

  if (!selectedOrder) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

      <div
        className={`flex flex-col space-y-8 ${
          logs.length > 6 ? "max-h-96 overflow-y-scroll" : ""
        }`}
      >
        <div className="relative flex items-start">
          <div className="w-1/4 text-right pr-4 text-sm text-gray-600">
            <p>{new Date(selectedOrder?.createdAt).toLocaleString()}</p>
          </div>

          <div className="flex flex-col items-center w-12">
            <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            {logs.length > 0 && (
              <div className="w-1 bg-gray-700 h-12 mt-2"></div>
            )}
          </div>

          <div className="ml-6 w-full">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Created At
            </h3>
            <p className="text-gray-700 mt-1">
              The order was created on{" "}
              <span className="font-bold">
                {new Date(selectedOrder?.createdAt).toLocaleString()}
              </span>
              .
            </p>
          </div>
        </div>

        {/* Now map over the audit logs */}
        {logs.map((log, index) => (
          <div key={index} className="relative flex items-start">
            <div className="w-1/4 text-right pr-4 text-sm text-gray-600">
              <p>{new Date(log.timestamp).toLocaleString()}</p>
            </div>

            <div className="flex flex-col items-center w-12">
              <div
                className={`w-10 h-10 ${
                  indexColors[(index + 1) % indexColors.length]
                } text-white rounded-full flex items-center justify-center font-semibold`}
              >
                {index + 2}
              </div>
              {index < logs.length - 1 && (
                <div className="w-1 bg-gray-700 h-12 mt-2"></div>
              )}
            </div>

            <div className="ml-6 w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                {log.action}
              </h3>
              <p className="text-gray-700 mt-1">
                The new status of the order is:{" "}
                <span
                  className="font-bold px-2 py-2 text-black rounded"
                  style={{
                    backgroundColor: getStatusColor(log.newValue.status),
                  }}
                >
                  {log.newValue.status}
                </span>
              </p>
              {index < logs.length - 1 && (
                <hr className="border-t-2 border-gray-500 mt-4 mb-4 w-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
