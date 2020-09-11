import { LoggedInPage } from "../../../components/Page";
import { Heading, Card, Text, Button, Link as A } from "rebass";
import { useTeamTeacher } from "../../../components/Teams";
import { useRouter } from "next/router";
import { Users } from "../../../components/Users";
import { Input } from "@rebass/forms";
import { Grid } from "theme-ui";
import { useRef, useState } from "react";

export default function Team() {
  const router = useRouter();
  const id = parseInt(String(router.query.id));
  const team = useTeamTeacher(id);
  const inviteRef = useRef(null);
  const [status, setStatus] = useState("");

  if (!team) return null;

  function copyInvite() {
    if (inviteRef && inviteRef.current) {
      inviteRef.current.select();
      document.execCommand("copy");
      setStatus("Einladungslink erfolgreich in Zwischenablage kopiert");
    }
  }

  return (
    <LoggedInPage heading="Klassenseite">
      <Heading as="h2">Seite der Klasse {team && `«${team.name}»`}</Heading>
      <Heading as="h3">Schüler|innen</Heading>
      <Users where={{ team: { id: { equals: team.id } } }} />

      <Card>
        <Grid my={4} gap={2} columns={[0, 0, "1fr 3fr 1fr"]}>
          <b>Einladungslink: </b>
          <Input
            ref={inviteRef}
            value={`${document?.location.origin}/i/${team.invite}`}
          />
          <Button onClick={copyInvite}>Copy</Button>
          <span />
          <Text>{status}</Text>
        </Grid>
      </Card>
    </LoggedInPage>
  );
}
