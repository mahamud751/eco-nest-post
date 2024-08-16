import * as React from "react";
import { Advance } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface AdvanceShowProps {
  data: Advance;
  isFile?: boolean;
}

const AdvanceShow: React.FC<AdvanceShowProps> = ({ data, isFile }) => {
  return <CommonShowComponent title="Advance" data={data} isFile={isFile} />;
};

export default AdvanceShow;
