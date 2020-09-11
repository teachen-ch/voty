import { Page } from "components/Page";
import { Card, Text, Button } from "rebass";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { QForm, yup, ErrorBox, Grid } from "../../components/Forms";
import _ from "lodash";

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
  return (
    <Page heading="Erstelle ein neues Benutzer-Konto">
      <Text>
        Erstelle ein neuen Konto für Voty. <br />
        Bitte nutze die Email-Adresse Deiner Schule.
      </Text>
      <CreateUserForm setUser={setUser} />
    </Page>
  );
}

export function Success({ user }) {
  return (
    <Page heading="Konto erstellt">
      <Text>
        Hallo {user.name} 👋 Dein neues Konto wurde gestellt und wir haben eine
        Email an «{user.email}» geschickt. Bitte öffne den Link in diesem Email,
        um dich anzumelden.
      </Text>
    </Page>
  );
}

export function CreateUserForm({
  setUser,
  onSubmit,
}: {
  setUser: Function;
  onSubmit?: Function;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [doCreateUser] = useMutation(CREATE_USER, {
    onCompleted(data) {
      if (data) {
        setUser(data.createUser);
      } else {
        setUser(undefined);
      }
    },
    onError(error) {
      if (error.message === "ERR_DUPLICATE_EMAIL") {
        setError("Diese Email ist bereits registriert");
        setShowLogin(true);
      }
    },
  });

  if (!onSubmit) {
    onSubmit = (values) =>
      doCreateUser({ variables: { data: _.omit(values, "submit") } });
  }
  return (
    <Card>
      <QForm
        mutation={doCreateUser}
        onSubmit={onSubmit}
        fields={{
          name: {
            label: "Vorname:",
            required: true,
            validate: yup.string().min(3, "Dein Vorname ist etwas kurz"),
          },
          lastname: { label: "Nachname:", required: true },
          email: {
            label: "Email:",
            required: true,
            type: "email",
            placeholder: "name@meineschule.ch",
          },
          password: {
            label: "Passwort:",
            type: "password",
            required: true,
            validate: yup
              .string()
              .min(6, "Dein Passwort ist etwas sehr kurz..."),
          },
          // watch out: password2 would also be sent to server which barks
          //password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
          role: {
            label: "Ich bin:",
            init: "STUDENT",
            required: true,
            options: {
              "---": "UNKOWN",
              "Schüler/-in": "STUDENT",
              "Lehrer/-in": "TEACHER",
              "Schulleiter/-in": "PRINCIPAL",
              "Weltenbürger/-in": "UNKOWN",
            },
          },
          submit: { type: "submit", label: "Konto erstellen" },
        }}
      >
        <ErrorBox error={error} my={4} />
        {showLogin && (
          <>
            <span />
            <Button
              onClick={() => router.push("/user/login")}
              variant="outline"
            >
              Möchstest Du Dich anmelden?
            </Button>
          </>
        )}
        <span />
        <Button onClick={() => router.push("/user/login")} variant="outline">
          Ich habe bereits ein Benutzer-Konto
        </Button>
      </QForm>
    </Card>
  );
}
