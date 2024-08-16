import * as React from "react";
import { Banner } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface BannerShowProps {
  data: Banner;
}

const BannerShow: React.FC<BannerShowProps> = ({ data }) => {
  return <CommonShowComponent title="Banner" data={data} />;
};

export default BannerShow;
