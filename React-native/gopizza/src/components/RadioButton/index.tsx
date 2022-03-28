import React from "react";
import { Container, Radio, Title, Selected, RadioButtonProps } from "./styles";
import {TouchableOpacityProps} from "react-native";

type Props = TouchableOpacityProps & RadioButtonProps & {
  title: string;
}

export function RadioButton({title, selected = false, ...rest}: Props) {
  return (
    <Container
      selected={selected}
      {...rest}
    >
      <Radio>{selected && <Selected/>}</Radio>
      <Title>{title}</Title>
    </Container>
  );
}