import React from "react";
import { Container, StatusContainer, StatusTypeProps, StatusLabel, Name, Image, Description } from "./styles";
import {TouchableOpacityProps} from "react-native";

type Props = TouchableOpacityProps & {
  index: number;
}

export function OrderCard({index, ...rest}: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-cecde.appspot.com/o/pizzas%2F1648225809581.png?alt=media&token=2c003d90-d0a4-41da-8f26-e3af25936912"}} />
      <Name>Calabresa</Name>
      <Description>
        Mesa 1 🞄 Qnt: 2
      </Description>
      <StatusContainer status="Preparando">
        <StatusLabel status="Preparando">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
}