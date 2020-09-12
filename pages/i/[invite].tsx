import { useRouter } from "next/router";
import { Page } from "../../components/Page";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ErrorBox } from "../../components/Form";
import { Heading, Button, Text } from "rebass";
import { useState } from "react";
import { CreateUserForm, Success } from "../user/signup";
import { useUser } from "../../state/user";
import { omit } from "lodash";
import CheckLogin from "../../components/CheckLogin";

const GET_INVITE_TEAM = gql`
  query($invite: String!) {
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

const CREATE_INVITED_USER = gql`
  mutation(
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
    }
  }
`;

const ACCEPT_INVITE = gql`
  mutation($invite: String!) {
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

export default function Invite(props) {
  const existingUser = useUser();
  const [newUser, setUser] = useState();
  const router = useRouter();
  const invite = String(router.query.invite);
  const teamQuery = useQuery(GET_INVITE_TEAM, {
    variables: { invite },
  });
  const team = teamQuery.data?.team;

  const [doCreateInvitedUser] = useMutation(CREATE_INVITED_USER, {
    onCompleted(data) {
      setUser(data.createInvitedUser);
    },
    onError(error) {
      console.error(error.message);
    },
  });
  const onSubmit = (values) =>
    doCreateInvitedUser({ variables: { ...omit(values, "submit"), invite } });

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

    if (newUser) {
      return <Success user={newUser} />;
    }

    return (
      <Page heading="Klassen-Einladung">
        <CheckLogin />
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
}

function AcceptInvite({ invite, user, team }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [doAcceptInvite] = useMutation(ACCEPT_INVITE, {
    variables: { invite },
    onCompleted(data) {
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
        <Button onClick={() => router.push("/")}>Weiter geht's</Button>
      </Page>
    );
  }
  return (
    <Page heading="Klassen-Einladung">
      <Text>
        Einladung für Klasse «{team.name}» im Schulhaus «{team.school?.name}»
      </Text>
      <Button my={4} onClick={doAcceptInvite}>
        Einladung annehmen
      </Button>
      <ErrorBox error={error} />
    </Page>
  );
}
