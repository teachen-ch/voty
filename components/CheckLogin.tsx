import { gql, useQuery } from "@apollo/client";
import { useUser, useSetUser } from "../state/user";
import { Heading } from "rebass";
import { Dispatch, SetStateAction } from "react";

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

type CheckLoginProps = {
  setLoading?: Dispatch<SetStateAction<boolean>>;
};
export default function CheckLogin({ setLoading }: CheckLoginProps) {
  const user = useUser();
  const setUser = useSetUser();
  // check, whether there is already an active session
  // unless user is already set
  const { loading: checkLogin } = useQuery(ME, {
    fetchPolicy: "network-only",
    skip: user ? true : false,
    onCompleted: (data) => {
      if (setLoading) setLoading(false);
      if (data) {
        setUser(data.me);
      } else {
        setUser(undefined);
      }
    },
  });

  // if (checkLogin) return <Heading as="h2">Einen kurzen Moment…</Heading>;
  return null;
}
