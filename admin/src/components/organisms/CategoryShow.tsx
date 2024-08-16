import * as React from "react";
import { Category } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface CategoryShowProps {
  data: Category;
}

const CategoryShow: React.FC<CategoryShowProps> = ({ data }) => {
  return <CommonShowComponent title="Category" data={data} />;
};

export default CategoryShow;
