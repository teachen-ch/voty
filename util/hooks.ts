import { QueryResult } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isBrowser } from "util/isBrowser";

export function useQueryParam(name: string): string | undefined {
  const query = useRouter().query;
  if (query[name]) {
    return String(query[name]);
  } else return undefined;
}

const POLLING_DELAY = Number(process.env.POLLING_DELAY) || 5000;

export function usePolling(query: QueryResult): void {
  useEffect(() => {
    query.startPolling(POLLING_DELAY);
    return () => {
      query.stopPolling();
    };
  }, []);
}

export function useNavHash(
  page: string,
  init?: string
): [string, (s: string) => void] {
  let initialHash = init || "#";
  if (isBrowser()) {
    if (window.location.hash) initialHash = window.location.hash;
  }
  const [navHash, setStateHash] = useState<string>(initialHash);
  const router = useRouter();

  useEffect(() => {
    function hashChangeStart(url: string) {
      if (url.indexOf("#") >= 0) {
        const newHash = url.substring(url.indexOf("#"));
        setStateHash(newHash);
      } else {
        setStateHash("#");
      }
    }
    router.events.on("hashChangeStart", hashChangeStart);
    return () => {
      router.events.off("hashChangeStart", hashChangeStart);
    };
  }, []);
  async function setNavHash(newHash: string) {
    if (navHash !== newHash) {
      const path = window.location.pathname + newHash;
      await router.push(page, path);
    }
  }
  return [navHash, setNavHash];
}

export const useTheme = (whichTheme?: string) => {
  const [theme, setTheme] = useState("voty");
  useEffect(() => {
    if (window.origin.indexOf("aula") >= 0) setTheme("aula");
  }, []);
  if (whichTheme) return theme === whichTheme;
  else return theme;
};
