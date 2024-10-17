"use client";
import { useState } from "react";
import SubCategoryForm from "@/components/pageComponents/SubCategoryForm";
import AddForm from "@/components/templates/AddForm";

const AddSubCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const photosData: { title: string; src: string }[] = [];
  const additionalFields = (
    <SubCategoryForm
      subCategory={null}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/subCategories`}
        additionalFields={additionalFields}
        buttonText="Add Sub Category"
        id=""
        photosData={photosData}
        link="subCategory-list"
      />
    </div>
  );
};

export default AddSubCategory;
