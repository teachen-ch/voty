import { gql } from "@apollo/client";
import {
  Swissvote,
  SwissvotesQuery,
  usePostWorkMutation,
  UserWhereUniqueInput,
  useSwissvotesQuery,
} from "graphql/types";
import { Checkbox, Input, Label, Select, Textarea } from "@rebass/forms";
import { Box, Link, Text, Flex, Button } from "rebass";
import { Err, ErrorPage, Loading } from "./Page";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { A } from "./Breadcrumb";
import { formatYear } from "util/date";
import { CircleBullet } from "components/Cards";
import { debounce, find, remove } from "lodash";
import { Authors, WorkItem, Works } from "./Works";
import { useTeam, useUser } from "state/user";
import { Markdown } from "util/markdown";

export const SEARCH_SWISSVOTES = gql`
  query swissvotes(
    $keywords: String
    $type: Int
    $result: Int
    $hasPosters: Boolean
    $offset: Int
    $limit: Int
    $sort: String
  ) {
    swissvotes(
      keywords: $keywords
      type: $type
      result: $result
      hasPosters: $hasPosters
      offset: $offset
      limit: $limit
      sort: $sort
    ) {
      anr
      datum
      titel_kurz_d
      titel_off_d
      stichwort
      swissvoteslink
      rechtsform
      poster_ja
      poster_nein
      annahme
      volk
      stand
      kategorien
    }
  }
`;

type VoteType = ArrayElement<SwissvotesQuery["swissvotes"]>;

export const Swissvotes: React.FC<{
  votes?: VoteType[];
  setVotes?: (votes: VoteType[]) => void;
  limit?: number;
}> = ({ votes, setVotes, limit = 15 }) => {
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<number | undefined>();
  const [result, setResult] = useState<number | undefined>();
  const [offset, setOffset] = useState(0);

  // reset the offset when changing query parameters
  useEffect(() => {
    setOffset(0);
  }, [type, result, keywords]);

  function resetFilters() {
    setType(undefined);
    setResult(undefined);
  }

  return (
    <Box>
      <Flex mt={4}>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 400)}
          placeholder="Suche..."
        />
        <Button ml={3} px={5} height="100%" mt="3px">
          Suche
        </Button>
      </Flex>
      <Text mb={3} mt={1} fontSize={1}>
        Filtern nach:{" "}
        <Filter set={setType} v={type} val={3} label="Initiativen" sep />
        <Filter set={setType} v={type} val={1} label="Obl. Referenden" sep />
        <Filter set={setType} v={type} val={2} label="Fak. Referenden" sep />
        <Filter set={setResult} v={result} val={0} label="abgelehnt" sep />
        <Filter set={setResult} v={result} val={1} label="angenommen" />
      </Text>
      <VotesList
        votes={votes}
        setVotes={setVotes}
        query={{ keywords, type, result, offset, limit }}
        resetFilters={resetFilters}
      />
      <Flex justifyContent="space-between" mt={3}>
        <Link onClick={() => setOffset(offset - limit)} fontSize={1}>
          {offset >= limit ? "Neuere Abstimmungen anzeigen …" : ""}
        </Link>
        <Link onClick={() => setOffset(offset + limit)} fontSize={1}>
          {offset < 650 ? "… Ältere Abstimmungen anzeigen" : ""}
        </Link>
      </Flex>
    </Box>
  );
};

