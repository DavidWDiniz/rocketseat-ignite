import React from "react";
import {Brand, Container, Content, ForgotPasswordButton, ForgotPasswordButtonLabel, Title} from "./styles";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {KeyboardAvoidingView, Platform} from "react-native";

import brandImg from "../../assets/brand.png";

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Content>
          <Brand source={brandImg} />
          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
          />

          <ForgotPasswordButton>
            <ForgotPasswordButtonLabel>
              Esqueci minha senha
            </ForgotPasswordButtonLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
          />

        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
