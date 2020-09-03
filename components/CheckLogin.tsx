import { gql, useQuery } from "@apollo/client";
import { useUser, useSetUser } from "../state/user";
import { Heading } from "rebass";

export const ME = gql`
  query {
    me {
      id
      name
      lastname
      email
      role
    }
  }
`;

export default function CheckLogin() {
  const user = useUser();
  const setUser = useSetUser();
  // check, whether there is already an active session
  // unless user is already set
  const { loading: checkLogin } = useQuery(ME, {
    fetchPolicy: "network-only",
    skip: user ? true : false,
    onCompleted: (data) => {
      if (data) {
        setUser(data.me);
      } else {
        setUser(undefined);
      }
    },
  });

  if (checkLogin) return <Heading as="h2">Einen kurzen Moment…</Heading>;
  return null;
}
