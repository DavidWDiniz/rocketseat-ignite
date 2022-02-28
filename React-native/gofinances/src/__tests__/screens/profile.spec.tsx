import React from "react";
import {render} from "@testing-library/react-native";
import {Profile} from "../../screens/Profile";

describe("Profile screen", () => {
  it("should check if show correctly user input name placeholder", () => {
    const {getByPlaceholderText} = render(<Profile />);
    const inputName = getByPlaceholderText("Nome");
    expect(inputName).toBeTruthy();
  });

  it("should checks if user data has been loaded", () => {
    const {getByTestId} = render(<Profile />);
    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");
    expect(inputName.props.value).toEqual("David");
    expect(inputSurname.props.value).toEqual("Diniz");
  });

  it("should checks if title renders correctly", () => {
    const {getByTestId} = render(<Profile />);
    const textTitle = getByTestId("text-title");
    expect(textTitle.props.children).toContain("Perfil");
  });
})