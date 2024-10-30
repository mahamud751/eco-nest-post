import React from "react";
import Lottie from "lottie-react";
import animationData from "./DeliveryVanAnimation.json";

const DeliveryVanAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "400px", width: "400px" }}
    />
  );
};

export default DeliveryVanAnimation;
