import React, {useState} from "react";
import {Container, Form, FormTitle, Header, Steps, Subtitle, Title} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {BackButton} from "../../../components/BackButton";
import {Bullet} from "../../../components/Bullet";
import {Input} from "../../../components/Input";
import {Button} from "../../../components/Button";
import {Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from "react-native";
import * as Yup from "yup";

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH obrigatória"),
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido."),
      });
      const data = {name, email, driverLicense};
      await schema.validate(data);
      navigation.navigate("SignUpSecondStep", {user: data});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa!", error.message);
      } else {
        Alert.alert("Erro no cadastro!", "Ocorreu um erro ao fazer o cadastro, tente novamente!");
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua{'\n'}
            conta.
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </Subtitle>
          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>
          <Button
            title="Próximo"
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}