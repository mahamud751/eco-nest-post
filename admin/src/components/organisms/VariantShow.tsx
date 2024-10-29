import * as React from "react";
import { Paper } from "@mui/material";
import { Variant } from "@/services/types";

interface ProductShowProps {
  data: Variant;
}

const VariantShow: React.FC<ProductShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-bold mb-4">Variant Details</h2>

        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <strong className="font-bold block mb-2 text-gray-700">Name</strong>
            <span className="font-normal text-gray-600">
              {data?.name || "N/A"}
            </span>
          </div>

          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Options:
            </strong>
            <span className="font-normal text-gray-600">
              {data.options?.join(", ") || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default VariantShow;
