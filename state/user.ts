import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  LoginFieldsFragment,
  TeamUserFieldsFragment,
  useTeamUserQuery,
} from "graphql/types";
import { trackVisit } from "util/stats";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type SessionUser = LoginFieldsFragment | undefined | null;
export type SessionTeam = TeamUserFieldsFragment | undefined | null;

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

  useEffect(() => {
    // TODO: we seem to requery this way too often.
    void teamQuery.refetch();
  }, [user]);
  return teamQuery.data?.team;
}
