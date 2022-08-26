import React from "react";
import LottieView from "lottie-react-native";

const LoadingLottie = () => {
  return (
    <LottieView
      source={require("./spinner.json")}
      style={[
        {
          width: 60,
          height: 60,
        },
      ]}
      autoPlay
      speed={1}
      loop
      resizeMode="cover"
    />
  );
};

export default LoadingLottie;
