import { Page } from "components/Page";
import { Card, Text, Button } from "rebass";
import { Grid } from "theme-ui";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { QForm, yup } from "../../components/forms";

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
    <Page heading="Account erstellt">
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
    <Page heading="Erstelle einen neuen Account">
      <Text>
        Erstelle einen neuen Account für Voty. <br />
        Bitte nutze die Email-Adresse Deiner Schule.
      </Text>
      <Card>
        <QForm
          mutation={doCreateUser}
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
            submit: { type: "submit", label: "Account erstellen" },
          }}
        >
          <ErrorBox error={error} my={4} />
          {showLogin && (
            <>
              <span />
              <Button onClick={() => router.push("/user/login")}>
                Möchstest Du Dich anmelden?
              </Button>
            </>
          )}
        </QForm>
      </Card>
    </Page>
  );
}

const ErrorBox = (props) => (
  <Text sx={{ gridColumn: "2" }} fontWeight="bold" color="primary">
    {props.error}
  </Text>
);
