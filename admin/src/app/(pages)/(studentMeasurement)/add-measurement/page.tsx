"use client";
import AddForm from "@/components/templates/AddForm";
import MeasurementForm from "@/components/pageComponents/MeasurementForm";
import { useState } from "react";

const AddMeasurement: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");

  const additionalFields = (
    <MeasurementForm
      category={category}
      setCategory={setCategory}
      selectedSchool={selectedSchool}
      setSelectedSchool={setSelectedSchool}
      student={null}
    />
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
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/students`}
      additionalFields={additionalFields}
      buttonText="Add Measurement"
      photosData={[]}
      id=""
      link="measurement-list"
      isNoPhotoFile={true}
      numberFields={numberFields}
    />
  );
};

export default AddMeasurement;
