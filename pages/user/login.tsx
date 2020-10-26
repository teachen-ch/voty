import { useRouter } from "next/router";
import { AppPage } from "components/Page";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useState, useEffect, ReactElement } from "react";
import { Text, Box, Button, Heading, Flex } from "rebass";
import { Grid } from "theme-ui";
import { Label, Input } from "@rebass/forms";
import { QForm, ErrorBox } from "components/Form";
import CheckLogin from "components/CheckLogin";
import {
  useSetAccessToken,
  useUser,
  useSetUser,
  SessionUser,
} from "../../state/user";
import { useQueryParam } from "util/hooks";
import {
  Role,
  useLoginMutation,
  useCheckVerificationMutation,
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

export const CHECK_VERIFICATION = gql`
  mutation checkVerification($token: String!) {
    checkVerification(token: $token) {
      token
      user {
        ...LoginFields
      }
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export default function Login(): ReactElement {
  const token = useQueryParam("t");
  const purpose = useQueryParam("p");
  const user = useUser();
  const router = useRouter();

  if (user) {
    return <AfterLogin />;
  }

  // purpose: verification, reset, login
  if (token && purpose) {
    return (
      <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
        <CheckToken token={token} purpose={purpose} />
      </AppPage>
    );
  } else {
    return (
      <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
        <Text mb={3}>
          Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
          bereits ein Benutzerkonto bei voty.ch hast.
        </Text>
        <LoginForm />
      </AppPage>
    );
  }
}

export function LoginForm(): ReactElement {
  const [email, setEmail] = useState("");
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
      if (error.message === "ERR_EMAIL_NOT_VERIFIED") {
        return setEmailError(email);
      } else {
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
          label: "Email:",
          required: true,
          type: "email",
          setter: setEmail,
          placeholder: "name@meineschule.ch",
          focus: true,
        },
        password: {
          label: "Passwort:",
          type: "password",
          required: true,
        },
        submit: { type: "submit", label: "Anmelden" },
      }}
    >
      <ErrorBox error={error} />
      <Flex
        flexDirection="row"
        my={3}
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
        <Button onClick={() => router.push("/user/signup")} variant="text">
          Neuer Benutzer? Konto anlegen!
        </Button>
      </Flex>
    </QForm>
  );
}

function VerificationForm({ email }: { email: string }): ReactElement {
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

function getStartpage(role?: string) {
  let page = "";
  switch (role) {
    case Role.Teacher:
      page = "/teacher";
      break;
    case Role.Student:
      page = "/student";
      break;
    case Role.Admin:
      page = "/admin";
      break;
    default:
      page = "/";
  }
  return page;
}

function AfterLogin() {
  const user = useUser();
  const router = useRouter();

  if (user && user.role) {
    const page = getStartpage(user.role);
    void router.push(page);
    return null;
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

function CheckToken({ token, purpose }: { token: string; purpose: string }) {
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [error, setError] = useState("");
  const [tempUser, setTempUser] = useState<SessionUser | undefined | null>();
  const router = useRouter();
  const client = useApolloClient();
  const [doVerification] = useCheckVerificationMutation({
    onCompleted: (data) => {
      if (data.checkVerification && data.checkVerification.token) {
        setTempUser(data.checkVerification.user);
        setAccessToken(data.checkVerification.token);
      }
    },
    onError(error) {
      setError("Dieser Email-Link ist leider nicht mehr gültig!");
      console.error(error.message);
    },
  });

  useEffect(() => {
    // first logout current user, as doVerification will auto-login user based on token
    void client.clearStore();
    setAccessToken("");
    setUser(undefined);
    void doVerification({ variables: { token } });
  }, []);

  // token verification succeded, we have a session & user
  if (tempUser !== undefined) {
    // login -> go straight back
    if (purpose === "login") {
      setUser(tempUser);
    }
    if (purpose === "verification") {
      return (
        <Box>
          <Text mb={4}>
            Super, Deine Email-Adresse ist nun bestätigt und Du bist bereits
            angemeldet.
          </Text>
          <Button onClick={() => router.push(getStartpage(tempUser?.role))}>
            Weiter geht&apos;s
          </Button>
        </Box>
      );
    }
    if (purpose === "reset") {
      return <PasswordResetForm />;
    }
  }

  if (error) {
    return (
      <>
        <Heading as="h2">Fehler</Heading>
        <Text mb={4}>{error}</Text>
        <Button as="a" href="/user/login">
          zurück
        </Button>
      </>
    );
  }

  return <Text>Überprüfen</Text>;
}

function RequestReset({ onCancel }: { email: string; onCancel: () => void }) {
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
            label: "Email:",
            required: true,
            type: "email",
            placeholder: "name@meineschule.ch",
            focus: true,
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
            Falls ein Benutzerkonto unter dieser E-Mail existiert, haben wir Dir
            ein Email geschickt
          </Text>
        )}
      </QForm>
    </>
  );
}

function PasswordResetForm() {
  const user = useUser();
  const setUser = useSetUser();
  const setAccessToken = useSetAccessToken();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [doChangePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted({ changePassword }) {
      if (changePassword && changePassword.token) {
        console.log(changePassword.user);
        setUser(changePassword.user);
        setAccessToken(changePassword.token);
      }
      setSuccess(true);
    },
    onError() {
      setError("Es ist ein Fehler aufgetreten.");
    },
  });

  async function checkPasswords(pw1: string, pw2: string) {
    if (pw1 !== pw2) {
      setError("Die beiden Passwörter stimmen nicht überein…");
    }
    return doChangePassword({ variables: { password } });
  }
  if (success) {
    return (
      <>
        <Heading as="h2">Passwort geändert</Heading>
        <Text mb={4}>Super, das hat geklappt.</Text>
        <Button onClick={() => router.push(getStartpage(user?.role))}>
          Weiter geht&apos;s
        </Button>
      </>
    );
  }
  return (
    <>
      <Heading as="h2">Passwort ändern</Heading>
      <Grid gap={2} columns={[0, 0, "2fr 3fr"]}>
        <Label alignSelf="center">Neues Passwort:</Label>
        <Input
          autoFocus
          autoCapitalize="none"
          value={password}
          name="password"
          type="password"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword(event.currentTarget.value)
          }
        />
        <Label alignSelf="center">Password wiederholen:</Label>
        <Input
          value={password2}
          name="password2"
          type="password"
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setPassword2(event.currentTarget.value)
          }
        />
        <Button
          onClick={() => checkPasswords(password, password2)}
          sx={{ gridColumn: [0, 0, 2] }}
        >
          Passwort ändern
        </Button>
        <ErrorBox error={error} />
      </Grid>
    </>
  );
}
