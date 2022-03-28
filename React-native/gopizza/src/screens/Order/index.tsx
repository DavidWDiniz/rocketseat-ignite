import React, {useState} from "react";
import { Container, Header, ButtonBack, Photo, Sizes } from "./styles";
import {Platform} from "react-native";
import {RadioButton} from "../../components/RadioButton";
import {PIZZA_TYPES} from "../../utils/pizzaTypes";

export function Order() {
  const [size, setSize] = useState("");
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

      <Sizes>
        {
          PIZZA_TYPES.map(item => (
            <RadioButton
              key={item.id}
              selected={size === item.id}
              title={item.name}
              onPress={() => setSize(item.id)}
            />
          ))
        }
      </Sizes>
    </Container>
  );
}