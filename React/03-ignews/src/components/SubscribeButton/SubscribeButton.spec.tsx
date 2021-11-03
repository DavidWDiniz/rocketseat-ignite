import {fireEvent, render, screen} from "@testing-library/react";
import {signIn, useSession} from "next-auth/client";
import {mocked} from "ts-jest/utils";
import {SubscribeButton} from "./index";
import {useRouter} from "next/router"

jest.mock("next-auth/client")
jest.mock("next/router")

describe("SubscribeButton component", () => {
  it("should renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton/>
    )

    expect(screen.getByText("Subscribe now")).toBeInTheDocument()
  })

  it("should redirect user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton/>
    )

    const subscribeButton = screen.getByText("Subscribe now")
    fireEvent.click(subscribeButton)
    expect(signInMocked).toHaveBeenCalled()
  })

  it("should redirects to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "johndoe@example.com",
          image: "fakeImgURL"
        },
        expires: "fake-data",
        activeSubscription: "fake-active-subscription"
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)
    render(
      <SubscribeButton/>
    )
    const subscribeButton = screen.getByText("Subscribe now")
    fireEvent.click(subscribeButton)
    expect(pushMock).toHaveBeenCalledWith("/posts")
  });
})
