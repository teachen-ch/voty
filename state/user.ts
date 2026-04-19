import { atom, useAtomValue, useSetAtom } from "jotai";
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

const accessTokenState = atom<string>("");

const userState = atom<SessionUser | undefined>(undefined);

export function useAccessToken(): string {
  return useAtomValue(accessTokenState);
}

export function useSetAccessToken(): (token: string) => void {
  const setState = useSetAtom(accessTokenState);
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
  return useAtomValue(userState);
}

export function useSetUser(): (user: SessionUser) => void {
  const setState = useSetAtom(userState);
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
