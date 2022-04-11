import React, {useState} from "react";
import { Container, Header, ButtonBack, Photo, Sizes, Form, Title, FormRow, Label, Price, InputGroup, ContentScroll } from "./styles";
import {Platform} from "react-native";
import {RadioButton} from "../../components/RadioButton";
import {PIZZA_TYPES} from "../../utils/pizzaTypes";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {useNavigation} from "@react-navigation/native";

export function Order() {
  const [size, setSize] = useState("");
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ContentScroll>
        <Header>
          <ButtonBack
            onPress={handleGoBack}
          />
        </Header>
        <Photo source={{uri: "https://firebasestorage.googleapis.com/v0/b/gopizza-cecde.appspot.com/o/pizzas%2F1648226193281.png?alt=media&token=8c58e448-3542-4b63-8089-ac87b2997965"}} />

        <Form>
          <Title>Nome da Pizza</Title>
          <Label>Selecione o tamanho</Label>
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

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ 00,00</Price>
          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}