import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  LoginFieldsFragment,
  TeamAnonFieldsFragment,
  TeamUserFieldsFragment,
  useTeamAnonQuery,
  useTeamUserQuery,
} from "graphql/types";
import { trackVisit } from "util/stats";
import { useRouter } from "next/router";

export type SessionUser = LoginFieldsFragment | undefined | null;
export type SessionTeam = TeamUserFieldsFragment | undefined | null;
export type AnonTeam = TeamAnonFieldsFragment | undefined | null;

const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

const userState = atom({
  key: "user",
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

export function useUser(): SessionUser {
  return useRecoilValue(userState);
}

export function useSetUser(): (user: SessionUser) => void {
  const setState = useSetRecoilState(userState);
  return (user: SessionUser | undefined) => {
    setState(user);
    if (user) {
      trackVisit(user);
    }
  };
}

export function useTeam(): SessionTeam | undefined | null {
  const router = useRouter();
  const user = useUser();
  const id = user?.team?.id || String(router.query.team);
  const teamQuery = useTeamUserQuery({
    variables: { where: { id } },
    skip: !user,
  });

  return teamQuery.data?.team;
}

export function useTeamAnon(): AnonTeam | undefined | null {
  const router = useRouter();
  const user = useUser();
  const id = user?.team?.id || String(router.query.team);
  const teamQuery = useTeamAnonQuery({
    variables: { where: { id } },
  });

  return teamQuery.data?.team;
}
