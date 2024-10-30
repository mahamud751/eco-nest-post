import React from "react";
import Lottie from "lottie-react";
import animationData from "./GreenBarAnimation.json";

const GreenBarAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "180px", width: "180px" }}
    />
  );
};

export default GreenBarAnimation;
