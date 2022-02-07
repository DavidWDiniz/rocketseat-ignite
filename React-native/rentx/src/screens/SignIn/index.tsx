import React from "react";
import {Container, Header, Subtitle, Title, Footer} from "./styles";
import {StatusBar} from "react-native";
import {Button} from "../../components/Button";
import {useTheme} from "styled-components";

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