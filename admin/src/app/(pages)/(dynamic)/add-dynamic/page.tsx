"use client";
import { useState } from "react";
import DynamicForm from "@/components/pageComponents/DynamicForm";
import AddForm from "@/components/templates/AddForm";

const AddDynamic: React.FC = () => {
  const [desc, setDesc] = useState("");

  const additionalFields = (
    <DynamicForm
      dynamic={null}
      onDetailsChange={(newDetails) => setDesc(newDetails)}
    />
  );

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/dynamics`}
      additionalFields={additionalFields}
      buttonText="Add Dynamic"
      photosData={[]}
      id=""
      link="dynamic-list"
      additionalData={{ desc }}
      isNoPhotoFile={true}
    />
  );
};

export default AddDynamic;
