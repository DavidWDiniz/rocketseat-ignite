import React from "react";
import LottieView from "lottie-react-native";
import { Container } from "./styles";
import LoadingCar from "../../assets/load_animated.json";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={LoadingCar}
        autoPlay
        loop
        resizeMode="contain"
        style={{height: 200}}
      />
    </Container>
  );
}