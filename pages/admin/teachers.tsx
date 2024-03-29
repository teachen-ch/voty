import { gql } from "@apollo/client";
import { LoggedInPage } from "../../components/Page";
import React, { ReactElement, useState } from "react";
import { useTeachersQuery, Role, TeachersQuery } from "graphql/types";
import { Box, Image } from "rebass";
import { Breadcrumb, A, Here } from "components/Breadcrumb";
import { ReadMore } from "components/ReadMore";

export const GET_TEACHERS = gql`
  query teachers($where: UserWhereInput) {
    users(where: $where, orderBy: { createdAt: desc }) {
      id
      name
      lastname
      shortname
      email
      emailVerified
      createdAt
      school {
        id
        name
        city
        zip
      }
      teaches {
        name
        id
      }
    }
  }
`;

export default function TeachersAdminPage(): ReactElement {
  const teachersQuery = useTeachersQuery({
    variables: { where: { role: { equals: Role.Teacher } } },
  });
  if (teachersQuery.loading) {
    return <LoggedInPage heading="Benutzer">Loading...</LoggedInPage>;
  }
  const teachers = teachersQuery.data?.users;
  return (
    <LoggedInPage heading="Lehrpersonen">
      <Breadcrumb>
        <A href="/admin">Admin</A>
        <Here>Lehrpersonen</Here>
      </Breadcrumb>
      <Export users={teachers} />
      <Teachers users={teachers} />
    </LoggedInPage>
  );
}

export function Teachers({
  users,
}: {
  users?: TeachersQuery["users"];
}): ReactElement | null {
  if (!users) return null;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Schulhaus</th>
          <th>Klassen</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td style={{ maxWidth: "200px" }}>
              <a href={`mailto:${user.email}`}>{user.shortname}</a>
            </td>
            <td style={{ maxWidth: "200px" }}>
              <A href={`/admin/schools#${user.school?.id}`}>
                {user.school?.name}
              </A>
            </td>
            <td style={{ maxWidth: "200px", whiteSpace: "break-spaces" }}>
              {user.teaches.map((team, i) => (
                <A key={team.id} href={`/team/${team.id}/admin`}>
                  {i > 0 ? ", " : ""}
                  {team.name}
                </A>
              ))}
            </td>
            <td>
              <Box variant="centered">
                {user.emailVerified ? (
                  <Image src="/images/icon_user_ok.svg" alt="Bestätigt" />
                ) : (
                  <Image
                    src="/images/icon_user_nok.svg"
                    alt="Nicht bestätigt"
                  />
                )}
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Export({
  users,
}: {
  users?: TeachersQuery["users"];
}): ReactElement | null {
  if (!users) return null;
  return (
    <ReadMore title="Emails exportieren" fontSize={1} bg="transparent">
      <Box fontSize={1} p={2} bg="#fff">
        <pre>
          {users.map((user) => (user.emailVerified ? user.email + "\n" : ""))}
        </pre>
      </Box>
    </ReadMore>
  );
}
