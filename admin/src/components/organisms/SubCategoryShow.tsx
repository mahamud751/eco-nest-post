import * as React from "react";
import { Paper } from "@mui/material";
import { Subcategory } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface SubCategoryShowProps {
  data: Subcategory;
}

const SubCategoryShow: React.FC<SubCategoryShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Sub Category Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Category:
            </strong>
            <span className="font-normal text-gray-600">
              {data.category?.name || "N/A"}
            </span>
          </div>
        </div>
        <div>
          <CommonDataShow data={data} />
        </div>
      </div>
    </Paper>
  );
};

export default SubCategoryShow;
