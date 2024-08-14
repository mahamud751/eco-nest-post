import * as React from "react";
import { Banner } from "@/services/types";

import CommonDataShow from "../molecules/CommonDataShow";

interface BannerShowProps {
  data: Banner;
}

const BannerShow: React.FC<BannerShowProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Banner Details</h2>
      <CommonDataShow data={data} />
    </div>
  );
};

export default BannerShow;
