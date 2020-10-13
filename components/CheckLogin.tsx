import { gql } from "@apollo/client";
import { useUser, useSetUser } from "../state/user";
import { Dispatch, SetStateAction, ReactElement, useEffect } from "react";
import { useMeQuery } from "graphql/types";

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
  query me {
    me {
      ...LoginFields
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

type CheckLoginProps = {
  setLoading?: Dispatch<SetStateAction<boolean>>;
};
export default function CheckLogin({
  setLoading,
}: CheckLoginProps): ReactElement | null {
  const user = useUser();
  const setUser = useSetUser();
  // check, whether there is already an active session
  // unless user is already set
  useMeQuery({
    fetchPolicy: "network-only",
    // skip query if user is already defined
    skip: user ? true : false,
    onCompleted: (data) => {
      if (setLoading) setLoading(false);
      setUser(data?.me); // could be undefined!
    },
  });
  useEffect(() => {
    // if we skip above query, because user is already loaded
    if (user && setLoading) setLoading(false);
  }, [user]);

  // if (checkLogin) return <Heading as="h2">Einen kurzen Moment…</Heading>;
  return null;
}
