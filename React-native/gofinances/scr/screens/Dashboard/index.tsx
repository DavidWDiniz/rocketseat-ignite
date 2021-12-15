import React from "react";
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreetings, UserName, Icon, HighlightCards, Transactions, Title, TransactionList } from "./styles";
import {HighlightCard} from "../../components/HighlightCard";
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps{
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento",
      amount: "R$ 5.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "15/12/21"
    },
    {
      id: "2",
      type: "negative",
      title: "Desenvolvimento",
      amount: "R$ 5.000,00",
      category: {
        name: "Vendas",
        icon: "coffee"
      },
      date: "15/12/21"
    },
    {
      id: "3",
      type: "negative",
      title: "Desenvolvimento",
      amount: "R$ 5.000,00",
      category: {
        name: "Vendas",
        icon: "shopping-bag"
      },
      date: "15/12/21"
    },
  ];

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
        <HighlightCard title="Entradas" amount="R$ 17.500,00" lastTransaction="Última entrada dia 13 de abril" type="up" />
        <HighlightCard title="Saídas" amount="R$ 12.500,00" lastTransaction="Última saída dia 13 de abril" type="down" />
        <HighlightCard title="Total" amount="R$ 5.000,00" lastTransaction="01 a 06 de abril" type="total" />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <TransactionCard data={item}/>
          }
        />
      </Transactions>
    </Container>
  )
}
