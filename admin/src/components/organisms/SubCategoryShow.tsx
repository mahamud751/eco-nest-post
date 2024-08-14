import * as React from "react";
import { Subcategory } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface SubCategoryShowProps {
  data: Subcategory;
}

const SubCategoryShow: React.FC<SubCategoryShowProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sub Category Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <strong className="font-bold block mb-1">Category:</strong>
          <span className="font-normal">{data.category?.name || "N/A"}</span>
        </div>
      </div>
      <div>
        <CommonDataShow data={data} />
      </div>
    </div>
  );
};

export default SubCategoryShow;
