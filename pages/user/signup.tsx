import Head from "next/head";
import { Page, PageHeading } from "components/Page";
import { Card, Text, Button } from "rebass";
import { Grid } from "theme-ui";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Input, Select, Yup } from "../../components/forms";

export const CREATE_USER = gql`
  mutation($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
      email
      lastname
    }
  }
`;

export default function Signup() {
  const [user, setUser] = useState();
  if (user) {
    return <Success user={user} />;
  }
  return <CreateUserForm setUser={setUser} />;
}

function Success({ user }) {
  return (
    <Page>
      <Head>
        <title>voty - Neuer Account</title>
      </Head>
      <PageHeading>Account erstellt</PageHeading>
      <Text>
        Hallo {user.name} 👋 Dein neuer Account wurde gestellt und wir haben
        eine Email an «{user.email}» geschickt. Bitte öffne den Link in diesem
        Email, um dich anzumelden.
      </Text>
    </Page>
  );
}

function CreateUserForm({ setUser }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [doCreateUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (data) {
        setUser(data.createUser);
      } else {
        setUser(undefined);
      }
    },
    onError: (error) => {
      if (error.message === "ERR_DUPLICATE_EMAIL") {
        setError("Diese Email ist bereits registriert");
        setShowLogin(true);
      }
    },
  });
  return (
    <Page>
      <Head>
        <title>voty - Neuer Account</title>
      </Head>
      <PageHeading>Erstelle einen neuen Account</PageHeading>
      <Text>
        Erstelle einen neuen Account für Voty. <br />
        Bitte nutze die Email-Adresse Deiner Schule.
      </Text>
      <Formik
        initialValues={{
          email: "",
          name: "",
          lastname: "",
          password: "",
          role: "",
        }}
        onSubmit={(values) =>
          doCreateUser({
            variables: { data: values },
          })
        }
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Bitte gib Deinen Vornamen an")
            .required("Pflichtfeld"),
          lastname: Yup.string()
            .min(3, "Bitte gib Deinen Nachnamen an")
            .required("Pflichtfeld"),
          email: Yup.string()
            .email("Bitte gib eine gültige Email-Adresse an")
            .required("Pflichtfeld"),
        })}
      >
        <Form>
          <Card>
            <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
              <Input autoFocus label="Vorname:" name="name" />
              <Input label="Nachname:" name="lastname" />
              <Input
                label="Email:"
                name="email"
                placeholder="name@meineschule.ch"
              />
              <Input label="Passwort" name="password" type="password" />
              <Select label="Ich bin:" name="role">
                <option value="USER">---</option>
                <option value="STUDENT">Schüler/-in</option>
                <option value="TEACHER">Lehrer/-in</option>
                <option value="PRINCIPAL">Schulleiter/-in</option>
                <option value="USER">Weltenbürger/-in</option>
              </Select>
              <span />
              <Button type="submit">Account erstellen</Button>
              <ErrorBox error={error} />
              {showLogin && (
                <>
                  <span />
                  <Button onClick={() => router.push("/user/login")}>
                    Möchstest Du Dich anmelden?
                  </Button>
                </>
              )}
            </Grid>
          </Card>
        </Form>
      </Formik>
    </Page>
  );
}

const ErrorBox = (props) => (
  <Text sx={{ gridColumn: "2" }} fontWeight="bold" color="primary">
    {props.error}
  </Text>
);
