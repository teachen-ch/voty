import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { LoginFieldsFragment } from "graphql/types";
import { trackVisit } from "util/stats";

export type SessionUser = LoginFieldsFragment | undefined | null;

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
    if (token) {
      localStorage.setItem("@token", token);
    } else {
      localStorage.removeItem("@token");
    }
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
    if (user) {
      trackVisit(user);
    }
  };
}
