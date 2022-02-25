import {renderHook, act} from "@testing-library/react-hooks";
import {AuthProvider, useAuth} from "./auth";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("expo-auth-session", () => {
  return {
    startAsync: () => ({
      type: "success",
      params: {
        access_token: "any_token",
      }
    })
  }
});


describe("Auth Hook", () => {
  it("should be able to signIn with google account", async () => {
    const {result} = renderHook(() => useAuth(), {wrapper: AuthProvider});
    fetchMock.mockResponseOnce(JSON.stringify(
      {
        id: 'any_id',
        email: 'david@email.com',
        name: 'David',
        photo: 'any_photo.png'
      }
    ));
    await act(() => result.current.signInWithGoogle());
    expect(result.current.user.email).toBe('david@email.com');
  });
});