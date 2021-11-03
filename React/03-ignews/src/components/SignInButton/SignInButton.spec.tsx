import {render, screen} from "@testing-library/react";
import {SignInButton} from "./index";
import {useSession} from "next-auth/client";
import {mocked} from "ts-jest/utils";

jest.mock("next-auth/client")

describe("SignInButton component", () => {
  it("should renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    render(
      <SignInButton/>
    )

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument()
  })

  it("should renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      {user: {name: "John Doe", email: "johndoe@example.com", image: "fakeImgURL"}, expires: "fake-data"},
      false
    ])
    render(
      <SignInButton/>
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })
})
