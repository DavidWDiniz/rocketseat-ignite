import React, {useCallback, useEffect, useState} from "react";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from "./styles";
import {HighlightCard} from "../../components/HighlightCard";
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  outcomes: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let outcomesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
        if(item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          outcomesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });
        const date = new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      }
    );

    setTransactions(transactionsFormatted);
    const total = entriesTotal - outcomesTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
      },
      outcomes: {
        amount: outcomesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
      }
    })
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: "https://avatars.githubusercontent.com/u/20936380?v=4"}}/>
            <User>
              <UserGreetings>Olá,</UserGreetings>
              <UserName>David</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {
          }}>
            <Icon name="power"/>
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard title="Entradas" amount={highlightData.entries.amount} lastTransaction="Última entrada dia 13 de abril"
                       type="up"/>
        <HighlightCard title="Saídas" amount={highlightData.outcomes.amount} lastTransaction="Última saída dia 13 de abril"
                       type="down"/>
        <HighlightCard title="Total" amount={highlightData.total.amount} lastTransaction="01 a 06 de abril" type="total"/>
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <TransactionCard data={item}/>
          }
        />
      </Transactions>
    </Container>
  )
}
