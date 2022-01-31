import React from "react";
import { Container, Title } from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";

interface AccessoryProps extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
}

export function Button({title, color, enabled = true, ...rest}: AccessoryProps) {
  return (
    <Container
      color={color}
      enabled={enabled}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  )
}