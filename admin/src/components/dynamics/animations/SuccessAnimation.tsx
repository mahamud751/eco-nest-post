import React from "react";
import Lottie from "lottie-react";
import animationData from "./SuccessAnimation.json";

const SuccessAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "400px", width: "400px" }}
    />
  );
};

export default SuccessAnimation;
