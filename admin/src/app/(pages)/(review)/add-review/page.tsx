"use client";
import React from "react";

import AddForm from "@/components/templates/AddForm";
import ReviewForm from "@/components/pageComponents/ReviewForm";

const AddReview: React.FC = () => {
  const additionalFields = <ReviewForm review={null} />;
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/reviews`}
      additionalFields={additionalFields}
      buttonText="Add Review"
      id=""
      photosData={photosData}
      link="review-list"
    />
  );
};

export default AddReview;
