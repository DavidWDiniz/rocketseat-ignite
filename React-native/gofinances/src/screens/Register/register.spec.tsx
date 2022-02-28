import React from "react";
import {fireEvent, render} from "@testing-library/react-native";
import {Register} from "./index";
import {ThemeProvider} from "styled-components/native";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe("Register", () => {
  it("should open category modal when user clicks on category button ", () => {
    const {getByTestId} = render(<Register />, {wrapper: Providers});
    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);
    expect(categoryModal.props.visible).toBe(true);
  });
});