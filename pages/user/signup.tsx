import { AppPage } from "components/Page";
import { Text, Button } from "rebass";
import { gql } from "@apollo/client";
import { useState, ReactElement, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { QForm, yup, ErrorBox } from "../../components/Form";
import { omit } from "lodash";
import { SessionUser } from "state/user";
import { useCreateUserMutation } from "graphql/types";

// TODO use fragment for these fields
export const CREATE_USER = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
      email
      shortname
      lastname
      role
    }
  }
`;

export default function Signup(): ReactElement {
  const [user, setUser] = useState<SessionUser | undefined>(undefined);
  const router = useRouter();
  if (user) {
    return <Success user={user} />;
  }
  return (
    <AppPage
      heading="Erstelle ein Benutzerkonto"
      onClose={() => void router.push("/")}
    >
      <Text mb={4}>
        Hier kannst Du Dir ein eigenes Benutzerkonto erstellen. Bitte benutze
        die Email-Adresse Deiner Schule.
      </Text>
      <CreateUserForm setUser={setUser} />
    </AppPage>
  );
}

export function Success({ user }: { user?: SessionUser }): ReactElement {
  return (
    <AppPage heading="Konto erstellt">
      <Text>
        Hallo {user?.name} 👋 Dein neues Konto wurde gestellt und wir haben eine
        Email an «{user?.email}» geschickt. Bitte öffne den Link in diesem
        Email, um dich anzumelden.
      </Text>
    </AppPage>
  );
}

export function CreateUserForm({
  setUser,
  onSubmit,
  omitRole,
  defaultRole,
}: {
  setUser: Dispatch<SetStateAction<SessionUser | undefined>>;
  onSubmit?: (values: Record<string, string | number>) => void;
  omitRole?: boolean;
  defaultRole?: string;
}): ReactElement {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [doCreateUser] = useCreateUserMutation({
    onCompleted(data) {
      setUser(data.createUser);
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
      doCreateUser({ variables: { data: omit(values, "submit") } });
  }
  return (
    <QForm
      mutation={doCreateUser}
      onSubmit={onSubmit}
      fields={{
        name: {
          focus: true,
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
          validate: yup.string().min(6, "Dein Passwort ist etwas sehr kurz..."),
        },
        // watch out: password2 would also be sent to server which barks
        //password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
        role: {
          type: omitRole ? "hidden" : "select",
          label: "Ich bin:",
          init: defaultRole,
          required: true,
          options: {
            "Bitte auswählen": "",
            "Schüler*in": "Student",
            "Lehrer*in": "Teacher",
            "Schulleiter*in": "Principal",
            "Weltenbürger*in": "Unkown",
          },
        },
        submit: { type: "submit", label: "Konto erstellen" },
      }}
    >
      <ErrorBox error={error} my={4} />
      {showLogin && (
        <Button
          onClick={() => router.push("/user/login")}
          variant="text"
          sx={{ gridColumn: [0, 0, 2] }}
        >
          Möchstest Du Dich anmelden?
        </Button>
      )}
      <Button
        onClick={() => router.push("/user/login")}
        variant="text"
        my={3}
        textAlign="right"
        sx={{ gridColumn: [0, 0, 2] }}
      >
        Ich habe bereits ein Benutzer-Konto
      </Button>
    </QForm>
  );
}
