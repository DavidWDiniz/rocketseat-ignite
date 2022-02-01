import React from "react";
import {Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage} from "./styles";
import {FlatList} from "react-native";

interface ImageSliderProps {
  imageUrl: string[];
}

export function ImageSlider({imageUrl}: ImageSliderProps) {
  return (
    <Container>
      <ImageIndexes>
        {
          imageUrl.map((_, index) => (
            <ImageIndex
              key={String(index)}
              active={true}
            />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imageUrl}
        keyExtractor={key => key}
        renderItem={({item}) => (
          <CarImageWrapper>
            <CarImage
              source={{uri: item}}
              resizeMode="contain"
            />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

    </Container>
  );
}