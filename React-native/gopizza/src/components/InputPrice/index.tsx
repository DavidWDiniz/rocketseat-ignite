import React from "react";
import { Container, Label, Size, Input } from "./styles";
import {TextInputProps} from "react-native";

type Props = TextInputProps & {
  size: string;
}

export function InputPrice({size, ...rest}: Props) {
  return (
    <Container>
      <Size>
        <Label>{size}</Label>
      </Size>
      <Label>R$</Label>
      <Input keyboardType="numeric" {...rest}/>
    </Container>
  );
}