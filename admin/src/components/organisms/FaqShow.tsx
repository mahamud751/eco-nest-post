import * as React from "react";
import { Faq } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface FaqShowProps {
  data: Faq;
}

const FaqShow: React.FC<FaqShowProps> = ({ data }) => {
  return <CommonShowComponent title="Faq" data={data} />;
};

export default FaqShow;
