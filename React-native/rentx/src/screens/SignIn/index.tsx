import React, {useState} from "react";
import {Container, Header, Subtitle, Title, Footer, Form} from "./styles";
import {Alert, Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback} from "react-native";
import {Button} from "../../components/Button";
import {useTheme} from "styled-components";
import {Input} from "../../components/Input";
import {PasswordInput} from "../../components/PasswordInput";
import * as Yup from "yup";
import {useNavigation} from "@react-navigation/native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
      });

      await schema.validate({email, password});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa!", error.message);
      } else {
        Alert.alert("Erro na autenticação!", "Ocorreu um erro ao fazer login, verifique as credenciais");
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.colors.background_primary}
          />
          <Header>
            <Title>
              Estamos{`\n`}
              quase lá.
            </Title>
            <Subtitle>
              Faça seu login para começar{`\n`}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              light
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )

}