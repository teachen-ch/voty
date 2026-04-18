import { AppPage } from "components/Page";
import { Text, Button, Heading, Card } from "components/ui";
import { gql } from "@apollo/client";
import { useState, ReactElement, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { QForm, z, ErrorBox } from "../../components/Form";
import omit from "lodash/omit";
import { SessionUser, useUser } from "state/user";
import { Role, useCreateUserMutation } from "graphql/types";
import Success from "./success";
import { useTr } from "util/translate";

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
      <AppPage heading="Dein Konto ist erstellt">
        <Success user={user} />
      </AppPage>
    );
  }
  return (
    <AppPage
      heading="Neue Klasse anmelden"
      onClose={() => void router.push("/")}
    >
      <Text className="mb-8">
        Du bist eine Lehrperson und möchtest mit deinen Klassen auf voty.ch
        abstimmen oder das Online-Lehrmittel benutzen? Eröffne hier ein
        kostenloses Konto:
      </Text>
      <CreateUserForm setUser={setUser} defaultRole={Role.Teacher} omitRole />
    </AppPage>
  );
}

export const InlineSignup: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [newUser, setNewUser] = useState<SessionUser | undefined>(undefined);

  if (newUser) {
    return (
      <Card>
        <Success user={newUser} />
      </Card>
    );
  } else
    return (
      <>
        <Heading as="h2" id="form">
          Interessiert? Melde dich jetzt mit deiner Klasse an
        </Heading>
        <CreateUserForm
          setUser={setNewUser}
          omitRole
          defaultRole={Role.Teacher}
        ></CreateUserForm>
      </>
    );
};

export const CreateUserForm: React.FC<React.PropsWithChildren<{
  setUser: Dispatch<SetStateAction<SessionUser | undefined>>;
  onSubmit?: (values: Record<string, string | number>) => void;
  omitRole?: boolean;
  omitLastname?: boolean;
  omitFirstname?: boolean;
  omitPassword?: boolean;
  omitLogin?: boolean;
  defaultRole?: string;
  submitButtonLabel?: string;
  campaign?: string;
  redirect?: string;
}>> = (props) => {
  const existingUser = useUser();
  const tr = useTr();
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
    const data = omit(values, "submit");
    data.locale = router.locale;
    // @ts-ignore this would need QForm to be typed...
    return doCreateUser({ variables: { data } });
  }

  const onSubmit = props.onSubmit || defaultSubmit;
  let fields: Record<string, any> = {
    name: {
      label: "Vorname",
      required: true,
      validate: z.string().min(3, "Dein Vorname ist etwas kurz"),
    },
    lastname: { label: "Nachname", required: true },
    email: {
      label: "Email",
      required: true,
      type: "email",
      placeholder: tr("Signup.placeholderEmail"),
    },
    password: {
      label: "Passwort",
      type: "password",
      required: true,
      validate: z.string().min(6, "Dein Passwort ist etwas sehr kurz..."),
    },
    role: {
      type: props.omitRole ? "hidden" : "select",
      label: tr("Signup.labelRole"),
      init: props.defaultRole,
      required: true,
      options: {
        "": tr("Roles.Choose"),
        Student: tr("Roles.Student"),
        Teacher: tr("Roles.Teacher"),
        Principal: tr("Roles.Principal"),
        User: tr("Roles.User"),
      },
    },
    campaign: {
      type: "hidden",
      init: props.campaign,
    },
    redirect: {
      type: "hidden",
      init: props.redirect,
    },
    locale: {
      type: "hidden",
      init: router.locale,
    },
    submit: {
      type: "submit",
      label: props.submitButtonLabel || tr("Signup.CreateButton"),
    },
  };

  if (props.omitLastname) {
    fields = omit(fields, "lastname");
  }
  if (props.omitFirstname) {
    fields = omit(fields, "name");
  }
  if (props.omitPassword) {
    fields = omit(fields, "password");
  }

  if (existingUser) {
    return <Text>{tr("Signup.LoggedIn")}</Text>;
  }

  return (
    <QForm mutation={doCreateUser} onSubmit={onSubmit} fields={fields}>
      <ErrorBox error={error} className="my-8" />
      {showLogin && (
        <Button
          onClick={() => router.push("/user/login")}
          variant="text"
          style={{ gridColumn: "2" }}
        >
          Möchstest du dich anmelden?
        </Button>
      )}
      {!props.omitLogin && (
        <Button
          onClick={() => router.push("/user/login")}
          variant="text"
          className="my-2 text-right"
          style={{ gridColumn: "2" }}
        >
          Ich habe bereits ein Konto
        </Button>
      )}
      {props.children}
    </QForm>
  );
};
