import * as React from "react";
import { Advance, Banner } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface BannerShowProps {
  data: Advance;
  isFile?: boolean;
}

const AdvanceShow: React.FC<BannerShowProps> = ({ data, isFile }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Banner Details</h2>
      <CommonDataShow data={data} isFile={isFile} />
    </div>
  );
};

export default AdvanceShow;
