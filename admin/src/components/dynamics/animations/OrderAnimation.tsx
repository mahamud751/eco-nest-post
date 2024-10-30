import React from "react";
import Lottie from "lottie-react";
import animationData from "./OrderAnimation.json";

const OrderAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "180px", width: "180px" }}
    />
  );
};

export default OrderAnimation;
