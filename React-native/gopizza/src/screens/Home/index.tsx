import React, {useEffect} from "react";
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemsNumber, Title } from "./styles";
import happyEmoji from "../../assets/happy.png";
import {MaterialIcons} from "@expo/vector-icons";
import {useTheme} from "styled-components/native";
import {Alert, TouchableOpacity} from "react-native";
import {Search} from "../../components/Search";
import {ProductCard, ProductProps} from "../../components/ProductCard";
import firestore from "@react-native-firebase/firestore";

export function Home() {
  const theme = useTheme();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();
    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[];
        console.log(data);
      })
      .catch(() => Alert.alert("Consulta", "Não foi possível realizar a consulta."));
  }

  useEffect(() => {
    fetchPizzas("");
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji}/>
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name="logout" color={theme.COLORS.TITLE} size={24}/>
        </TouchableOpacity>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <ProductCard data={{
        id: "1",
        name: "Pizza",
        description: "4 queijos",
        photo_url: "https://superprix.vteximg.com.br/arquivos/ids/204058-600-600/8d1c807dd5f808c791d467a8f6391cf2_pizza-seara-de-4-queijos-460g_lett_5.jpg?v=637695827205500000"
      }}/>
    </Container>
  );
}
