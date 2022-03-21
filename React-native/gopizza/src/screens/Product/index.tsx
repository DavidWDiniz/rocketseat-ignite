import React, {useState} from "react";
import { Container, DeleteLabel, Header, PickImageButton, Title, Upload } from "./styles";
import {Platform, TouchableOpacity} from "react-native";
import {ButtonBack} from "../../components/ButtonBack";
import {Photo} from "../../components/Photo";
import * as ImagePicker from 'expo-image-picker';

export function Product() {
  const [image, setImage] = useState("");

  async function handlePickImage() {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (result.cancelled === false) {
        setImage(result.uri);
      }
    }
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack />
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>
      <Upload>
        <Photo uri={image} />
        <PickImageButton
          title="Carregar"
          type="secondary"
          onPress={handlePickImage}
        />
      </Upload>
    </Container>
  );
}