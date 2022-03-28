import React from "react";
import { Container, Header, ButtonBack, Photo } from "./styles";
import {Platform} from "react-native";

export function Order() {
  return (
    <Container
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header>
        <ButtonBack
          onPress={() => {}}
        />
      </Header>
      <Photo source={{uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-cecde.appspot.com/o/pizzas%2F1648226193281.png?alt=media&token=8c58e448-3542-4b63-8089-ac87b2997965"}} />
    </Container>
  );
}