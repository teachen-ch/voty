import { useRouter } from "next/router";
import { Page } from "components/Page";
import { gql, useQuery } from "@apollo/client";
import { ErrorBox } from "components/forms";

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

export default function Invite(props) {
  const router = useRouter();
  const invite = String(router.query.invite);
  const teamQuery = useQuery(GET_INVITE_TEAM, {
    variables: { invite },
  });
  const team = teamQuery.data?.team;

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
    return (
      <Page heading="Klassen-Einladung">
        Name: {team.name}
        <br />
        Schulhaus: {team.school?.name}
      </Page>
    );
  } else {
    return <Page heading="Klassen-Einladung">Lade Einladung</Page>;
  }
}
