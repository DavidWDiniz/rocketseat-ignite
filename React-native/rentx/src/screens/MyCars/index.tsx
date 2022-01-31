import React, {useEffect, useState} from "react";
import {Container, Header, Title, Subtitle, Content, Appointments, AppointmentsTitle, AppointmentsQuantity} from "./styles";
import {CarDTO} from "../../dtos/CarDTO";
import api from "../../services/api";
import {FlatList, StatusBar} from "react-native";
import {BackButton} from "../../components/BackButton";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from "styled-components";
import {Car} from "../../components/Car";

interface CarProps {
  id: string,
  user_id: string,
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[]);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>
        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>
      </Header>
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Car data={item.car} />
          )}
        />
      </Content>
    </Container>
  );
}