import React from "react";
import { Container, Header, HeaderContent, TotalCars } from "./styles";
import {StatusBar} from "react-native";
import Logo from "../../assets/logo.svg";
import {RFValue} from "react-native-responsive-fontsize";
import {Car} from "../../components/Car";

export function Home() {
  const carData = {
    brand: "AUDI",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://pngimg.com/uploads/audi/audi_PNG99491.png",
  };
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 10 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carData}/>
      <Car data={carData}/>
    </Container>
  );
}