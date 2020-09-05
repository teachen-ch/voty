import { useRouter } from "next/router";
import { Page } from "../../components/Page";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ErrorBox } from "../../components/forms";
import { Heading, Button, Text } from "rebass";
import { useState } from "react";
import { CreateUserForm, Success } from "../user/signup";
import { useUser } from "../../state/user";
import _ from "lodash";

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
      console.log("Success");
    },
    onError(error) {
      console.error(error.message);
    },
  });
  const onSubmit = (values) =>
    doCreateInvitedUser({ variables: { ..._.omit(values, "submit"), invite } });

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
      return (
        <Page heading="Klassen-Einladung">
          Du bist bereits eingeloggt.
          <Heading as="h2">
            Einladung für die Klasse «{team.name}» im Schulhaus «
            {team.school?.name}»
          </Heading>
          <Button onClick="() => {}">Einladung annehmen</Button>
        </Page>
      );
    }

    if (newUser) {
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
}
