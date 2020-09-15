import { LoggedInPage } from "../../../../components/Page";
import { Heading, Card, Text, Button } from "rebass";
import { useTeamTeacher } from "../../../../components/Teams";
import { Users } from "../../../../components/Users";
import { Input } from "@rebass/forms";
import { Grid, Label } from "theme-ui";
import { useRef, useState, RefObject } from "react";
import { useUser } from "state/user";
import { Team } from "graphql/types";
import { Navigation, Route } from "components/Navigation";
import { useRouter } from "next/router";

export default function TeamPage() {
  const user = useUser();
  const router = useRouter();
  const id = parseInt(String(router.query.id));
  const team = useTeamTeacher(id, user);
  const inviteRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  function copyInvite(ref: RefObject<any>) {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setStatus("Einladungslink erfolgreich in Zwischenablage kopiert");
    }
  }

  if (!team) {
    return (
      <LoggedInPage heading="Klassenseite">
        Team konnte nicht gefunden werden
      </LoggedInPage>
    );
  }

  return (
    <LoggedInPage heading="Klassenseite">
      <TeacherTeamNavigation team={team} />
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
    </LoggedInPage>
  );
}

export function TeacherTeamNavigation({ team }: { team: Team }) {
  return (
    <Navigation>
      <Route
        href="/teacher/team/[id]/admin"
        as={`/teacher/team/${team?.id}/admin`}
        label="Administration"
      />
      <Route
        href="/teacher/team/[id]/test"
        as={`/teacher/team/${team?.id}/test`}
        label="Demokratie testen"
      />
      <Route
        href="/teacher/team/[id]/learn"
        as={`/teacher/team/${team?.id}/learn`}
        label="Demokratie lernen"
        disabled
      />
      <Route
        href="/teacher/team/[id]/experience"
        as={`/teacher/team/${team?.id}/experience`}
        label="Demokratie leben"
        disabled
      />
    </Navigation>
  );
}
