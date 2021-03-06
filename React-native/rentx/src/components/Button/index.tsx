import React from "react";
import { Container, Title } from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";
import {ActivityIndicator} from "react-native";
import {useTheme} from "styled-components";

interface AccessoryProps extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export function Button({title, color, enabled = true, loading = false, light = false, ...rest}: AccessoryProps) {
  const theme = useTheme();
  return (
    <Container
      color={color}
      enabled={enabled}
      {...rest}
    >
      {loading ?
        <ActivityIndicator color={theme.colors.shape} />
        :
        <Title light={light}>{title}</Title>}
    </Container>
  )
}