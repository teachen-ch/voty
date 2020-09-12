import { LoggedInPage, Page } from "../../../components/Page";
import { Heading, Flex, Box, Card, Text, Button, Link as A } from "rebass";
import { useTeamTeacher } from "../../../components/Teams";
import { useRouter } from "next/router";
import { Users } from "../../../components/Users";
import { Input } from "@rebass/forms";
import { Grid } from "theme-ui";
import { useRef, useState } from "react";
import { useUser } from "state/user";
import { Ballots, BallotScope } from "components/Ballots";

export default function TeamPage() {
  const user = useUser();
  const router = useRouter();
  const [active, setActive] = useState("admin");
  const id = parseInt(String(router.query.id));
  const team = useTeamTeacher(id, user);

  if (!team)
    return (
      <LoggedInPage heading="Klassenseite">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );

  return (
    <LoggedInPage heading="Klassenseite">
      <TeamNavigation active={active} setActive={setActive} />
      {active === "admin" ? (
        <TeamAdmin team={team} />
      ) : (
        <TeamTest team={team} />
      )}
    </LoggedInPage>
  );
}

function TeamNavigation({ active, setActive }) {
  return (
    <Grid gap={3} columns={[0, 0, "1fr 1fr 1fr 1fr"]}>
      <Button
        variant={active === "admin" ? "primary" : "secondary"}
        onClick={() => setActive("admin")}
      >
        Administration
      </Button>
      <Button
        variant={active === "learn" ? "primary" : "secondary"}
        onClick={() => setActive("learn")}
      >
        Demokratie testen
      </Button>
      <Button variant="muted">Demokratie verstehen</Button>
      <Button variant="muted">Demokratie erleben</Button>
    </Grid>
  );
}

function TeamAdmin({ team }) {
  const inviteRef = useRef(null);
  const [status, setStatus] = useState("");

  function copyInvite(ref) {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setStatus("Einladungslink erfolgreich in Zwischenablage kopiert");
    }
  }
  return (
    <>
      <Heading as="h2">Schüler|innen</Heading>
      <Users where={{ team: { id: { equals: team.id } } }} />

      <Card>
        <Grid my={4} gap={2} columns={[0, 0, "1fr 3fr 1fr"]}>
          <b>Einladungslink: </b>
          <Input
            ref={inviteRef}
            value={`${document?.location.origin}/i/${team.invite}`}
          />
          <Button onClick={() => copyInvite(inviteRef)}>Copy</Button>
          <span />
          <Text>{status}</Text>
        </Grid>
      </Card>
    </>
  );
}

function TeamTest({ team }) {
  const router = useRouter();
  function selectBallot(ballot) {
    router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }
  return (
    <>
      <Heading as="h2">Demokratie Testen: Nationale Abstimmungen</Heading>
      <Ballots where={{ scope: BallotScope.NATIONAL }} onClick={selectBallot} />
    </>
  );
}
