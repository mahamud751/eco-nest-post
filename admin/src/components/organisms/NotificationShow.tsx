import * as React from "react";
import { Paper } from "@mui/material";
import { Notification } from "@/services/types";
import StatusButton from "../atoms/StatusButton";
import UseFormattedDate from "@/services/hooks/UseFormattedDate";

interface NotificationShowProps {
  data: Notification;
}

const NotificationShow: React.FC<NotificationShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div>
          <strong className="font-bold block mb-2 text-gray-700">ID:</strong>
          <span className="font-normal text-gray-600">{data.id}</span>
        </div>

        <div>
          <strong className="font-bold block mb-2 text-gray-700">Email</strong>
          <span className="font-normal text-gray-600">{data.userEmail}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Message{" "}
          </strong>
          <span className="font-normal text-gray-600">{data.message}</span>
        </div>

        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Status:
          </strong>
          <StatusButton status={data.status} />
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
        </div>
      </div>
    </Paper>
  );
};

export default NotificationShow;
