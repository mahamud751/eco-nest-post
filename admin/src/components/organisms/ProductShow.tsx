import * as React from "react";
import { Paper } from "@mui/material";
import { Product } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface ProductShowProps {
  data: Product;
}

const ProductShow: React.FC<ProductShowProps> = ({ data }) => {
  return (
    <Paper elevation={3} className="p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div>
          <CommonDataShow data={data} />
        </div>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Category:
            </strong>
            <span className="font-normal text-gray-600">
              {data.category?.name || "N/A"}
            </span>
          </div>
          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Price:
            </strong>
            <span className="font-normal text-gray-600">${data?.price}</span>
          </div>
          {data.discountPrice && (
            <div>
              <strong className="font-bold block mb-2 text-gray-700">
                Discount Price:
              </strong>
              <span className="font-normal text-gray-600">
                ${data?.discountPrice}
              </span>
            </div>
          )}
          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Flashsale:
            </strong>
            <span className="font-normal text-gray-600">
              {data.flashsale ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Sizes:
            </strong>
            <span className="font-normal text-gray-600">
              {data.sizes?.join(", ") || "N/A"}
            </span>
          </div>
          <div>
            <strong className="font-bold block mb-2 text-gray-700">
              Colors:
            </strong>
            <span className="font-normal text-gray-600">
              {data.colors?.join(", ") || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProductShow;
