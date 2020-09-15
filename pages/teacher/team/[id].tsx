import { LoggedInPage } from "../../../components/Page";
import { Heading, Card, Text, Button } from "rebass";
import { useTeamTeacher } from "../../../components/Teams";
import { useRouter } from "next/router";
import { Users } from "../../../components/Users";
import { Input } from "@rebass/forms";
import { Grid, Label } from "theme-ui";
import { useRef, useState, RefObject } from "react";
import { useUser } from "state/user";
import { Ballots } from "components/Ballots";
import { Ballot, Team } from "graphql/types";
import { BallotScope } from "components/Ballots";
import { useNavHash } from "util/hooks";

export default function TeamPage() {
  const user = useUser();
  const router = useRouter();
  const [hash, navHash] = useNavHash("/teacher/team/[id]", "#admin");
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
      <TeamNavigation hash={hash} navHash={navHash} />
      {hash === "#admin" ? <TeamAdmin team={team} /> : <TeamTest team={team} />}
    </LoggedInPage>
  );
}

function TeamNavigation({
  hash,
  navHash,
}: {
  hash: string;
  navHash: (hash: string) => void;
}) {
  return (
    <Grid gap={3} columns={[0, 0, "1fr 1fr 1fr 1fr"]}>
      <Button
        variant={hash === "#admin" ? "primary" : "secondary"}
        onClick={() => navHash("#admin")}
      >
        Administration
      </Button>
      <Button
        variant={hash === "#learn" ? "primary" : "secondary"}
        onClick={() => navHash("#learn")}
      >
        Demokratie testen
      </Button>
      <Button variant="muted">Demokratie verstehen</Button>
      <Button variant="muted">Demokratie erleben</Button>
    </Grid>
  );
}

function TeamAdmin({ team }: { team: Team }) {
  const inviteRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  function copyInvite(ref: RefObject<any>) {
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
        <Grid my={1} gap={2} columns={[0, 0, "1fr 3fr 1fr"]}>
          <Label sx={{ alignSelf: "center", fontWeight: "bold" }}>
            Einladungslink:{" "}
          </Label>
          <Input
            ref={inviteRef}
            readOnly
            value={`${document?.location.origin}/i/${team.invite}`}
          />
          <Button onClick={() => copyInvite(inviteRef)}>Copy</Button>
          <span />
          <Text fontSize={1}>{status}</Text>
        </Grid>
      </Card>
    </>
  );
}

function TeamTest() {
  const router = useRouter();
  function selectBallot(ballot: Ballot) {
    router.push("/ballots/[id]", `/ballots/${ballot.id}`);
  }
  return (
    <>
      <Heading as="h2">Demokratie Testen: Nationale Abstimmungen</Heading>
      <Ballots where={{ scope: BallotScope.National }} onClick={selectBallot} />
    </>
  );
}
