import * as React from "react";
import { Paper } from "@mui/material";
import { User } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface UserShowProps {
  data: User;
}

const UserShow: React.FC<UserShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Details</h2>
        <CommonDataShow data={data} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div>
          <strong className="font-bold block mb-2 text-gray-700">Email:</strong>
          <span className="font-normal text-gray-600">{data.email}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">Phone:</strong>
          <span className="font-normal text-gray-600">{data?.phone}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">
            Address:
          </strong>
          <span className="font-normal text-gray-600">{data?.address}</span>
        </div>
        <div>
          <strong className="font-bold block mb-2 text-gray-700">Role:</strong>
          <span className="font-normal text-gray-600">{data?.role}</span>
        </div>
      </div>
    </Paper>
  );
};

export default UserShow;
