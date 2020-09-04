import { gql, useQuery } from "@apollo/client";
import { useUser, useSetUser } from "../state/user";
import { Heading } from "rebass";

CheckLogin.fragments = {
  LoginFields: gql`
    fragment LoginFields on User {
      id
      name
      lastname
      shortname
      role
      email
      school {
        id
        name
        city
      }
      team {
        id
        name
        teacher {
          id
          name
          shortname
        }
      }
    }
  `,
};

export const ME = gql`
  query {
    me {
      ...LoginFields
    }
  }
  ${CheckLogin.fragments.LoginFields}
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
