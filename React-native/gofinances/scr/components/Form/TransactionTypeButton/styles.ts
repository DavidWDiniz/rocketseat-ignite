import styled, {css} from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import {RFValue} from "react-native-responsive-fontsize";

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

export const Container = styled.TouchableOpacity<ContainerProps>`
  ${({theme, isActive, type}) => css`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: ${isActive ? 0 : 1.5}px;
    border-style: solid;
    border-color: ${theme.colors.text_light};
    border-radius: 5px;
    padding: 16px;
    background-color: ${isActive ? color[type] : theme.colors.background};
  `}
  
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