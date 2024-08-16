import * as React from "react";
import { Paper } from "@mui/material";
import CommonDataShow from "../molecules/CommonDataShow";

interface CommonShowComponentProps {
  title: string;
  data: any;
  isFile?: boolean;
}

const CommonShowComponent: React.FC<CommonShowComponentProps> = ({
  title,
  data,
  isFile = false,
}) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {title} Details
        </h2>
        <CommonDataShow data={data} isFile={isFile} />
      </div>
    </Paper>
  );
};

export default CommonShowComponent;
