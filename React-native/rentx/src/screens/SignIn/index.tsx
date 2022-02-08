import React from "react";
import {Container, Header, Subtitle, Title, Footer, Form} from "./styles";
import {StatusBar} from "react-native";
import {Button} from "../../components/Button";
import {useTheme} from "styled-components";
import {Input} from "../../components/Input";

export function SignIn() {
  const theme = useTheme();
  return (
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
  )
}