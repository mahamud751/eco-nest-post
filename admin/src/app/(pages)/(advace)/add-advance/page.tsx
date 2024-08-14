"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import AdvanceForm from "@/components/pageComponents/AdvanceForm";

const AddAdvance: React.FC = () => {
  const [quantity, setQuantity] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const additionalFields = (
    <AdvanceForm
      advance={null}
      onDetailsChange={(newDetails) => setQuantity(newDetails)}
    />
  );
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint="http://localhost:8080/v1/advance"
      additionalFields={additionalFields}
      buttonText="Add Advance"
      photosData={photosData}
      files={files}
      setFiles={setFiles}
      id=""
      link="advance-list"
      isFile={true}
      additionalData={{
        quantity: quantity,
      }}
      isMultiple={true}
    />
  );
};

export default AddAdvance;
