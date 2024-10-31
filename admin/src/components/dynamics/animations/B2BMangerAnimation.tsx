import React from "react";
import Lottie from "lottie-react";
import animationData from "./B2BMangerAnimation.json";

const B2BMangerAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "250px", width: "400px" }}
    />
  );
};

export default B2BMangerAnimation;
