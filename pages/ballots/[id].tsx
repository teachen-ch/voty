import { LoggedInPage, ErrorPage } from "components/Page";
import { Text } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { useBallot } from "components/Ballots";
import { formatFromTo } from "util/date";

export default function BallotPage() {
  const user = useUser();
  const router = useRouter();
  const id = parseInt(String(router.query.id));
  const { data, loading, error } = useBallot(id);

  if (loading) return <LoggedInPage heading="Laden"></LoggedInPage>;
  if (error) return <ErrorPage>{error.message}</ErrorPage>;

  const ballot = data?.ballot;

  if (!ballot)
    return (
      <LoggedInPage heading="Abstimmungsseite">
        Abstimmung konnte nicht gefunden werden
      </LoggedInPage>
    );

  return (
    <LoggedInPage heading={ballot.title}>
      <Text my={2}>Dauer: {formatFromTo(ballot.start, ballot.end)}</Text>
      <Text my={2}>Kurzbeschrieb: {ballot.description}</Text>
      <Text my={2}>{ballot.body}</Text>
    </LoggedInPage>
  );
}
