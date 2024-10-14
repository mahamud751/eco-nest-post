import * as React from "react";
import { Review } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface ReviewShowProps {
  data: Review;
}

const ReviewShow: React.FC<ReviewShowProps> = ({ data }) => {
  return <CommonShowComponent title="Review" data={data} />;
};

export default ReviewShow;
