import * as React from "react";
import { Product } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface ProductShowProps {
  data: Product;
}

const ProductShow: React.FC<ProductShowProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <div>
        <CommonDataShow data={data} />
      </div>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <strong className="font-bold block mb-1">Category:</strong>
          <span className="font-normal">{data.category?.name || "N/A"}</span>
        </div>
        <div>
          <strong className="font-bold block mb-1">Price:</strong>
          <span className="font-normal">${data?.price}</span>
        </div>
        {data.discountPrice && (
          <div>
            <strong className="font-bold block mb-1">Discount Price:</strong>
            <span className="font-normal">${data?.discountPrice}</span>
          </div>
        )}
        <div>
          <strong className="font-bold block mb-1">Flashsale:</strong>
          <span className="font-normal">{data.flashsale ? "Yes" : "No"}</span>
        </div>
        <div>
          <strong className="font-bold block mb-1">Sizes:</strong>
          <span className="font-normal">{data.sizes?.join(", ") || "N/A"}</span>
        </div>
        <div>
          <strong className="font-bold block mb-1">Colors:</strong>
          <span className="font-normal">
            {data.colors?.join(", ") || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
