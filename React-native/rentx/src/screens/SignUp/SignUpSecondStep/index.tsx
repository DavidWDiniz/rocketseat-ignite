import React, {useState} from "react";
import {Container, Form, FormTitle, Header, Steps, Subtitle, Title} from "./styles";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BackButton} from "../../../components/BackButton";
import {Bullet} from "../../../components/Bullet";
import {Button} from "../../../components/Button";
import {Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback} from "react-native";
import {PasswordInput} from "../../../components/PasswordInput";
import {useTheme} from "styled-components";
import * as Yup from "yup";
import api from "../../../services/api";

interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {user} = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "As senhas não são iguais."),
        password: Yup.string().required("Senha obrigatória"),
      });
      await schema.validate({password, passwordConfirm});

      await api.post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
      }).then(() => {
        navigation.navigate("Confirmation", {
          title: "Conta criada",
          message: `Agora é só fazer login\ne aproveitar`,
          nextScreenRoute: "SignIn",
        });
      }).catch(() => {
        Alert.alert("Opa!", "Não foi possível cadastrar.");
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa!", error.message);
      } else {
        Alert.alert("Erro na senha!", "Ocorreu um erro ao criar a senha. Tente novamente.");
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
              <Bullet />
              <Bullet active />
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}