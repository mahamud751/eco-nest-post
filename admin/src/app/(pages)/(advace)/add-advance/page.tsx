"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import AdvanceForm from "@/components/pageComponents/AdvanceForm";

const AddAdvance: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const additionalFields = <AdvanceForm advance={null} />;
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
      isMultiple={true}
    />
  );
};

export default AddAdvance;
