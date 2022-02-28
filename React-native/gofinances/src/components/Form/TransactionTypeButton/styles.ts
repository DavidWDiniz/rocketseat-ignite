import styled, {css} from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import {RFValue} from "react-native-responsive-fontsize";
import {RectButton} from "react-native-gesture-handler";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

const color = {
  up: css`
    ${({theme}) => theme.colors.success_light};
  `,
  down: css`
    ${({theme}) => theme.colors.attention_light};
  `,
}

export const Container = styled.View<ContainerProps>`
  ${({theme, isActive, type}) => css`
    width: 48%;
    border-width: 1.5px;
    border-style: solid;
    border-color: ${isActive ? theme.colors.background : theme.colors.text_light};
    border-radius: 5px;
    background-color: ${isActive ? color[type] : theme.colors.background};
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  ${({theme, type}) => css`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${type === "up" ? theme.colors.success : theme.colors.attention};
  `}
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.regular};
  `}
`;