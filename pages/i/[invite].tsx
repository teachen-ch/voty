import { useRouter } from "next/router";
import { AppPage, Err } from "../../components/Page";
import { gql } from "@apollo/client";
import { ErrorBox } from "../../components/Form";
import { Heading, Box, Button, Text } from "rebass";
import { useState } from "react";
import { CreateUserForm } from "../user/signup";
import Success from "../user/success";
import { useUser } from "../../state/user";
import omit from "lodash/omit";
import { SessionUser } from "state/user";
import {
  useTeamByInviteQuery,
  useCreateInvitedUserMutation,
  useAcceptInviteMutation,
  TeamAnonFieldsFragment,
  Role,
} from "graphql/types";
import CheckLogin from "components/CheckLogin";

export const CREATE_INVITED_USER = gql`
  mutation createInvitedUser(
    $invite: String!
    $name: String
    $lastname: String
    $email: String!
    $password: String
  ) {
    createInvitedUser(
      invite: $invite
      name: $name
      lastname: $lastname
      email: $email
      password: $password
    ) {
      ...LoginFields
    }
  }
  ${CheckLogin.fragments.LoginFields}
`;

export const ACCEPT_INVITE = gql`
  mutation acceptInvite($invite: String!, $force: Boolean) {
    acceptInvite(invite: $invite, force: $force) {
      id
      name
      school {
        id
        name
        city
      }
    }
  }
`;

const Invite: React.FC<React.PropsWithChildren<unknown>> = () => {
  const existingUser = useUser();
  const [newUser, setUser] = useState<SessionUser | undefined>(undefined);
  const [error, setError] = useState("");
  const router = useRouter();
  const invite = String(router.query.invite);
  const teamQuery = useTeamByInviteQuery({ variables: { invite } });
  const team = teamQuery.data?.team;

  const [doCreateInvitedUser] = useCreateInvitedUserMutation({
    onCompleted(data) {
      setUser(data.createInvitedUser);
    },
    onError(err) {
      setError(err.message);
    },
  });
  const onSubmit = (values: Record<string, string | number>) =>
    doCreateInvitedUser({
      // TODO: our QForm component is not typed yet hence "as any"...
      // @ts-ignore
      // eslint-disable-next-line
      variables: { ...omit(values, "submit"), invite },
    });

  if (teamQuery.loading) {
    return <AppPage heading="Klassen-Einladung">wird geladen...</AppPage>;
  }
  if (teamQuery.error || !team) {
    return (
      <AppPage heading="Fehler">
        <Box minheight="400">
          Diese Einladung ist nicht (mehr) gültig. Bitte sprich mit Deiner
          Lehrperson.
          {teamQuery.error?.message && (
            <ErrorBox error={teamQuery.error.message} />
          )}
        </Box>
      </AppPage>
    );
  }

  if (existingUser) {
    return (
      <AppPage heading="Klassen-Einladung">
        <AcceptInvite user={existingUser} invite={invite} team={team} />
      </AppPage>
    );
  }

  if (newUser !== undefined) {
    return (
      <AppPage heading="Dein Konto ist erstellt">
        <Success user={newUser} />
      </AppPage>
    );
  }

  return (
    <AppPage heading="Klassen-Einladung">
      <Heading as="h2">
        Einladung für die Klasse «{team.name}» in der Schule «
        {team.school?.name}»
      </Heading>
      <Text mb={3} fontSize={[2, 2, 3]}>
        Erstelle einen neuen Schüler*innen Account für voty.ch. Bitte nutze die
        Email-Adresse deiner Schule.
      </Text>
      <CreateUserForm
        setUser={setUser}
        onSubmit={onSubmit}
        omitRole
        omitPassword
        omitFirstname
        omitLastname
        defaultRole="Student"
      >
        <ErrorBox error={error} mb={4} />
      </CreateUserForm>
    </AppPage>
  );
};

export default Invite;

type AcceptInviteProps = {
  invite: string;
  user: SessionUser;
  team: TeamAnonFieldsFragment;
};
const AcceptInvite: React.FC<React.PropsWithChildren<AcceptInviteProps>> = ({
  invite,
  team,
  user,
}) => {
  const [error, setError] = useState("");
  const [force, setForce] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [doAcceptInvite] = useAcceptInviteMutation({
    variables: { invite, force },
    onCompleted() {
      setSuccess(true);
      setError("");
    },
    onError(error) {
      if (error.message === "ALREADY_IN_TEAM") {
        setError("du bist bereits in einer Klasse angemeldet.");
      } else {
        setError(error.message);
      }
    },
  });
  if (success) {
    return (
      <>
        <Text my={4}>du bist nun angemeldet in der Klasse «{team.name}»</Text>
        <Button onClick={() => router.push("/")}>Weiter geht&apos;s</Button>
      </>
    );
  }
  if (!user) {
    return <Err msg="du musst dich zuerst anmelden" />;
  }
  if (team.teacherId === user.id) {
    return (
      <>
        <Heading as="h2">
          Einladung für die Klasse «{team.name}» in der Schule «
          {team.school?.name}»
        </Heading>
        <Text mb={3} fontSize={[2, 2, 3]}>
          Erstelle einen neuen Schüler*innen Account für voty.ch. Bitte nutze
          die Email-Adresse deiner Schule.
        </Text>
        <CreateUserForm
          setUser={() => alert("du bist bereits angemeldet")}
          onSubmit={() => alert("du bist bereits angemeldet")}
          omitRole
          omitPassword
          omitFirstname
          omitLastname
          defaultRole="Student"
        />
      </>
    );
  }
  if (user.role === Role.Teacher && !force) {
    return (
      <>
        <Text>
          Achtung: du bist auf der Einladungsseite der Klasse «{team.name}» aber
          du bist als Lehrperson angemeldet.
        </Text>
        <Err msg="du wirst voty.ch nicht mehr als Lehrperson verwenden können!" />
        <Button onClick={() => setForce(true)}>
          Als Schüler*in weiterfahren?
        </Button>
      </>
    );
  }
  return (
    <>
      <Text>
        Einladung für Klasse «{team.name}» in der Schule «{team.school?.name}»
      </Text>
      <Button my={4} onClick={() => doAcceptInvite()}>
        Einladung annehmen
      </Button>
      <ErrorBox error={error} />
    </>
  );
};
