import React from "react";
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreetings, UserName, Icon, HighlightCards } from "./styles";
import {HighlightCard} from "../../components/HighlightCard";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: "https://avatars.githubusercontent.com/u/20936380?v=4"}} />
            <User>
              <UserGreetings>Olá,</UserGreetings>
              <UserName>David</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  )
}
