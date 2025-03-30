import { gql } from "@apollo/client";
import {
  TeamTeacherFieldsFragment,
  useUpdateUserMutation,
  useDeleteUserMutation,
  User,
  Gender,
  Role,
} from "graphql/types";
import { ReactElement, useState } from "react";
import { Link as A, Box, Button, Text } from "rebass";
import { Label, Input as RebassInput, Select } from "@rebass/forms";
import { SessionUser, useSetUser } from "state/user";
import { yup, ErrorBox } from "./Form";
import CheckLogin from "./CheckLogin";
import Image from "next/legacy/image";
import IconOK from "../public/images/icon_user_ok.svg";
import IconNOK from "../public/images/icon_user_nok.svg";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { Grid } from "theme-ui";
import { useTr } from "util/translate";
import Link from "next/link";

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

export const DELETE_USER = gql`
  mutation deleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      shortname
    }
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
  const [deleteUser] = useDeleteUserMutation({
    update: (cache, result) => {
      cache.evict({ id: `User:${result.data?.deleteUser?.id}` });
      cache.gc();
    },
  });

  async function doDeleteUser(id: string) {
    if (
      confirm(
        "Diese Email-Adresse wurde noch nicht bestätigt. Soll das Konto gelöscht werden?"
      )
    ) {
      await deleteUser({ variables: { where: { id } } });
    }
  }

  return (
    <table
      style={{
        borderTop: "2px solid",
      }}
    >
      <tbody>
        {!users || users.length === 0 ? (
          <tr>
            <td colSpan={3}>Es wurden noch keine Schüler*innen hinzugefügt</td>
          </tr>
        ) : (
          users?.map((user: myUser) => (
            <tr key={user.id}>
              <td style={{ maxWidth: "200px" }}>
                <A href={`mailto:${user.email}`}>{user.shortname}</A>
              </td>
              <td>
                <A
                  sx={{ display: ["none", "none", "inline"] }}
                  href={`mailto:${user.email}`}
                >
                  {user.email}
                </A>
              </td>
              <td>
                <Box variant="centered">
                  {user.emailVerified ? (
                    <Image src={IconOK} alt="Bestätigt" />
                  ) : (
                    <Image
                      src={IconNOK}
                      alt="Nicht bestätigt"
                      onClick={() => doDeleteUser(user.id)}
                    />
                  )}
                </Box>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

interface IProfileForm {
  name?: string | null;
  lastname?: string | null;
  gender?: Gender | null;
  year?: number | null;
}

export const ProfileEdit: React.FC<React.PropsWithChildren<{
  user: SessionUser;
  editMode?: boolean;
  skipName?: boolean;
  onFinish?: () => void;
}>> = ({ user, editMode, onFinish, skipName }) => {
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(editMode);
  const setUser = useSetUser();
  const tr = useTr();
  const [doUpdateUser] = useUpdateUserMutation({
    onCompleted(data) {
      setUser(data.updateUser);
      setEdit(false);
      onFinish && onFinish();
    },
    onError(error) {
      setError(error.message);
    },
  });

  const isTeacher =
    user?.role === Role.Teacher || user?.role === Role.Principal;
  const isStudent = !isTeacher;

  // for the year born dropdown: from around 6 - 20 years old
  const startYear = new Date().getFullYear() - (isStudent ? 20 : 100);
  const numYears = isStudent ? 12 : 90;

  async function onSubmit(values: IProfileForm) {
    await doUpdateUser({
      variables: {
        where: { id: user?.id },
        data: {
          name: { set: values.name },
          lastname: { set: values.lastname },
          year: { set: parseInt(String(values.year)) },
          gender: { set: values.gender },
        },
      },
    });
  }

  const initialValues: IProfileForm = {
    name: user?.name,
    lastname: user?.lastname,
    year: user?.year,
    gender: user?.gender,
  };

  let validationSchema: yup.ObjectSchema;
  if (isTeacher) {
    validationSchema = yup.object().shape({
      name: skipName ? yup.string() : yup.string().required(tr("Pflichtfeld")),
      lastname: yup.string().nullable(),
    });
  } else {
    validationSchema = yup.object().shape({
      name: skipName ? yup.string() : yup.string().required(tr("Pflichtfeld")),
      year: yup.string().nullable().required(tr("Profile.RequiredError")),
      gender: yup.string().nullable().required(tr("Profile.RequiredError")),
    });
  }

  if (!edit) {
    return (
      <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
        {!skipName && (
          <ShowField label={tr("Profile.Firstname")} value={user?.name} />
        )}
        {!skipName && isTeacher && (
          <ShowField label={tr("Profile.Lastname")} value={user?.lastname} />
        )}
        {isStudent && (
          <ShowField label={tr("Profile.Year")} value={user?.year} />
        )}
        {isStudent && (
          <ShowField
            label={tr("Profile.Gender")}
            value={getGenderText(user?.gender)}
          />
        )}
        <ShowField label={tr("Profile.Email")} value={user?.email} />
        <Button onClick={() => setEdit(true)} sx={{ gridColumn: [0, 0, 2] }}>
          {tr("Profile.Edit")}
        </Button>
        <Text fontSize={1} textAlign="left" sx={{ gridColumn: [0, 0, 2] }}>
          {tr(`Profile.Legal.${user?.role}`)}

          <Link href="/datenschutz/" passHref legacyBehavior>
            <A target="_blank" variant="underline">
              {tr("Profile.DataLink")}
            </A>
          </Link>
        </Text>
      </Grid>
    );
  } else {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
            {!skipName && (
              <Input label="Vorname" name="name" placeholder="Vorname"></Input>
            )}
            {!skipName && isTeacher && (
              <Input
                label="Nachname"
                name="lastname"
                placeholder="Nachname"
              ></Input>
            )}
            {isStudent && (
              <>
                <Label htmlFor="year" pt="6px">
                  {" "}
                  {tr("Profile.Year")}:
                </Label>
                <Field as={Select} id="year" name="year" value={user?.year}>
                  <option value={undefined}>{tr("Profile.Choose")}</option>
                  {[...Array(numYears).keys()].map((i) => (
                    <option key={i}>{startYear + (numYears - i)}</option>
                  ))}
                  <option value={0}>{tr("Profile.Skip")}</option>
                </Field>
                <FieldError name="year" />
                <label htmlFor="gender">{tr("Profile.Gender")}:</label>
                <Box id="gender" textAlign="left">
                  <Grid columns="1fr 2fr" gap={0}>
                    <label>
                      <Field type="radio" name="gender" value={Gender.Female} />{" "}
                      {tr("Profile.Female")}
                    </label>
                    <label>
                      <Field type="radio" name="gender" value={Gender.Male} />{" "}
                      {tr("Profile.Male")}
                    </label>
                    <label>
                      <Field type="radio" name="gender" value={Gender.Other} />{" "}
                      {tr("Profile.Other")}
                    </label>
                    <label>
                      <Field type="radio" name="gender" value={Gender.Unkown} />{" "}
                      {tr("Profile.Skip")}
                    </label>
                  </Grid>
                </Box>
                <FieldError name="gender" />
              </>
            )}
            {isTeacher && (
              <ShowField label="Email" value="Kontaktiere uns für Änderungen" />
            )}
            <Button type="submit" sx={{ gridColumn: [0, 0, 2] }} my={2}>
              {tr("Profile.Save")}
            </Button>
            <ErrorBox error={error} my={4} />

            <Text fontSize={1} textAlign="left" sx={{ gridColumn: [0, 0, 2] }}>
              {tr(`Profile.Legal.${user?.role}`)}
              <Link href="/datenschutz/" passHref legacyBehavior>
                <A target="_blank" variant="underline">
                  {tr("Profile.DataLink")}
                </A>
              </Link>
            </Text>
          </Grid>
        </Form>
      </Formik>
    );
  }
};

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  focus?: boolean;
};

export const Input: React.FC<React.PropsWithChildren<InputProps>> = ({
  label,
  name,
  placeholder,
  focus,
}) => {
  const [field, meta] = useField<string>(name);
  return (
    <>
      <Label sx={{ alignSelf: "center" }} htmlFor={name}>
        {label}:
      </Label>
      {/* @ts-ignore */}
      <RebassInput
        {...field}
        id={name}
        placeholder={placeholder}
        autoFocus={focus}
      />
      {meta.touched && meta.error ? (
        <>
          <Text variant="fielderror" sx={{ gridColumn: [0, 0, 2] }}>
            {meta.error}
          </Text>
        </>
      ) : null}
    </>
  );
};

export const FieldError: React.FC<React.PropsWithChildren<{ name: string }>> = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <Text variant="fielderror" sx={{ gridColumn: [0, 0, 2] }}>
        {msg}
      </Text>
    )}
  </ErrorMessage>
);

export const ShowField: React.FC<React.PropsWithChildren<{
  label: string;
  value?: string | null | number;
}>> = ({ label, value }) => {
  return (
    <>
      <Text my={[0, 0, 1]} textAlign="left" pt={[0, 0, 2]}>
        {label}:
      </Text>
      <Text my={1} py="7px" mb={[3, 3, 0]} fontSize={4} textAlign="left">
        {value || "–"}
      </Text>
    </>
  );
};

export function getGenderText(gender?: Gender | null): string {
  if (gender === Gender.Female) return "weiblich";
  if (gender === Gender.Male) return "männlich";
  if (gender === Gender.Other) return "anderes";
  return "nicht angegeben";
}
