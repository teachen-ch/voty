import { Loading, LoggedInPage } from "components/Page";
import { ShowProgress } from "components/Progress";
import { Role } from "graphql/types";
import { useTeam } from "state/user";

export default function TeamProgressPage(): React.ReactElement {
  const team = useTeam();

  if (!team)
    return (
      <LoggedInPage role={Role.Teacher} heading="Fortschritt der Klasse">
        <Loading />
      </LoggedInPage>
    );

  return (
    <LoggedInPage role={Role.Teacher} heading="Fortschritt der Klasse">
      <ShowProgress team={team} />
    </LoggedInPage>
  );
}
