import React from "react";
import Lottie from "lottie-react";
import animationData from "./AdminAnimation.json";

const AdminAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "250px", width: "400px" }}
    />
  );
};

export default AdminAnimation;
