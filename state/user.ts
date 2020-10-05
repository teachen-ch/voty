import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "graphql/types";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const userState = atom({
  key: "userState",
  default: undefined as User | undefined,
});

export function useAccessToken(): string {
  return useRecoilValue(accessTokenState);
}

export function useSetAccessToken(): (token: string) => void {
  const setState = useSetRecoilState(accessTokenState);
  return (token: string) => {
    localStorage.setItem("@token", token);
    setState(token);
  };
}

export function useUser(): User | undefined {
  return useRecoilValue(userState);
}

export function useSetUser(): (user: User | undefined) => void {
  const setState = useSetRecoilState(userState);
  return (user: User | undefined) => {
    setState(user);
  };
}
