import { Page, ErrorPage } from "components/Page";
import { Text, Heading, Box, Card, Flex, Button } from "rebass";
import { useRouter } from "next/router";
import { useUser } from "state/user";
import { formatFromTo } from "util/date";
import { useBallotQuery, BallotQuery } from "graphql/types";
import { useState, ReactElement } from "react";
import { useMutation, gql } from "@apollo/client";
import { ErrorBox } from "components/Form";
import Info from "components/Info";
import Link from "next/link";

export default function BallotPage(): ReactElement {
  const router = useRouter();
  const id = String(router.query.id);
  const ballotQuery = useBallotQuery({ variables: { where: { id } } });

  if (ballotQuery.loading) return <Page heading="Abstimmungsseite"></Page>;
  if (ballotQuery.error)
    return <ErrorPage>{ballotQuery.error.message}</ErrorPage>;

  const ballot = ballotQuery.data?.ballot;

  if (!ballot)
    return (
      <Page heading="Abstimmung">Abstimmung konnte nicht gefunden werden</Page>
    );

  return (
    <Page heading="Abstimmung">
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
      <VotyNow ballot={ballot} />
    </Page>
  );
}

const VOTE = gql`
  mutation vote($ballotId: String!, $vote: Int!) {
    vote(ballotId: $ballotId, vote: $vote) {
      verify
      ballot {
        id
        canVote
        hasVoted
      }
    }
  }
`;

const VotyNow: React.FC<{ ballot: BallotQuery["ballot"] }> = ({ ballot }) => {
  if (!ballot) return null;
  const [error, setError] = useState("");
  const user = useUser();
  const [success, setSuccess] = useState(false);
  const [doVote] = useMutation(VOTE, {
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      setError(err.message);
    },
  });

  if (!user) {
    return (
      <Info type="default">
        Um über diese Abstimmung abzustimmen, musst Du dich zu erst{" "}
        <Link href="/user/login">anmelden</Link>.
      </Info>
    );
  }

  if (ballot.hasVoted === true || success) {
    return (
      <BigButton color="gray" width="100%">
        Du hast erfolgreich abgestimmt ✅
      </BigButton>
    );
  }

  const now = new Date();
  if (new Date(ballot.start) > now) {
    return (
      <BigButton color="gray" width="100%">
        Abstimmung noch nicht gestartet
      </BigButton>
    );
  }
  if (new Date(ballot.end) < now) {
    return (
      <BigButton color="gray" width="100%">
        Abstimmung ist beendet
      </BigButton>
    );
  }

  if (ballot.canVote === false) {
    return (
      <BigButton color="gray" width="100%">
        Du bist nicht für die Abstimmung berechtigt
      </BigButton>
    );
  }

  async function vote(ballot: BallotQuery["ballot"], vote: number) {
    return doVote({ variables: { ballotId: ballot?.id, vote } });
  }

  return (
    <Box my={4}>
      <Flex>
        <BigButton color="green" onClick={() => vote(ballot, 1)}>
          Ja, ich stimme zu
        </BigButton>
        <BigButton color="primary" onClick={() => vote(ballot, 2)}>
          Nein, ich lehne ab
        </BigButton>
      </Flex>
      <ErrorBox my={2} error={error} />
    </Box>
  );
};

const BigButton: React.FC<{
  color: string;
  onClick?: () => void;
  width?: string;
}> = (props) => (
  <Button
    sx={{ border: "5px solid", borderColor: props.color }}
    fontSize={[3, 3, 4]}
    bg="white"
    color={props.color}
    mr={2}
    py={4}
    flex="1"
    disabled={!props.onClick}
    onClick={props.onClick}
    width={props.width}
  >
    {props.children}
  </Button>
);

// TODO: this is a joke markdown parser after being frustrated with mdx-js
function parseMarkdown(str: string) {
  str = str.replace(/^\s*#\s+(.*?)$/gm, "<h1>$1</h1>");
  str = str.replace(/^\s*##\s+(.*?)$/gm, "<h2>$1</h2>");
  str = str.replace(/^\s*###\s+(.*?)$/gm, "<h3>$1</h3>");
  str = str.replace(/^\s*####\s+(.*?)$/gm, "<h4>$1</h4>");
  str = str.replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>");
  str = str.replace(/\n/g, "<br/>");
  str = str.replace(/(<\/h\d>)<br\/>\s*/g, "$1");
  str = str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return { __html: str };
}
