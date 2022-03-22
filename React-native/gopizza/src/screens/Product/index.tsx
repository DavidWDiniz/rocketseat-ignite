import React, {useState} from "react";
import { Container, DeleteLabel, Header, PickImageButton, Title, Upload, Label, Form, InputGroupHeader, InputGroup, MaxCharacters } from "./styles";
import {Alert, Platform, ScrollView, TouchableOpacity} from "react-native";
import {ButtonBack} from "../../components/ButtonBack";
import {Photo} from "../../components/Photo";
import * as ImagePicker from 'expo-image-picker';
import {InputPrice} from "../../components/InputPrice";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export function Product() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceP, setPriceP] = useState("");
  const [priceM, setPriceM] = useState("");
  const [priceG, setPriceG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleAdd() {
    if(!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza.");
    }
    if(!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza..");
    }
    if(!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza.");
    }
    if(!priceP || !priceM || !priceG) {
      return Alert.alert("Cadastro", "Informe o preço de todos os tamanhos da pizza.");
    }

    setIsLoading(true);
    const filename = new Date().getTime();
    const reference = storage().ref(`/pizzas/${filename}.png`);

    await reference.putFile(image);
    const photoUrl = await reference.getDownloadURL();
    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        price_sizes: {
          p: priceP,
          m: priceM,
          g: priceG
        },
        photoUrl,
        photo_path: reference.fullPath
      })
      .then(() => Alert.alert("Cadastro", "Pizza cadastrada com sucesso."))
      .catch(() => Alert.alert("Cadastro", "Não foi possível cadastrar a pizza."));

    setIsLoading(false)
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
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
        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              onChangeText={setName}
              value={name}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{height: 80}}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice
              size="P"
              onChangeText={setPriceP}
              value={priceP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceM}
              value={priceM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceG}
              value={priceG}
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}