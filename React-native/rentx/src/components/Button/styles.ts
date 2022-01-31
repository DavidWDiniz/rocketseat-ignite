import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {RectButton} from "react-native-gesture-handler";

interface ButtonProps {
  color?: string;
  enabled?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  opacity: ${({enabled}) => enabled ? 1 : 0.5};
  background-color:  ${({color, theme}) => color ? color : theme.colors.main};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size ${RFValue(15)}px;
  color:  ${({theme}) => theme.colors.background_secondary};
`;
