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
import {useAuth} from "../../hooks/auth";

type PizzaResponse = ProductProps & {
  price_sizes: {
    [key: string]: number;
  }
}

export function Order() {
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const [sendingOrder, setSendingOrder] = useState(false);

  const {user} = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params as OrderNavigationProps;

  const amount = size ? pizza.price_sizes[size] * quantity : "0,00"

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza.");
    }

    if (!tableNumber) {
      return Alert.alert("Pedido", "Informe o número da mesa.");
    }

    if (!quantity) {
      return Alert.alert("Pedido", "Informe a quantidade.");
    }

    setSendingOrder(true);

    firestore()
      .collection("orders")
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: "Preparando",
        waiter_id: user?.id,
        image: pizza.photo_url
      })
      .then(() => navigation.navigate("home"))
      .catch(() => {
        Alert.alert("Pedido", "Não foi possível realizar o pedido.");
        setSendingOrder(false);
      })
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
              <Input keyboardType="numeric" onChangeText={setTableNumber}/>
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" onChangeText={(value) => setQuantity(Number(value))} />
            </InputGroup>
          </FormRow>
          <Price>Valor de R$ {amount}</Price>
          <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}