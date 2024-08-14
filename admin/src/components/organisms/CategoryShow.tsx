import * as React from "react";
import { Category } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface CategoryShowProps {
  data: Category;
}

const CategoryShow: React.FC<CategoryShowProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Category Details</h2>
      <CommonDataShow data={data} />
    </div>
  );
};

export default CategoryShow;
