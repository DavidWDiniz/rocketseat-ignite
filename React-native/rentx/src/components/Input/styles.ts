import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View`
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${({theme}) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
  padding: 0 23px;
`;