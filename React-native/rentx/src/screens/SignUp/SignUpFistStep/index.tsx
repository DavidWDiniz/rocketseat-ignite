import React from "react";
import {Container, Form, FormTitle, Header, Steps, Subtitle, Title} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {BackButton} from "../../../components/BackButton";
import {Bullet} from "../../../components/Bullet";

export function SignUpFirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>
      <Title>
        Crie sua{'\n'}
        conta.
      </Title>
      <Subtitle>
        Faça seu cadastro de{'\n'}
        forma rápida e fácil.
      </Subtitle>
      <Form>
        <FormTitle>
          1. Dados
        </FormTitle>
      </Form>
    </Container>
  )
}