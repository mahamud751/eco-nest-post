import React from "react";
import Lottie from "lottie-react";
import animationData from "./NotFoundAnimation.json";

function NotFoundAnimation() {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: "600px", width: "600px" }}
    />
  );
}

export default NotFoundAnimation;
