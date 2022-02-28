import React from "react";
import { Container, Title } from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps{
  title: string;
  onPress: () => void;
}

export function Button({title, onPress, ...rest}: ButtonProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}