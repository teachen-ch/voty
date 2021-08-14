import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export function authHeaders(
  headers: Record<string, any> = {}
): Record<string, any> {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("@token");
    headers["x-access-token"] = token;
  }
  return headers;
}

type ApolloClientOptions = {
  locale?: string;
};

export default function clientGenerator(
  opts: ApolloClientOptions
): ApolloClient<NormalizedCacheObject> {
  const cache = new InMemoryCache();
  const httpLink = createHttpLink({
    uri: "/api/graphql",
  });

  // TODO: this should take a properly typed prevContext as 2nd param!
  const authLink = setContext((_, { headers = {} }) => {
    headers = authHeaders(headers);
    headers["Accept-Language"] = opts.locale;
    // eslint-disable-next-line
    return { headers };
  });
  const link = authLink.concat(httpLink);
  return new ApolloClient({
    cache,
    link,
  });
}
