import React from "react";
import {Container, Form, FormTitle, Header, Steps, Subtitle, Title} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {BackButton} from "../../../components/BackButton";
import {Bullet} from "../../../components/Bullet";
import {Button} from "../../../components/Button";
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from "react-native";
import {PasswordInput} from "../../../components/PasswordInput";
import {useTheme} from "styled-components";

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet />
              <Bullet active />
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}