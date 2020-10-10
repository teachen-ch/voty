import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "/api/graphql",
});

// TODO: this should take a properly typed prevContext as 2nd param!
const authLink = setContext((_, { headers = {} }) => {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("@token");
    // eslint-disable-next-line
    headers["x-access-token"] = token;
  }
  // eslint-disable-next-line
  return { headers };
});
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  cache,
  link,
});
export default client;
