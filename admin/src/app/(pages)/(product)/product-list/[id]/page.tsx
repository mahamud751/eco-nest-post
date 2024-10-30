"use client";
import React, { useState, useEffect } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import AddForm from "@/components/templates/AddForm";
import ProductForm from "@/components/pageComponents/ProductForm";
import { BaseEditProps, Photo, Product } from "@/services/types";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";

const EditProduct: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Product>(`products/${params.id}`);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [photosData, setPhotosData] = useState<Photo[]>([]);

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [feature, setFeature] = useState<string>("");
  const [flashsale, setFlashsale] = useState<string>("");
  const [latest, setLatest] = useState<string>("");
  const [discountType, setDiscountType] = useState<string>("");
  const [fulldesc, setFullDesc] = useState(data?.fulldesc);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setFeature(data.feature);
      setFlashsale(data.flashsale);
      setLatest(data.latest);
      setDiscountType(data.discountType);
      setSelectedCategory(data.category.id);
      setSelectedSubCategory(data.subcategory.id);
      setSizes(data.sizes || []);
      setColors(data.colors || []);
      setPhotosData(data.photos || []);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <ProductForm
        subCategory={data}
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

      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/products/${params.id}`}
        additionalFields={additionalFields}
        additionalData={{
          sizes: sizes,
          colors: colors,
          fulldesc,
        }}
        buttonText="Edit Products"
        id={params.id}
        photosData={photosData}
        setPhotosData={setPhotosData}
        isMultiple={true}
        link="/product-list"
      />
    </LoadingError>
  );
};

export default EditProduct;
