import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const authLink = setContext((_, { headers = {} }) => {
  const token = localStorage.getItem("@token");
  headers["x-access-token"] = token;
  return { headers };
});
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  cache,
  link,
});
export default client;
