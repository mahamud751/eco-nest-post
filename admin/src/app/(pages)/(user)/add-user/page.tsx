"use client";
import React, { useState } from "react";

import AddForm from "@/components/templates/AddForm";
import UserForm from "@/components/pageComponents/UserForm";

const AddUser: React.FC = () => {
  const [role, setRole] = useState<string>("");

  const additionalFields = (
    <UserForm role={role} setRole={setRole} user={null} />
  );
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint="http://localhost:8080/v1/users/register"
      additionalFields={additionalFields}
      buttonText="Add User"
      id=""
      photosData={photosData}
      link="user-list"
    />
  );
};

export default AddUser;
