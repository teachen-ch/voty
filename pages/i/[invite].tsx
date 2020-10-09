import { useRouter } from "next/router";
import { Page } from "../../components/Page";
import { gql } from "@apollo/client";
import { ErrorBox } from "../../components/Form";
import { Heading, Button, Text } from "rebass";
import { useState } from "react";
import { CreateUserForm, Success } from "../user/signup";
import { useUser } from "../../state/user";
import { omit } from "lodash";
import { SessionUser } from "state/user";
import {
  useTeamByInviteQuery,
  useCreateInvitedUserMutation,
  useAcceptInviteMutation,
} from "graphql/types";

export const GET_INVITE_TEAM = gql`
  query teamByInvite($invite: String!) {
    team(where: { invite: $invite }) {
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
      id
      name
      email
      lastname
      shortname
      role
      email
    }
  }
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
  const router = useRouter();
  const invite = String(router.query.invite);
  const teamQuery = useTeamByInviteQuery({ variables: { invite } });
  const team = teamQuery.data?.team;

  const [doCreateInvitedUser] = useCreateInvitedUserMutation({
    onCompleted(data) {
      setUser(data.createInvitedUser);
    },
    onError(error) {
      console.error(error.message);
    },
  });
  const onSubmit = (values: { [key: string]: string }) =>
    doCreateInvitedUser({
      // TODO: our QForm component is not typed yet hence "as any"...
      variables: { ...(omit(values, "submit") as any), invite },
    });

  if (teamQuery.error) {
    return (
      <Page heading="Fehler">
        Diese Einladung ist nicht gültig. Bitte sprich mit Deiner Lehrperson.
        <br />
        <br />
        <ErrorBox error={teamQuery.error.message} />
      </Page>
    );
  }

  if (team) {
    if (existingUser) {
      return <AcceptInvite user={existingUser} invite={invite} team={team} />;
    }

    if (newUser !== undefined) {
      return <Success user={newUser} />;
    }

    return (
      <Page heading="Klassen-Einladung">
        <Heading as="h2">
          Einladung für die Klasse «{team.name}» im Schulhaus «
          {team.school?.name}»
        </Heading>
        <Text>
          Erstelle einen neuen Account für Voty. Bitte nutze die Email-Adresse
          Deiner Schule.
        </Text>
        <CreateUserForm setUser={setUser} onSubmit={onSubmit} />
      </Page>
    );
  } else {
    return <Page heading="Klassen-Einladung">Lade Einladung</Page>;
  }
};

export default Invite;

type AcceptInviteProps = {
  invite: string;
  user: any; // TODO: NEXUSTYPE find out how to import Nexus Types here
  team: any; // TODO: NEXUSTYPE find out how to import Nexus Types here
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
      <Page heading="Klassen-Einladung">
        <Text my={4}>Du bist angemeldet in der Klasse «{team.name}»</Text>
        <Button onClick={() => router.push("/")}>Weiter geht&apos;s</Button>
      </Page>
    );
  }
  return (
    <Page heading="Klassen-Einladung">
      <Text>
        Einladung für Klasse «{team.name}» im Schulhaus «{team.school?.name}»
      </Text>
      <Button my={4} onClick={() => doAcceptInvite()}>
        Einladung annehmen
      </Button>
      <ErrorBox error={error} />
    </Page>
  );
};
