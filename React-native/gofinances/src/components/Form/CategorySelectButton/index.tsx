import React from "react";
import { Container, Category, Icon } from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";

interface CategorySelectProps extends RectButtonProps{
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({title, onPress, testID}: CategorySelectProps) {
  return (
    <Container
      testID={testID}
      onPress={onPress}
    >
      <Category>{title}</Category>
      <Icon name="chevron-down"/>
    </Container>
  )
}