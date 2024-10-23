"use client";
import React, { useEffect, useState } from "react";
import { BaseEditProps, Student } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import MeasurementForm from "@/components/pageComponents/MeasurementForm";

const EditMeasurement: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Student>(`students/${params.id}`);
  const [category, setCategory] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  useEffect(() => {
    if (data) {
      setCategory(data.category);
      setSelectedSchool(data.schoolId);
    }
  }, [data]);

  const additionalFields = (
    <>
      <MeasurementForm
        student={data}
        category={category}
        setCategory={setCategory}
        selectedSchool={selectedSchool}
        setSelectedSchool={setSelectedSchool}
      />
    </>
  );
  const numberFields = [
    "height",
    "length",
    "shoulder",
    "sleeveLength",
    "collar",
    "armhole",
    "sleeveOpening",
    "waist",
    "waistSize",
    "hips",
    "bottomHem",
    "halfBody",
    "total",
  ];
  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        photosData={[]}
        isNoPhotoFile={true}
        numberFields={numberFields}
        buttonText="Edit Measurement"
        link="/measurement-list"
      />
    </LoadingError>
  );
};

export default EditMeasurement;
