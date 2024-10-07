import * as React from "react";
import CommonShowComponent from "../molecules/CommonDataTitle";
import { Dynamic } from "@/services/types";

interface DynamicShowProps {
  data: Dynamic;
}

const DynamicShow: React.FC<DynamicShowProps> = ({ data }) => {
  return <CommonShowComponent title="Dynamic" data={data} />;
};

export default DynamicShow;
