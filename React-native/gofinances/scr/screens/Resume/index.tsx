import React, {useEffect, useState} from "react";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import {HistoryCard} from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DataListProps} from "../Dashboard";
import {categories} from "../../utils/categories";
import {VictoryPie} from "victory-native";
import {RFValue} from "react-native-responsive-fontsize";
import {useTheme} from "styled-components/native";

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  color: string;
  x: string;
  y: number;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const theme = useTheme();
  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const outcomes: DataListProps[] = responseFormatted.filter((outcome: DataListProps) => outcome.type === "negative");

    const outcomesTotal = outcomes.reduce((acc: number, outcome) => {
      return acc + Number(outcome.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      outcomes.forEach(outcome => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount);
        }
      });

      const percent = `${(categorySum / outcomesTotal * 100).toFixed(0)}%`;

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormatted,
          color: category.color,
          x: percent,
          y: categorySum
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
          />
        </ChartContainer>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  )
}
