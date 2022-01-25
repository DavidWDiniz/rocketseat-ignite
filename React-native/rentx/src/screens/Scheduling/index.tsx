import React from "react";
import {Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer} from "./styles";
import {BackButton} from "../../components/BackButton";
import {useTheme} from "styled-components";
import ArrowSvg from "../../assets/arrow.svg";
import {StatusBar} from "react-native";
import {Button} from "../../components/Button";
import {Calendar} from "../../components/Calendar";

export function Scheduling() {
  const theme = useTheme();
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={() => {}}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>24/01/2022</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>24/01/2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}