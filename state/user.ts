import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

// redefining types here, because @prisma/client just has schoolId

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
  school?: School;
};

type School = {
  id: number;
  name: string;
  city?: string;
  zip?: string;
};

export const userState = atom({
  key: "userState",
  default: undefined as User | undefined,
});

export function useAccessToken() {
  return useRecoilValue(accessTokenState);
}

export function useSetAccessToken() {
  const setState = useSetRecoilState(accessTokenState);
  return (token: string) => {
    localStorage.setItem("@token", token);
    setState(token);
  };
}

export function useUser() {
  return useRecoilValue(userState);
}

export function useSetUser() {
  const setState = useSetRecoilState(userState);
  return (user: User | undefined) => {
    setState(user);
  };
}