export const SwissvotesTopics: React.FC = () => {
  const user = useUser();
  const team = useTeam();
  const [topic, setTopic] = useState("");
  const [votes, setVotes] = useState<VoteType[]>([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState<UserWhereUniqueInput[]>([]);
  const [doPostWork] = usePostWorkMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(0);

  async function doSubmit() {
    if (!team || !user) {
      return;
    }
    const success = await doPostWork({
      variables: {
        data: {
          team: { connect: { id: team.id } },
          school: { connect: { id: user?.school?.id } },
          users: { connect: users },
          title: topic,
          text: text,
          card: "swissvotes_themen",
          data: {
            topic,
            votes,
            text,
          },
        },
      },
    });
    if (success) {
      setSuccess(true);
      setTrigger(trigger + 1);
    } else {
      setError("Es ist ein Fehler aufgetreten");
    }
  }

  return (
    <Box>
      <Text mb={3}>
        <CircleBullet value={1} />
        Wählt ein Thema aus, über das Ihr recherchieren möchtet:
      </Text>
      <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option value="">Thema auswählen</option>
        <option>Umweltpolitik</option>
        <option>Landwirtschaft</option>
        <option>Verkehr</option>
        <option>Sozialpolitik</option>
        <option>Armee</option>
      </Select>
      {topic && (
        <Box mt={4}>
          <Text mb={-20}>
            <CircleBullet value={2} /> Sucht in der Swissvotes Datenbank, zu was
            die Schweiz über das Thema «{topic}» abgestimmt hat und wählt drei
            Initiativen aus, die Euch wichtig erscheinen:
          </Text>
          <Swissvotes votes={votes} setVotes={setVotes} limit={10} />
        </Box>
      )}
      {votes.length ? (
        <Box mt={4}>
          <Text mb={2} fontWeight="bold">
            Ausgewählte Abstimmungen:{" "}
          </Text>
          <table style={{ borderTop: "2px solid white" }}>
            <tbody>
              {votes?.map(
                (vote) =>
                  vote && (
                    <Vote
                      key={vote.anr}
                      vote={vote}
                      votes={votes}
                      setVotes={setVotes}
                    />
                  )
              )}
            </tbody>
          </table>
          <Text mt={4}>
            <CircleBullet value={3} />
            Nun begründet, warum ihr diese Abstimmungen wichtig findet und was
            Euch bei der Recherche aufgefallen ist. Über welche Abstimmungen
            hättet ihr gerne selber abgestimmt?
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
            />
            <Label mt={3}>Erarbeitet durch:</Label>
            <Authors setUsers={setUsers} />
            {success ? (
              "Die Arbeit wurde gespeichert!"
            ) : (
              <Button mt={3} onClick={doSubmit}>
                Abschicken
              </Button>
            )}
            <Err msg={error} />
          </Text>
        </Box>
      ) : null}

      <Works
        mt={6}
        items={SwissvotesItem}
        card="swissvotes_themen"
        flexDirection="column"
        trigger={trigger}
      ></Works>
    </Box>
  );
};

const SwissvotesItem: WorkItem = ({ work }) => {
  return (
    <Box mb={4}>
      <Text my={2}>Thema: {work.data?.topic}</Text>
      <table style={{ borderTop: "2px solid white" }}>
        <tbody>
          {(work.data?.votes as VoteType[]).map(
            (vote) => vote && <Vote key={vote.anr} vote={vote} />
          )}
        </tbody>
      </table>
      <Text mt={3}>
        <Markdown>{work.data?.text}</Markdown>
      </Text>
    </Box>
  );
};

export const Filter: React.FC<{
  set: Dispatch<SetStateAction<any>>;
  v: string | number | undefined;
  val: string | number | undefined;
  label: string;
  sep?: boolean;
}> = ({ set, v, val, label, sep }) => (
  <>
    <A
      onClick={() => (v === val ? set(undefined) : set(val))}
      fontWeight={val === v ? "bold" : "normal"}
    >
      {label}
    </A>
    {sep && "  |  "}
  </>
);

export type VotesQuery = {
  keywords?: string;
  type?: number;
  result?: number;
  limit?: number;
  offset?: number;
  sort?: string;
  hasPosters?: boolean;
};

export const VotesList: React.FC<{
  query: VotesQuery;
  resetFilters: () => void;
  votes?: VoteType[];
  setVotes?: (votes: VoteType[]) => void;
}> = ({ query, resetFilters, votes, setVotes }) => {
  const swissvotesQuery = useSwissvotesQuery({
    variables: query,
  });
  const swissvotes = swissvotesQuery.data?.swissvotes;

  if (swissvotesQuery.loading) return <Loading />;
  if (swissvotesQuery.error)
    return <ErrorPage>{swissvotesQuery.error.message}</ErrorPage>;

  if (!swissvotes || swissvotes.length === 0)
    return (
      <Box my={4}>
        <Text mb={2}>Nichts gefunden…</Text>
        <Button onClick={resetFilters}>Filter löschen</Button>
      </Box>
    );

  return (
    <table style={{ borderTop: "2px solid white" }}>
      <tbody>
        {swissvotes?.map(
          (vote) =>
            vote && (
              <Vote
                key={vote.anr}
                vote={vote}
                votes={votes}
                setVotes={setVotes}
              />
            )
        )}
      </tbody>
    </table>
  );
};

export const Vote: React.FC<{
  vote: Swissvote;
  votes?: VoteType[];
  setVotes?: (votes: VoteType[]) => void;
}> = ({ vote, votes, setVotes }) => {
  function isSelected(vote: VoteType) {
    return find(votes, vote) ? true : false;
  }
  function doSelect(vote: VoteType) {
    if (votes && setVotes) {
      if (isSelected(vote)) {
        remove(votes, vote);
      } else {
        votes.push(vote);
      }
      setVotes(votes.slice());
    }
  }

  return (
    <tr style={{ fontSize: 16 }}>
      {setVotes && (
        <td onClick={() => doSelect(vote)}>
          <Checkbox bg="white" checked={isSelected(vote)} color="secondary" />
        </td>
      )}
      <td>{vote.datum && formatYear(vote.datum)}</td>
      <td style={{ maxWidth: "500px" }}>
        {vote.swissvoteslink && (
          <Link href={vote.swissvoteslink} target="_blank">
            {vote.titel_kurz_d}
          </Link>
        )}
      </td>
      <td style={{ maxWidth: "100px" }}>{getVoteType(vote.rechtsform)}</td>
      <td>{getVoteResult(vote.annahme)}</td>
    </tr>
  );
};

const SwissvoteTypes: Record<number, string> = {
  1: "Obl. Referendum",
  2: "Fak. Referendum",
  3: "Initiative",
  4: "Gegenvorschlag",
  5: "Stichfrage",
};

export function getVoteType(r?: number | null): string {
  return r ? SwissvoteTypes[r] || "" : "";
}

const SwissvoteResults: Record<number, string> = {
  0: "NEIN",
  1: "JA",
};

export function getVoteResult(r?: number | null): string {
  return r === null || r === undefined ? "-" : SwissvoteResults[r];
}
