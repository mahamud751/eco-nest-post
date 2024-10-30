"use client";
import React, { useState } from "react";

import AddForm from "@/components/templates/AddForm";
import ProductForm from "@/components/pageComponents/ProductForm";
import { Category } from "@/services/types";
import { useAuth } from "@/services/hooks/auth";

const AddProduct: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [feature, setFeature] = useState<string>("");
  const [flashsale, setFlashsale] = useState<string>("");
  const [latest, setLatest] = useState<string>("");
  const [discountType, setDiscountType] = useState<string>("");
  const [fulldesc, setFullDesc] = useState("");
  const photosData: { title: string; src: string }[] = [];

  const additionalFields = (
    <ProductForm
      subCategory={null}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedSubCategory={selectedSubCategory}
      setSelectedSubCategory={setSelectedSubCategory}
      sizes={sizes}
      setSizes={setSizes}
      colors={colors}
      setColors={setColors}
      feature={feature}
      setFeature={setFeature}
      flashsale={flashsale}
      setFlashsale={setFlashsale}
      latest={latest}
      setLatest={setLatest}
      discountType={discountType}
      setDiscountType={setDiscountType}
      onDetailsChange={(newDetails) => setFullDesc(newDetails)}
    />
  );

  const resetFields = () => {
    setCategories([]);
    setSelectedCategory("");
    setSizes([]);
    setColors([]);
    setFeature("");
    setFlashsale("");
    setLatest("");
    setDiscountType("");
  };

  return (
    <div>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/products`}
        additionalFields={additionalFields}
        additionalData={{
          sizes: sizes,
          colors: colors,
          userInfo: user,
          fulldesc,
        }}
        buttonText="Add Product"
        resetFields={resetFields}
        id={""}
        photosData={photosData}
        link="product-list"
        isMultiple={true}
      />
    </div>
  );
};

export default AddProduct;
