import React, {useState} from "react";
import {Brand, Container, Content, ForgotPasswordButton, ForgotPasswordButtonLabel, Title} from "./styles";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {KeyboardAvoidingView, Platform} from "react-native";

import brandImg from "../../assets/brand.png";
import {useAuth} from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signIn, isLogging, forgotPassword} = useAuth();

  async function handleSignIn() {
    await signIn(email, password);
  }

  async function handleForgotPassword() {
    await forgotPassword(email);
  }

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
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton
            onPress={handleForgotPassword}
          >
            <ForgotPasswordButtonLabel>
              Esqueci minha senha
            </ForgotPasswordButtonLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />

        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
