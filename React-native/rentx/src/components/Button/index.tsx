import React from "react";
import { Container, Title } from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";
import {ActivityIndicator} from "react-native";
import {useTheme} from "styled-components";

interface AccessoryProps extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({title, color, enabled = true, loading = false, ...rest}: AccessoryProps) {
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
        <Title>{title}</Title>}
    </Container>
  )
}