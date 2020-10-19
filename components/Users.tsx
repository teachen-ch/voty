import { gql } from "@apollo/client";
import {
  TeamTeacherFieldsFragment,
  useUpdateUserMutation,
  User,
  Gender,
} from "graphql/types";
import { ReactElement, useState } from "react";
import { Link, Button, Text } from "rebass";
import { Label, Input as RebassInput, Select } from "@rebass/forms";
import { SessionUser, useSetUser } from "state/user";
import { yup, ErrorBox } from "./Form";
import CheckLogin from "./CheckLogin";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { Grid } from "theme-ui";

export const GET_USERS = gql`
  query users($where: UserWhereInput) {
    users(where: $where) {
      id
      shortname
      team {
        id
        name
        school {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    ...LoginFields 
  }
  ${CheckLogin.fragments.LoginFields}
}
`;

type myUser = Pick<
  User,
  "email" | "emailVerified" | "id" | "name" | "shortname"
>;

export function Users({
  users,
}: {
  users?: TeamTeacherFieldsFragment["members"];
}): ReactElement {
  if (!users || users.length === 0) {
    return <span>Noch keine Schülerinnen und Schüler hinzugefügt</span>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user: myUser) => (
            <tr key={user.id}>
              <td>{user.shortname}</td>
              <td>
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
              </td>
              <td>{user.emailVerified ? "✅ Bestätigt" : "☑️ Verschickt"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface IProfileForm {
  name?: string | null;
  gender?: Gender | null;
  year?: number | null;
}

export const StudentProfileEdit: React.FC<{ user: SessionUser }> = ({
  user,
}) => {
  const [error, setError] = useState("");
  const setUser = useSetUser();
  const [doUpdateUser] = useUpdateUserMutation({
    onCompleted(data) {
      setUser(data.updateUser);
    },
    onError(error) {
      if (error.message === "ERR_DUPLICATE_EMAIL") {
        setError(error.message);
      }
    },
  });

  async function onSubmit(values: IProfileForm) {
    console.log(values);
    await doUpdateUser({
      variables: {
        where: { id: user?.id },
        data: {
          name: { set: values.name },
          year: { set: parseInt(String(values.year)) },
          gender: values.gender,
        },
      },
    });
  }

  const initialValues: IProfileForm = {
    name: user?.name,
    year: user?.year,
    gender: user?.gender,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={yup.object().shape({
        name: yup
          .string()
          .required("Pflichtfeld")
          .min(3, "Dein Vorname ist etwas kurz"),
        year: yup.string().nullable().required("Pflichtfeld"),
        gender: yup.string().required("Pflichtfeld"),
      })}
    >
      <Form>
        <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
          <Input label="Vorname:" name="name" placeholder="Vorname"></Input>
          <label htmlFor="year">Jahrgang: </label>
          <Field as={Select} id="year" name="year">
            <option value="">Bitte auswählen</option>
            {[...Array(14).keys()].map((i) => (
              <option key={i}>{i + 2000}</option>
            ))}
            <option value={0}>Möchte ich nicht angeben</option>
          </Field>
          <FieldError name="year" />
          <label htmlFor="gender">Geschlecht: </label>
          <div id="gender">
            <Grid columns="1fr 2fr" gap={0}>
              <label>
                <Field type="radio" name="gender" value={Gender.Female} />{" "}
                weiblich
              </label>
              <label>
                <Field type="radio" name="gender" value={Gender.Male} />{" "}
                männlich
              </label>
              <label>
                <Field type="radio" name="gender" value={Gender.Other} />{" "}
                anderes
              </label>
              <label>
                <Field type="radio" name="gender" value={Gender.Unkown} />{" "}
                Möchte ich nicht angeben
              </label>
            </Grid>
          </div>
          <FieldError name="gender" />
          <Button type="submit" sx={{ gridColumn: 2 }}>
            Angaben speichern
          </Button>
          <ErrorBox error={error} my={4} />

          <Text fontSize={1} sx={{ gridColumn: 2 }}>
            <i>[TODO-Legal-Text]</i>
          </Text>
        </Grid>
      </Form>
    </Formik>
  );
};

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({ label, name, placeholder }) => {
  const [field, meta] = useField<string>(name);
  return (
    <>
      <Label sx={{ alignSelf: "center" }} htmlFor={name}>
        {label}
      </Label>
      {/* @ts-ignore */}
      <RebassInput {...field} id={name} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <>
          <Text variant="fielderror" fontSize={1} sx={{ gridColumn: 2 }}>
            {meta.error}
          </Text>
        </>
      ) : null}
    </>
  );
};
export const FieldError: React.FC<{ name: string }> = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <Text
        fontSize={1}
        fontWeight="bold"
        color="primary"
        sx={{ gridColumn: 2 }}
      >
        {msg}
      </Text>
    )}
  </ErrorMessage>
);
