import { gql } from "@apollo/client";
import { useUser, useSetUser } from "../state/user";
import { Flex, Text, Button, Box } from "rebass";
import omit from "lodash/omit";
import { Grid } from "theme-ui";
import { QForm, ErrorBox } from "./Form";
import { ShowField } from "./Users";
import { cantonCodes } from "../util/cantons";
import { useState, ReactElement } from "react";
import { School } from "@prisma/client";
import { Loading } from "components/Page";
import {
  useSchoolsWithMembersQuery,
  useSetSchoolMutation,
  useSchoolsQuery,
  useCreateOneSchoolMutation,
  SchoolsDocument,
} from "graphql/types";

const SchoolFields = gql`
  fragment SchoolFields on School {
    id
    name
    type
    city
    zip
    canton
  }
`;

export const GET_SCHOOLS_WITH_MEMBERS = gql`
  query schoolsWithMembers {
    schools {
      ...SchoolFields
      members {
        id
        name
        lastname
      }
    }
  }
  ${SchoolFields}
`;

export const Schools: React.FC<React.PropsWithChildren<unknown>> = () => {
  const schoolsQuery = useSchoolsWithMembersQuery();
  const schools = schoolsQuery.data?.schools;

  if (schoolsQuery.error) {
    return <Text>Error loading data: {schoolsQuery.error.message}</Text>;
  }
  if (schoolsQuery.loading) {
    return <Loading />;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Schule</th>
            <th>Stadt</th>
            <th>SuS</th>
          </tr>
        </thead>

        <tbody>
          {schools?.map((school) => (
            <tr key={school.id} id={school.id}>
              <td>{school.name}</td>
              <td>{school.city}</td>
              <td>{school.members ? school.members.length : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const SET_USER_SCHOOL = gql`
  mutation setSchool($school: String!) {
    setSchool(school: $school) {
      id
      name
      shortname
      role
      email
      lastname
      school {
        id
        name
        type
        city
        zip
      }
    }
  }
`;

export const GET_SCHOOL_LIST = gql`
  query schools {
    schools {
      ...SchoolFields
    }
  }
  ${SchoolFields}
`;

export const SelectSchool: React.FC<React.PropsWithChildren<unknown>> = () => {
  const user = useUser();
  const setUser = useSetUser();
  const [edit, setEdit] = useState(false);
  const schoolsQuery = useSchoolsQuery();
  const schools = schoolsQuery.data?.schools;
  const [create, setCreate] = useState(false);
  const [setUserSchool] = useSetSchoolMutation({
    onCompleted(data) {
      setUser(data.setSchool);
      setEdit(false);
    },
  });

  if (!user) return null;

  if (user.school && !edit) {
    return (
      <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
        <ShowField
          label="Schule"
          value={`${user.school.name}, ${user.school.city}`}
        />
        <Button onClick={() => setEdit(true)} sx={{ gridColumn: [0, 0, 2] }}>
          Andere Schule auswählen
        </Button>
      </Grid>
    );
  }
  if (!schools) {
    return <Loading />;
  }

  const options = schools?.reduce(
    (o, i) => {
      const label = `${i.zip} ${i.city} - ${i.name}`;
      o[i.id] = label;
      return o;
    },
    { null: "Bitte wählen" } as Record<string, any>
  );
  return (
    <>
      {create ? (
        <CreateSchool
          onCancel={() => setCreate(false)}
          onCompleted={({
            createOneSchool,
          }: {
            createOneSchool: ResultSchool;
          }) => {
            setCreate(false);
            setEdit(false);
            void setUserSchool({
              variables: { school: createOneSchool.id },
            });
          }}
        />
      ) : (
        <Box>
          <QForm
            fields={{
              school: {
                type: "select",
                label: "Schule",
                init: user?.school?.id,
                required: true,
                options,
              },
              submit: {
                type: "submit",
                label: "Bestätigen",
              },
            }}
            mutation={setUserSchool}
            onSubmit={(values) =>
              setUserSchool({ variables: { school: String(values.school) } })
            }
          >
            <Flex sx={{ gridColumn: [0, 0, 2] }} justifyContent="space-between">
              <Button onClick={() => setEdit(false)} variant="text">
                Abbrechen
              </Button>
              <Button
                onClick={() => setCreate(true)}
                variant="text"
                width="200%"
              >
                Neue Schule erfassen
              </Button>
            </Flex>
          </QForm>
        </Box>
      )}
    </>
  );
};

export const CREATE_SCHOOL = gql`
  mutation createOneSchool($data: SchoolCreateInput!) {
    createOneSchool(data: $data) {
      id
      name
      address
      zip
      city
      canton
    }
  }
`;

type ResultSchool = Pick<School, "id" | "name" | "city" | "zip" | "canton">;

export function CreateSchool({
  onCompleted,
  onCancel,
}: {
  onCompleted: ({ createOneSchool }: { createOneSchool: ResultSchool }) => void;
  onCancel: () => void;
}): ReactElement {
  const [error, setError] = useState("");
  const [createSchool] = useCreateOneSchoolMutation({
    // @ts-ignore
    onCompleted: onCompleted,
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, result) => {
      cache.modify({
        fields: {
          schools(existingSchools: typeof SchoolsDocument[] = []) {
            const newSchoolRef = cache.writeFragment({
              data: result.data?.createOneSchool,
              fragment: gql`
                fragment NewSchool on School {
                  name
                  address
                  zip
                  city
                  canton
                }
              `,
            });
            return [...existingSchools, newSchoolRef];
          },
        },
      });
    },
  });
  return (
    <Box>
      <QForm
        fields={{
          name: {
            label: "Schule",
            required: true,
          },
          type: {
            type: "select",
            label: "Schultyp",
            required: true,
            options: {
              "": "Bitte wählen",
              "Sekundarstufe I": "Sekundarstufe I",
              Gymnasium: "Gymnasium",
              Gewerbeschule: "Gewerbeschule",
              Mittelschule: "Fachmittelschule",
              Anderer: "Anderer",
            },
          },
          address: {
            label: "Adresse",
          },
          zip: {
            label: "PLZ",
          },
          city: {
            label: "Ort",
          },
          canton: {
            type: "select",
            label: "Kanton",
            required: true,
            init: "Aargau",
            options: cantonCodes,
          },
          submit: {
            type: "submit",
            label: "Bestätigen",
          },
        }}
        mutation={createSchool}
        onSubmit={(values) =>
          // TODO: typify Forms.tsx
          // @ts-ignore
          // eslint-disable-next-line
          createSchool({ variables: { data: omit(values, "submit") } })
        }
      >
        <Button
          onClick={onCancel}
          variant="text"
          sx={{ gridColumn: [0, 0, 2] }}
        >
          Abbrechen
        </Button>
        <ErrorBox error={error} my={4} />
      </QForm>
    </Box>
  );
}
