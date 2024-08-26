import * as React from "react";
import { Paper } from "@mui/material";
import { School } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface SchoolShowProps {
  data: School;
}

const SchoolShow: React.FC<SchoolShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          School Details
        </h2>
        <CommonDataShow data={data} />
      </div>
    </Paper>
  );
};

export default SchoolShow;
