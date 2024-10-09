import React from "react";
import Lottie from "lottie-react";
import animationData from "./NotFoundAnimation.json";

const NotFoundAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "600px", width: "600px" }}
    />
  );
};

export default NotFoundAnimation;
