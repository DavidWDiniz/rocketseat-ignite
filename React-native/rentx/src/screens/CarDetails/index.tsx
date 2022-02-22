import React, {useEffect, useState} from "react";
import {
  Container,
  Header,
  Details,
  Description,
  Branding,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
  CarImages,
  OfflineInfo
} from "./styles";
import {BackButton} from "../../components/BackButton";
import {ImageSlider} from "../../components/ImageSlider";
import {Accessory} from "../../components/Accessory";
import {Button} from "../../components/Button";
import {useNavigation, useRoute} from "@react-navigation/native";
import {CarDTO} from "../../dtos/CarDTO";
import {getAccessoryIcon} from "../../utils/getAccessoryIcon";
import {StatusBar, StyleSheet} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {useTheme} from "styled-components";
import {Car as ModelCar} from "../../database/model/Car";
import api from "../../services/api";
import {useNetInfo} from "@react-native-community/netinfo";

interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;
  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const ScrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 85], Extrapolate.CLAMP)
    }
  });

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })

  function handleConfirmRental() {
    navigation.navigate("Scheduling", {car});
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Header>
          <BackButton onPress={handleBack}/>
        </Header>
        <CarImages>
          <Animated.View
            style={sliderCarStyleAnimation}
          >
            <ImageSlider imageUrl={
              !!carUpdated.photos ?
                carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]
            }/>
          </Animated.View>
        </CarImages>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: "center"
        }}
        showsVerticalScrollIndicator={false}
        onScroll={ScrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Branding>{car.brand}</Branding>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : "..."}</Price>
          </Rent>
        </Details>

        {<Accessories>
          {
            carUpdated.accessories &&
            carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>}

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false &&
          <OfflineInfo>
              Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        }
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1
  },
});