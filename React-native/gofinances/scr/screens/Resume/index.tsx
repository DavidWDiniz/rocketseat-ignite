import React, {useEffect, useState} from "react";
import { Container, Header, Title, Content } from "./styles";
import {HistoryCard} from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DataListProps} from "../Dashboard";
import {categories} from "../../utils/categories";

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const outcomes: DataListProps[] = responseFormatted.filter((outcome: DataListProps) => outcome.type === "negative");

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      outcomes.forEach(outcome => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  )
}
