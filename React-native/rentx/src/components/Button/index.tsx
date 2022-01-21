import React from "react";
import { Container, Title } from "./styles";

interface AccessoryProps {
  title: string;
  color?: string;
}

export function Button({title, color, ...rest}: AccessoryProps) {
  return (
    <Container
      color={color}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  )
}