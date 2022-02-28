import React from "react";
import {render} from "@testing-library/react-native";
import {Input} from "./index";
import {ThemeProvider} from "styled-components/native";
import theme from "../../../global/styles/theme";

const Providers: React.FC = ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe("Input component", () => {
  it("should have specific text color", () => {
    const {getByTestId} = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
      />,
      {
        wrapper: Providers
      }
    );
    const inputComponent = getByTestId("input-email");
    expect(inputComponent.props.style[0].color).toEqual(theme.colors.text_dark);
    expect(inputComponent.props.style[0].fontFamily).toEqual(theme.fonts.regular);
  });
});