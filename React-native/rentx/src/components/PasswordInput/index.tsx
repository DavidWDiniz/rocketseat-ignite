import React, {useState} from "react";
import {Container , IconContainer, InputText} from "./styles";
import {Feather} from "@expo/vector-icons";
import {useTheme} from "styled-components";
import { TextInputProps } from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({iconName, ...rest}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text}
        />
      </IconContainer>
      <InputText
        {...rest}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableWithoutFeedback
        onPress={handlePasswordVisibilityChange}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text}
          />
        </IconContainer>
      </TouchableWithoutFeedback>
    </Container>
  )
}