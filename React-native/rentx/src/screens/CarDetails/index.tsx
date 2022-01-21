import React from "react";
import { Container, Header, CarImages } from "./styles";
import {BackButton} from "../../components/BackButton";
import {ImageSlider} from "../../components/ImageSlider";

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider imageUrl={["https://pngimg.com/uploads/audi/audi_PNG99491.png"]} />
      </CarImages>
    </Container>
  )
}