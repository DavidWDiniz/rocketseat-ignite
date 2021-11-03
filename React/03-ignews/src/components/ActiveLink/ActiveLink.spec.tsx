import {render, screen} from "@testing-library/react";
import {ActiveLink} from "./index";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

describe("ActiveLink component", () => {
  it("should renders correctly", () => {
    render(
      <ActiveLink activeClassName="" href="/">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText("Home")).toBeInTheDocument()
  })

  it("should adds active class if the link is currently active", () => {
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText("Home")).toHaveClass("active")
  })
})
