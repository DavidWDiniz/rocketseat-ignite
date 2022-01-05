import React, {useCallback, useState} from "react";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoaderContainer
} from "./styles";
import {HistoryCard} from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DataListProps} from "../Dashboard";
import {categories} from "../../utils/categories";
import {VictoryPie} from "victory-native";
import {RFValue} from "react-native-responsive-fontsize";
import {useTheme} from "styled-components/native";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {addMonths, format, subMonths} from "date-fns";
import {ptBR} from "date-fns/locale";
import {ActivityIndicator} from "react-native";
import {useFocusEffect} from "@react-navigation/native";

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  color: string;
  x: string;
  y: number;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const theme = useTheme();

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  function handleDateChange(action: "next" | "previous") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const outcomes: DataListProps[] = responseFormatted.filter((outcome: DataListProps) =>
      outcome.type === "negative" &&
      new Date(outcome.date).getMonth() === selectedDate.getMonth() &&
      new Date(outcome.date).getFullYear() === selectedDate.getFullYear()
    );

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
    setIsLoading(false);
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ?
        <LoaderContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoaderContainer> :
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("previous")}>
              <MonthSelectIcon name="chevron-left"/>
            </MonthSelectButton>
            <Month>{format(selectedDate, "MMMM, yyyy", {locale: ptBR})}</Month>
            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right"/>
            </MonthSelectButton>
          </MonthSelect>
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
      }
    </Container>
  )
}
