import React from "react";
import { Container } from "./styles";
import {Input} from "../Input";
import {TextInputProps} from "react-native";
import {Control, Controller} from "react-hook-form";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({control, name, ...rest}: InputFormProps) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
    </Container>
  )
}
