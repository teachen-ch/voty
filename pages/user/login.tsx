import { useRouter } from "next/router";
import { AppPage, Loading } from "components/Page";
import { gql, useMutation } from "@apollo/client";
import { useState, ReactElement } from "react";
import { Text, Button, Heading, Flex } from "rebass";
import { QForm, ErrorBox } from "components/Form";
import CheckLogin from "components/CheckLogin";
import { usePageEvent, trackEvent } from "util/stats";
import { useSetAccessToken, useUser, useSetUser } from "../../state/user";
import { useQueryParam } from "util/hooks";
import {
  Role,
  useLoginMutation,
  useEmailVerificationMutation,
} from "graphql/types";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export const EMAIL_VERIFICATION = gql`
  mutation emailVerification($email: String!, $purpose: String!) {
    emailVerification(email: $email, purpose: $purpose) {
      token # this is not really need, just a placeholder
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      token # this is not really need, just a placeholder
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export default function Login(): ReactElement {
  const user = useUser();
  const router = useRouter();
  const email = useQueryParam("email");

  if (user) {
    return <AfterLogin />;
  }
  if (!email) return <Loading />;

  return (
    <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
      <Text mb={3}>
        Hier kannst Du Dich mit Deiner Schul-Emailadresse anmelden, wenn Du
        bereits ein Konto bei voty.ch hast.
      </Text>
      <LoginForm initialEmail={email} />
    </AppPage>
  );
}

export const LoginForm: React.FC<{ initialEmail?: string }> = ({
  initialEmail,
}) => {
  usePageEvent({ category: "Login", action: "Start" });

  const [email, setEmail] = useState(initialEmail || "");
  const [emailError, setEmailError] = useState("");
  const [requestReset, setRequestReset] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [doLogin] = useLoginMutation({
    onCompleted(data) {
      if (data.login && data.login.token) {
        setUser(data.login.user);
        setAccessToken(data.login.token);
      }
    },
    onError(error) {
      if (error.message === "Error.EmailNotVerified") {
        trackEvent({ category: "Login", action: "NotVerified" });
        return setEmailError(email);
      } else {
        trackEvent({
          category: "Login",
          action: "Error",
          name: error.message,
        });
        return setError(error.message);
      }
    },
  });
  if (typeof requestReset === "string") {
    return (
      <RequestReset
        email={requestReset}
        onCancel={() => setRequestReset(undefined)}
      />
    );
  }

  if (emailError) {
    return <VerificationForm email={emailError} />;
  }
  return (
    <QForm
      mutation={doLogin}
      fields={{
        email: {
          label: "Email",
          required: true,
          type: "email",
          init: initialEmail,
          setter: setEmail,
          placeholder: "name@meineschule.ch",
        },
        password: {
          label: "Passwort",
          type: "password",
          required: true,
        },
        submit: { type: "submit", label: "Anmelden" },
      }}
    >
      <ErrorBox error={error} />
      <Flex
        my={2}
        sx={{ gridColumn: [0, 0, 2] }}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Button
          onClick={() => setRequestReset(email ? email : "")}
          variant="text"
        >
          Passwort vergessen?
        </Button>
        {/*
        <Button onClick={() => router.push("/user/signup")} variant="text">
          Neuer Benutzer? Konto anlegen!
        </Button>*/}
        <Button onClick={() => router.push("/")} variant="text">
          Zurück
        </Button>
      </Flex>
    </QForm>
  );
};

export function VerificationForm({ email }: { email: string }): ReactElement {
  usePageEvent({ category: "Login", action: "NotVerified" });
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");

  const [doVerification, request] = useMutation(EMAIL_VERIFICATION, {
    onCompleted() {
      setMailSent(true);
    },
    onError(error) {
      setError(error.message);
    },
  });
  return (
    <>
      <Heading as="h2">Email bestätigen</Heading>
      <Text mb={4}>
        Deine Email-Adresse «{email}» wurde noch nicht bestätigt. Bitte klicke
        auf den Link im Aktivierungs-Email.
      </Text>
      <Text>Sollen wir Dir nochmals ein Email schicken?</Text>
      <Button
        onClick={() =>
          doVerification({ variables: { email, purpose: "verification" } })
        }
        my={3}
        disabled={mailSent || request.loading}
        variant={"text"}
      >
        {mailSent ? "Email verschickt!" : "Nochmals Email schicken"}
        {request.loading && " – Bitte warten..."}
      </Button>
      <ErrorBox error={error} />
    </>
  );
}

export function getStartpage(role?: string): string {
  switch (role) {
    case Role.Teacher:
      return "/teacher";
    case Role.Student:
      return "/student";
    case Role.Admin:
      return "/admin";
    default:
      return "/";
  }
}

function AfterLogin() {
  usePageEvent({ category: "Login", action: "Success" });
  const user = useUser();
  const router = useRouter();

  if (user && user.role) {
    const page = getStartpage(user.role);
    void router.push(page);
    return <AppPage heading=""></AppPage>;
  } else {
    return (
      <AppPage heading="Angemeldet">
        <Heading as="h2">
          Etwas ist hier schief... Du hast keine Rolle im System hinterlegt :-/
        </Heading>
      </AppPage>
    );
  }
}

function RequestReset({ onCancel }: { email: string; onCancel: () => void }) {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");
  const [doRequestReset] = useEmailVerificationMutation({
    onCompleted() {
      setMailSent(true);
      setError("");
    },
    onError(err) {
      console.error(err);
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  return (
    <>
      <Text mb={4}>
        <strong>Passwort zurücksetzen?</strong> Wir schicken Dir ein Email!
      </Text>
      <QForm
        mutation={doRequestReset}
        onSubmit={async (values) => {
          if (mailSent) onCancel();
          else {
            await doRequestReset({
              variables: { email: String(values.email), purpose: "reset" },
            });
          }
        }}
        fields={{
          email: {
            label: "Email",
            required: true,
            type: "email",
            placeholder: "name@meineschule.ch",
          },
          submit: {
            type: "submit",
            label: mailSent ? "Email verschickt!" : "Email verschicken",
          },
        }}
      >
        <Button
          onClick={onCancel}
          variant="text"
          my={3}
          sx={{ gridColumn: [0, 0, 2] }}
        >
          Abbrechen
        </Button>
        <ErrorBox error={error} sx={{ gridColumn: [0, 0, 2] }} />
        {mailSent && (
          <Text sx={{ gridColumn: [0, 0, 2] }}>
            Falls ein Konto unter dieser E-Mail existiert, haben wir Dir ein
            Email geschickt
          </Text>
        )}
      </QForm>
    </>
  );
}
