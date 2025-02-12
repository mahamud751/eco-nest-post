import React from "react";
import Lottie from "lottie-react";
import animationData from "./DeliveryAnimation.json";

const DeliveryAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "180px", width: "180px" }}
    />
  );
};

export default DeliveryAnimation;
