import { useRouter } from "next/router";
import { AppPage } from "components/Page";
import { gql, useMutation } from "@apollo/client";
import { Info } from "components/Info";
import React, { useState, ReactElement } from "react";
import { Text, Button, Heading, Flex } from "rebass";
import { QForm, ErrorBox, Grid } from "components/Form";
import CheckLogin from "components/CheckLogin";
import { usePageEvent, trackEvent } from "util/stats";
import { useSetAccessToken, useUser, useSetUser } from "../../state/user";
import {
  Role,
  useLoginMutation,
  useEmailVerificationMutation,
  useMagicMutation,
} from "graphql/types";
import { isBrowser } from "util/isBrowser";
import { Input, Label } from "@rebass/forms";
import { A } from "components/Breadcrumb";

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

export const MAGIC = gql`
  mutation magic($email: String!, $redirect: String) {
    magic(email: $email, redirect: $redirect) {
      success
      error
      message
    }
  }
`;

export default function Login(): ReactElement {
  const user = useUser();
  const router = useRouter();
  let email = "";

  // this is a quick hack until we can use https://github.com/vercel/next.js/issues/8259
  if (isBrowser() && window.location.search.indexOf("email=")) {
    email = window.location.search.substring(7);
  }

  if (user) {
    return <AfterLogin />;
  }

  return (
    <AppPage heading="Anmelden" onClose={() => void router.push("/")}>
      <Text mb={3}>
        Du hast bereits ein Konto bei voty.ch? Dann kannst Du dich hier mit
        deiner Schul-Emailadresse anmelden:
      </Text>
      <LoginForm initialEmail={email} />
    </AppPage>
  );
}

export const LoginForm: React.FC<
  React.PropsWithChildren<{ initialEmail?: string }>
> = ({ initialEmail }) => {
  usePageEvent({ category: "Login", action: "Start" });
  const router = useRouter();
  const loc = typeof document !== "undefined" ? document.location.href : "";
  const redirect = loc && loc.indexOf("login") < 0 ? loc : undefined;

  const [email, setEmail] = useState(initialEmail || "");
  const [exists, setExists] = useState<boolean | null | undefined>();
  const [magic, setMagic] = useState<boolean | null | undefined>();
  const [doMagic] = useMagicMutation({
    onCompleted(data) {
      setExists(data.magic?.success);
      setMagic(data.magic?.message ? true : false);
    },
  });

  async function checkExists() {
    await doMagic({ variables: { email, redirect } });
  }

  if (exists && magic)
    return (
      <>
        <Info type="info">
          Yay! Wir haben dir ein Email an «{email}» geschickt mit einem
          Login-Link. Schau in deiner Inbox nach!
        </Info>
        <A onClick={router.reload} fontSize={1}>
          Zurück
        </A>
      </>
    );
  if (exists && !magic) return <LoginPasswordForm email={email} />;

  return (
    <Grid gap={2} columns={[0, 0, "1fr 3fr 1fr"]} mt={3}>
      <Label htmlFor="email" sx={{ alignSelf: "center" }}>
        Email:{" "}
      </Label>
      <Input
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && checkExists()}
        placeholder="name@meineschule.ch"
      />
      <Button onClick={checkExists} my={1}>
        Anmelden
      </Button>
      {exists === false && (
        <ErrorBox error="Diese Email ist nicht registriert" />
      )}
    </Grid>
  );
};

const LoginPasswordForm: React.FC<
  React.PropsWithChildren<{ email: string }>
> = ({ email }) => {
  usePageEvent({ category: "Login", action: "Start" });

  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
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

  function checkLogin() {
    void doLogin({ variables: { email, password } });
  }

  return (
    <Grid gap={2} columns={[0, 0, "1fr 3fr 1fr"]} mt={3}>
      <Label htmlFor="email" sx={{ alignSelf: "center" }}>
        Email:
      </Label>
      <A onClick={router.reload}>{email}</A>
      <Text />
      <Label htmlFor="email" sx={{ alignSelf: "center" }}>
        Passwort:
      </Label>
      <input type="hidden" name="email" value={email} />
      <Input
        id="email"
        type="password"
        autoFocus
        onKeyUp={(e) => e.key === "Enter" && checkLogin()}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={checkLogin} my={1}>
        Anmelden
      </Button>
      <ErrorBox error={error} />
      <Flex
        my={2}
        sx={{ gridColumn: [0, 0, 2] }}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Button onClick={() => setRequestReset(email)} variant="text">
          Passwort vergessen?
        </Button>
        <Button onClick={() => router.push("/")} variant="text">
          Zurück
        </Button>
      </Flex>
    </Grid>
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

const RequestReset: React.FC<
  React.PropsWithChildren<{ onCancel: () => void; email: string }>
> = ({ onCancel, email }) => {
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");
  const [doRequestReset] = useEmailVerificationMutation({
    onCompleted() {
      setMailSent(true);
      setError("");
    },
    onError(err) {
      console.error(err);
      setError("Error.GenericError");
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
            init: email,
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
};
