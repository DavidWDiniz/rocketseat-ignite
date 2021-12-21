import React from "react";
import { Container, Icon, Title } from "./styles";
import {TouchableOpacityProps} from "react-native";

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle"
}

export function TransactionTypeButton({title, type, isActive, ...rest}: TransactionTypeButtonProps) {
  return (
    <Container
      {...rest}
      isActive={isActive}
      type={type}
    >
      <Icon
        name={icons[type]}
        type={type}
      />
      <Title>
        {title}
      </Title>
    </Container>
  )
}