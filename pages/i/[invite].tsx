import { useRouter } from "next/router";
import { AppPage } from "../../components/Page";
import { gql } from "@apollo/client";
import { ErrorBox } from "../../components/Form";
import { Heading, Box, Button, Text } from "rebass";
import { useState } from "react";
import { CreateUserForm } from "../user/signup";
import Success from "../user/success";
import { useUser } from "../../state/user";
import { omit } from "lodash";
import { SessionUser } from "state/user";
import {
  useTeamByInviteQuery,
  useCreateInvitedUserMutation,
  useAcceptInviteMutation,
  TeamAnonFieldsFragment,
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
  mutation acceptInvite($invite: String!) {
    acceptInvite(invite: $invite) {
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

const Invite: React.FC = () => {
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
        <Box minHeight="400px">
          Diese Einladung ist nicht gültig. Bitte sprich mit Deiner Lehrperson.
          {teamQuery.error?.message && (
            <ErrorBox error={teamQuery.error.message} />
          )}
        </Box>
      </AppPage>
    );
  }

  if (existingUser) {
    return <AcceptInvite user={existingUser} invite={invite} team={team} />;
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
        Email-Adresse Deiner Schule.
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
  user: SessionUser; // TODO: NEXUSTYPE find out how to import Nexus Types here
  team: TeamAnonFieldsFragment; // TODO: NEXUSTYPE find out how to import Nexus Types here
};
const AcceptInvite: React.FC<AcceptInviteProps> = ({ invite, team }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [doAcceptInvite] = useAcceptInviteMutation({
    variables: { invite },
    onCompleted() {
      setSuccess(true);
      setError("");
    },
    onError(error) {
      if (error.message === "ALREADY_IN_TEAM") {
        setError("Du bist bereits in einer Klasse angemeldet.");
      } else {
        setError(error.message);
      }
    },
  });
  if (success) {
    return (
      <AppPage heading="Klassen-Einladung">
        <Text my={4}>Du bist angemeldet in der Klasse «{team.name}»</Text>
        <Button onClick={() => router.push("/")}>Weiter geht&apos;s</Button>
      </AppPage>
    );
  }
  return (
    <AppPage heading="Klassen-Einladung">
      <Text>
        Einladung für Klasse «{team.name}» in der Schule «{team.school?.name}»
      </Text>
      <Button my={4} onClick={() => doAcceptInvite()}>
        Einladung annehmen
      </Button>
      <ErrorBox error={error} />
    </AppPage>
  );
};
