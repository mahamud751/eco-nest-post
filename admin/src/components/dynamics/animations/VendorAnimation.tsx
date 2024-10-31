import React from "react";
import Lottie from "lottie-react";
import animationData from "./VendorAnimation.json";

const VendorAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "250px", width: "400px" }}
    />
  );
};

export default VendorAnimation;
