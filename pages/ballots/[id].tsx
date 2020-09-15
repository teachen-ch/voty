import { LoggedInPage, ErrorPage } from "components/Page";
import { Text, Heading, Box, Card } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { useBallot } from "components/Ballots";
import { formatFromTo } from "util/date";
import { Center } from "components/Learning";

export default function BallotPage() {
  const user = useUser();
  const router = useRouter();
  const id = parseInt(String(router.query.id));
  const { data, loading, error } = useBallot(id);

  if (loading) return <LoggedInPage heading="Abstimmungsseite"></LoggedInPage>;
  if (error) return <ErrorPage>{error.message}</ErrorPage>;

  const ballot = data?.ballot;

  if (!ballot)
    return (
      <LoggedInPage heading="Abstimmungsseite">
        Abstimmung konnte nicht gefunden werden
      </LoggedInPage>
    );

  return (
    <LoggedInPage heading="Abstimmungsseite">
      <Heading as="h2">{ballot.title}</Heading>
      <Text my={2}>{ballot.description}</Text>
      <Text my={2}>📅 Dauer: {formatFromTo(ballot.start, ballot.end)}</Text>
      <Card>
        <Text textAlign="center">
          <img
            width={150}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.engage.ch%2Fsites%2Fdefault%2Ffiles%2Frequests%2Feasyvote.png&f=1&nofb=1"
          />
        </Text>
        <div dangerouslySetInnerHTML={parseMarkdown(ballot.body)} />
      </Card>
    </LoggedInPage>
  );
}

// TODO: this is a joke markdown parser after being frustrated with mdx-js
function parseMarkdown(str: string) {
  str = str.replace(/^\s*\#\s+(.*?)$/gm, "<h1>$1</h1>");
  str = str.replace(/^\s*\#\#\s+(.*?)$/gm, "<h2>$1</h2>");
  str = str.replace(/^\s*\#\#\#\s+(.*?)$/gm, "<h3>$1</h3>");
  str = str.replace(/^\s*\#\#\#\#\s+(.*?)$/gm, "<h4>$1</h4>");
  str = str.replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>");
  str = str.replace(/\n/g, "<br/>");
  str = str.replace(/(<\/h\d>)<br\/>\s*/g, "$1");
  str = str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return { __html: str };
}
