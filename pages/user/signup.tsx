import { AppPage } from "components/Page";
import { Text, Flex, Button, Image } from "rebass";
import { gql } from "@apollo/client";
import { useState, ReactElement, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { QForm, yup, ErrorBox } from "../../components/Form";
import { omit } from "lodash";
import { SessionUser } from "state/user";
import {
  useCreateUserMutation,
  useEmailVerificationMutation,
} from "graphql/types";

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
    return (
      <AppPage heading="Dein Benutzerkonto ist erstellt">
        <Success user={user} />
      </AppPage>
    );
  }
  return (
    <AppPage
      heading="Erstelle ein Benutzerkonto"
      onClose={() => void router.push("/")}
    >
      <Text mb={4}>
        Hier kannst Du Dir ein eigenes Benutzerkonto erstellen. Bitte nutze die
        Email-Adresse Deiner Schule.
      </Text>
      <CreateUserForm setUser={setUser} />
    </AppPage>
  );
}

export function Success({ user }: { user?: SessionUser }): ReactElement {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");
  const [doRequestReset] = useEmailVerificationMutation({
    onCompleted() {
      setMailSent(true);
      setError("");
    },
    onError() {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  async function doResend() {
    await doRequestReset({
      variables: { email: String(user?.email), purpose: "verification" },
    });
  }
  return (
    <Flex flexDirection="column">
      <Image
        src="/images/voty_welcome.svg"
        maxWidth="80%"
        sx={{ position: "absolute", alignSelf: "center" }}
      />
      <Text>
        Hallo {user?.name}
        <br />
        Dein neues Benutzerkonto wurde erstellt und wir haben ein Email an die
        Adresse «{user?.email}» geschickt. Bitte öffne den Link in diesem Email,
        um Dich anzumelden.{" "}
      </Text>
      <Text my={4}>
        Solltest Du kein Email von voty.ch in der Inbox Deines Email-Accounts
        finden, dann schau doch bitte im Spam-Ordner nach.
      </Text>
      {!mailSent ? (
        <Button variant="text" onClick={doResend}>
          Bestätigungsmail nochmals senden
        </Button>
      ) : (
        "Das Bestätigungsmail wurde nochmals verschickt!"
      )}
      <ErrorBox error={error} />
    </Flex>
  );
}

export const CreateUserForm: React.FC<{
  setUser: Dispatch<SetStateAction<SessionUser | undefined>>;
  onSubmit?: (values: Record<string, string | number>) => void;
  omitRole?: boolean;
  defaultRole?: string;
  noFocus?: boolean;
}> = (props) => {
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
  return (
    <QForm
      mutation={doCreateUser}
      onSubmit={onSubmit}
      fields={{
        name: {
          focus: !props.noFocus,
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
        my={2}
        textAlign="right"
        sx={{ gridColumn: [0, 0, 2] }}
      >
        Ich habe bereits ein Benutzerkonto
      </Button>
    </QForm>
  );
};
