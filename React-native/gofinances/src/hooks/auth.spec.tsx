import {renderHook, act} from "@testing-library/react-hooks";
import {AuthProvider, useAuth} from "./auth";
import fetchMock from "jest-fetch-mock";
import {startAsync} from "expo-auth-session";
import mocked = jest.mocked;
import AsyncStorage from "@react-native-async-storage/async-storage";

fetchMock.enableMocks();

jest.mock("expo-auth-session");

describe("Auth Hook", () => {
  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it("should be able to signIn with google account", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      }
    });

    fetchMock.mockResponseOnce(JSON.stringify(
      {
        id: 'any_id',
        email: 'david@email.com',
        name: 'David',
        photo: 'any_photo.png'
      }
    ));

    const {result} = renderHook(() => useAuth(), {wrapper: AuthProvider});

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user.email).toBe('david@email.com');
  });

  it("should not be able to signIn with google account if authentication is cancelled", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "error",
    });

    const {result} = renderHook(() => useAuth(), {wrapper: AuthProvider});
    await act(() => result.current.signInWithGoogle());
    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be error with incorrect google parameters", async () => {
    const {result} = renderHook(() => useAuth(), {wrapper: AuthProvider});
    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});