import React from "react";
import {Container, Header, Subtitle, Title, Footer, Form} from "./styles";
import {Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback} from "react-native";
import {Button} from "../../components/Button";
import {useTheme} from "styled-components";
import {Input} from "../../components/Input";
import {PasswordInput} from "../../components/PasswordInput";

export function SignIn() {
  const theme = useTheme();
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
            backgroundColor="transparent"
            translucent
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
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              light
              color={theme.colors.background_secondary}
              onPress={() => {}}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )

}