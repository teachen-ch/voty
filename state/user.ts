import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

type User = {
  id: number;
  email?: number;
  name: string;
  lastname?: string;
  shortname: string;
  role: string;
  team?: Team;
  school?: School;
};

type Team = {
  id: number;
  name: string;
};

type School = {
  id: number;
  name: string;
  city?: string;
  zip?: string;
};

export const userState = atom({
  key: "userState",
  default: undefined as User,
});

export function useAccessToken() {
  return useRecoilValue(accessTokenState);
}

export function useSetAccessToken() {
  const setState = useSetRecoilState(accessTokenState);
  return (token) => {
    localStorage.setItem("@token", token);
    setState(token);
  };
}

export function useUser() {
  return useRecoilValue(userState);
}

export function useSetUser() {
  const setState = useSetRecoilState(userState);
  return (user) => {
    setState(user);
  };
}
