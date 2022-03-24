import React from "react";
import { Container, Greeting, GreetingEmoji, GreetingText, Header } from "./styles";
import happyEmoji from "../../assets/happy.png";
import {MaterialIcons} from "@expo/vector-icons";
import {useTheme} from "styled-components/native";
import {TouchableOpacity} from "react-native";

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
    </Container>
  );
}
