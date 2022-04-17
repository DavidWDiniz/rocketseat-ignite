import React, {useEffect, useState} from "react";
import { Container, Header, ButtonBack, Photo, Sizes, Form, Title, FormRow, Label, Price, InputGroup, ContentScroll } from "./styles";
import {Alert, Platform} from "react-native";
import {RadioButton} from "../../components/RadioButton";
import {PIZZA_TYPES} from "../../utils/pizzaTypes";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {useNavigation, useRoute} from "@react-navigation/native";
import {OrderNavigationProps} from "../../@types/navigation";
import firestore from "@react-native-firebase/firestore";
import {ProductProps} from "../../components/ProductCard";

type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number;
  }
}

export function Order() {
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params as OrderNavigationProps;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then(response => setPizza(response.data() as PizzaResponse))
        .catch(() => Alert.alert("Pedido", "Não foi possivel carregar o produto"));
    }
  }, []);

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
        <Photo source={{uri: pizza.photo_url}} />

        <Form>
          <Title>{pizza.name}</Title>
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