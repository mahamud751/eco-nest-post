"use client";
import FaqForm from "@/components/pageComponents/FaqForm";
import AddForm from "@/components/templates/AddForm";

const AddFaq: React.FC = () => {
  const additionalFields = <FaqForm faq={null} />;

  return (
    <AddForm
      endpoint="https://api.korbojoy.shop/v1/faq"
      additionalFields={additionalFields}
      buttonText="Add faq"
      photosData={[]}
      id=""
      link="faq-list"
      isNoPhotoFile={true}
    />
  );
};

export default AddFaq;
