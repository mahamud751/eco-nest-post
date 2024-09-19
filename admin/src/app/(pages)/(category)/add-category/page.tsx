"use client";
import React from "react";

import CategoryForm from "@/components/pageComponents/CategoryForm";
import AddForm from "@/components/templates/AddForm";

const AddCategory: React.FC = () => {
  const additionalFields = <CategoryForm category={null} />;
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint="https://api.korbojoy.shop/v1/categories"
      additionalFields={additionalFields}
      buttonText="Add Category"
      id=""
      photosData={photosData}
      link="category-list"
    />
  );
};

export default AddCategory;
