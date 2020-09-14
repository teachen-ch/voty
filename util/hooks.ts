import { useRouter } from "next/router";

export function useQueryParam(name: string): string | undefined {
  const query = useRouter().query;
  if (query[name]) {
    return String(query[name]);
  } else return undefined;
}
