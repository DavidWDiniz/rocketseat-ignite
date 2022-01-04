import styled, {css} from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";

export const Container = styled.View`
  ${({theme}) => css`
    flex: 1;
    background-color: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  ${({theme}) => css`
    background-color: ${theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 19px;
  `}
`;

export const Title = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(18)}px;
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {padding: 24, flex: 1}
})``;