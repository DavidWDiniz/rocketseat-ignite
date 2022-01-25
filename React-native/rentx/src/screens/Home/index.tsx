import React from "react";
import {CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import {StatusBar} from "react-native";
import Logo from "../../assets/logo.svg";
import {RFValue} from "react-native-responsive-fontsize";
import {Car} from "../../components/Car";
import {useNavigation} from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();

  const carData = {
    brand: "AUDI",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://pngimg.com/uploads/audi/audi_PNG99491.png",
  };

  function handleCarDetails() {
    navigation.navigate("CarDetails");
  }

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

      <CarList
        data={[1,2,3,4,5,6,7,8]}
        keyExtractor={item => String(item)}
        renderItem={() =>
          <Car
            data={carData}
            onPress={handleCarDetails}
          />}
      />

    </Container>
  );
}