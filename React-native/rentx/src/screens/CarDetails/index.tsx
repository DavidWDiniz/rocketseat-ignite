import React from "react";
import { Container, Header, CarImages, Content, Details, Description, Branding, Name, Rent, Period, Price, Accessories, About, Footer} from "./styles";
import {BackButton} from "../../components/BackButton";
import {ImageSlider} from "../../components/ImageSlider";
import {Accessory} from "../../components/Accessory";
import {Button} from "../../components/Button";
import {useNavigation, useRoute} from "@react-navigation/native";
import {CarDTO} from "../../dtos/CarDTO";
import {getAccessoryIcon} from "../../utils/getAccessoryIcon";
import {StatusBar} from "react-native";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling", {car});
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Branding>{car.brand}</Branding>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  )
}