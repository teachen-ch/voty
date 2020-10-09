import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { MeQuery } from "graphql/types";

export type SessionUser = MeQuery["me"];

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const userState = atom({
  key: "userState",
  default: undefined as SessionUser | undefined,
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

export function useUser(): SessionUser | undefined {
  return useRecoilValue(userState);
}

export function useSetUser(): (user: SessionUser | undefined) => void {
  const setState = useSetRecoilState(userState);
  return (user: SessionUser | undefined) => {
    setState(user);
  };
}
