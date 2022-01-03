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
  LogoutButton,
  LoaderContainer
} from "./styles";
import {HighlightCard} from "../../components/HighlightCard";
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {ActivityIndicator} from "react-native";
import {useTheme} from "styled-components/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  outcomes: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(collection: DataListProps[], type: "positive" | "negative") {
    const lastTransactions = new Date(Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString("pt-BR", {month: "long"})}`
  }

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

    const lastTransactionEntries = getLastTransactionDate(transactions, "positive");
    const lastTransactionOutcomes = getLastTransactionDate(transactions, "negative");
    const totalInterval = `1 a ${lastTransactionEntries}`;

    const total = entriesTotal - outcomesTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      outcomes: {
        amount: outcomesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: `Última saída dia ${lastTransactionOutcomes}`
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        }),
        lastTransaction: totalInterval
      }
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ?
          <LoaderContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoaderContainer> :
        <>
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
            <HighlightCard title="Entradas" amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction}
                           type="up"/>
            <HighlightCard title="Saídas" amount={highlightData.outcomes.amount} lastTransaction={highlightData.outcomes.lastTransaction}
                           type="down"/>
            <HighlightCard title="Total" amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} type="total"/>
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
        </>
      }
    </Container>
  )
}
