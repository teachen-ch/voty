import { AppPage } from "components/Page";
import { Text, Button } from "rebass";
import { gql } from "@apollo/client";
import { useState, ReactElement, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { QForm, yup, ErrorBox } from "../../components/Form";
import { omit } from "lodash";
import { SessionUser, useUser } from "state/user";
import { useCreateUserMutation } from "graphql/types";
import Abstimmung from "pages/abstimmung";
import Success from "./success";

// TODO use fragment for ./successlds
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
  // currently we redirect the signup form to the campaign page
  return <Abstimmung />;
  const [user, setUser] = useState<SessionUser | undefined>(undefined);
  const router = useRouter();
  if (user) {
    return <Success user={user} />;
  }
  return (
    <AppPage heading="Erstelle ein Konto" onClose={() => void router.push("/")}>
      <Text mb={4}>
        Hier kannst Du Dir ein eigenes Konto erstellen. Bitte nutze die
        Email-Adresse Deiner Schule.
      </Text>
      <CreateUserForm setUser={setUser} />
    </AppPage>
  );
}

export const CreateUserForm: React.FC<{
  setUser: Dispatch<SetStateAction<SessionUser | undefined>>;
  onSubmit?: (values: Record<string, string | number>) => void;
  omitRole?: boolean;
  omitLastname?: boolean;
  defaultRole?: string;
}> = (props) => {
  const existingUser = useUser();
  const router = useRouter();
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [doCreateUser] = useCreateUserMutation({
    onCompleted(data) {
      props.setUser(data.createUser);
    },
    onError(err) {
      setError(err.message);
      if (err.message === "Error.DuplicateEmail") {
        setShowLogin(true);
      }
    },
  });

  function defaultSubmit(values: Record<string, any>) {
    return doCreateUser({ variables: { data: omit(values, "submit") } });
  }

  const onSubmit = props.onSubmit || defaultSubmit;
  let fields: Record<string, any> = {
    name: {
      label: "Vorname",
      required: true,
      validate: yup.string().min(3, "Dein Vorname ist etwas kurz"),
    },
    lastname: { label: "Nachname", required: true },
    email: {
      label: "Email",
      required: true,
      type: "email",
      placeholder: "name@meineschule.ch",
    },
    password: {
      label: "Passwort",
      type: "password",
      required: true,
      validate: yup.string().min(6, "Dein Passwort ist etwas sehr kurz..."),
    },
    // watch out: password2 would also be sent to server which barks
    //password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    role: {
      type: props.omitRole ? "hidden" : "select",
      label: "Ich bin",
      init: props.defaultRole,
      required: true,
      options: {
        "Bitte auswählen": "",
        "Schüler*in": "Student",
        "Lehrer*in": "Teacher",
        "Schulleiter*in": "Principal",
      },
    },
    submit: { type: "submit", label: "Konto erstellen" },
  };

  if (props.omitLastname) {
    fields = omit(fields, "lastname");
  }

  if (existingUser) {
    return <Text>Du bist bereits mit einem Benutzer-Account angemeldet.</Text>;
  }

  return (
    <QForm mutation={doCreateUser} onSubmit={onSubmit} fields={fields}>
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
        my={2}
        textAlign="right"
        sx={{ gridColumn: [0, 0, 2] }}
      >
        Ich habe bereits ein Konto
      </Button>
      {props.children}
    </QForm>
  );
};
