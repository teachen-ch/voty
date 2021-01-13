import { Err, Loading, LoggedInPage } from "../../components/Page";
import { ReactElement, useState } from "react";
import {
  useAdminUsersQuery,
  useDeleteUserMutation,
  SortOrder,
  UserOrderByInput,
  Role,
} from "graphql/types";
import { gql } from "@apollo/client";
import { OneRowTable, Table, TD, TDImage, TR } from "components/Table";
import { Input } from "@rebass/forms";
import { debounce } from "lodash";
import { Select } from "@rebass/forms";
import { Button } from "rebass";

export const GET_ADMIN_USERS = gql`
  query adminUsers(
    $where: UserWhereInput
    $orderBy: [UserOrderByInput!]
    $first: Int
  ) {
    users(where: $where, orderBy: $orderBy, first: $first) {
      id
      shortname
      name
      gender
      year
      lastname
      createdAt
      email
      emailVerified
      role
      school {
        id
        name
        zip
        city
      }
      teaches {
        id
        name
      }
      team {
        id
        name
      }
    }
  }
`;

export default function UsersPage(): ReactElement {
  const [filter, setFilter] = useState("");
  const [role, setRole] = useState<Role | undefined>();

  return (
    <LoggedInPage heading="Benutzer">
      <Input
        onChange={debounce((evt) => setFilter(evt.target.value), 300)}
        placeholder="Email..."
      />
      <Select
        onChange={(e) =>
          setRole(Role[e.currentTarget.value as keyof typeof Role])
        }
        mb={4}
      >
        <option value={""}>-- Alle Rollen --</option>
        <option value={Role.Teacher}>Lehrperson</option>
        <option value={Role.Student}>Schüler*in</option>
        <option value={Role.Principal}>Schulleiter*in</option>
        <option value={Role.Admin}>Admin</option>
      </Select>

      <UserAdminList
        orderBy={{ email: SortOrder.Desc }}
        filter={filter}
        role={role}
      />
    </LoggedInPage>
  );
}

const UserAdminList: React.FC<{
  orderBy: UserOrderByInput;
  filter: string;
  role?: Role;
}> = ({ orderBy, filter, role }) => {
  const [selected, setSelected] = useState("");
  const usersQuery = useAdminUsersQuery({
    variables: {
      orderBy: [orderBy],
      where: {
        email: { contains: filter },
        role: role ? { equals: role } : undefined,
      },
    },
  });
  const users = usersQuery.data?.users;
  const [doDeleteUser] = useDeleteUserMutation();

  if (usersQuery.loading) return <Loading />;
  if (usersQuery.error) return <Err msg={usersQuery.error.message} />;
  if (users?.length === 0) return <OneRowTable text="Nichts gefunden" />;

  async function deleteUser(id: string) {
    const confirmed = confirm("Sicher?");
    if (!confirmed) return;
    await doDeleteUser({ variables: { where: { id } } });
    await usersQuery.refetch();
  }

  return (
    <Table>
      {users?.map((user) => (
        <>
          <TR
            key={user.id}
            onClick={() => setSelected(user.id)}
            bg={selected === user.id ? "primary" : "inherit"}
          >
            <TD width="300px">{user.email}</TD>
            <TD width="100px">{user.role}</TD>
            <TD width="400px">
              {user.team?.name ||
                user.teaches?.map((team) => team.name).join(", ")}
              &nbsp;({user.school?.name || "???"})
            </TD>
            <TDImage
              src={`/images/icon_user_${user.emailVerified ? "ok" : "nok"}.svg`}
            />
          </TR>
          {selected === user.id && (
            <TR bg="primary" height="80px">
              <TD fontSize={[1, 1, 1]}>
                {user.school?.zip}{" "}
                {user.school?.city || "Keine Schule angegeben"}
                <br />
                {user.gender || "Unbekannt"} / {user.year || "Unbekannt"}
              </TD>
              <TD>
                <Button
                  onClick={() => deleteUser(user.id)}
                  bg="gray"
                  sx={{ ":hover": { bg: "danger" } }}
                >
                  Löschen
                </Button>
              </TD>
            </TR>
          )}
        </>
      ))}
    </Table>
  );
};
