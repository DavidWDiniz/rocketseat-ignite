import React from "react";
import { Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemsNumber, Title } from "./styles";
import happyEmoji from "../../assets/happy.png";
import {MaterialIcons} from "@expo/vector-icons";
import {useTheme} from "styled-components/native";
import {TouchableOpacity} from "react-native";
import {Search} from "../../components/Search";

export function Home() {
  const theme = useTheme();
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
    </Container>
  );
}
