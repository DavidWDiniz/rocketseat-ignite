import styled, {css} from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";
import {BorderlessButton} from "react-native-gesture-handler";
import {Feather} from "@expo/vector-icons";

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

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)`

`;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(20)}px;
  `}
`;

export const LoaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
