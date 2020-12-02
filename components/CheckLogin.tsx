import { gql } from "@apollo/client";
import { useUser, useSetUser } from "../state/user";
import { useState, useEffect } from "react";
import { useMeQuery } from "graphql/types";

CheckLogin.fragments = {
  LoginFields: gql`
    fragment LoginFields on User {
      id
      name
      lastname
      shortname
      gender
      year
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

export default function CheckLogin({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement | null {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const setUser = useSetUser();
  // check, whether there is already an active session
  // unless user is already set
  useMeQuery({
    fetchPolicy: "network-only",
    // skip query if user is already defined
    skip: user ? true : false,
    onCompleted: (data) => {
      setUser(data?.me); // could be undefined!
      setLoading(false);
    },
  });
  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  if (loading) {
    return null;
  } else {
    return <>{children}</>;
  }
}
