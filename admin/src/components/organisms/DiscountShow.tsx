import * as React from "react";
import { Discount } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface DiscountShowProps {
  data: Discount;
}

const DiscountShow: React.FC<DiscountShowProps> = ({ data }) => {
  return <CommonShowComponent title="Discount" data={data} />;
};

export default DiscountShow;
