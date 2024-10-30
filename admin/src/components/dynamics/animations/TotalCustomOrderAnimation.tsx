import React from "react";
import Lottie from "lottie-react";
import animationData from "./TotalCustomOrderAnimation.json";

const TotalCustomOrderAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "600px", width: "600px" }}
    />
  );
};

export default TotalCustomOrderAnimation;
