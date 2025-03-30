import { gql } from "@apollo/client";
import {
  Swissvote,
  SwissvotesQuery,
  UserWhereUniqueInput,
  useSwissvotesQuery,
} from "graphql/types";
import { Checkbox, Input, Label, Select, Textarea } from "@rebass/forms";
import { Box, Link, Text, Flex, Button } from "rebass";
import { Err, ErrorPage, Loading } from "./Page";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { A } from "./Breadcrumb";
import { formatYear } from "util/date";
import { CircleBullet } from "components/Misc";
import { Authors, usePostWork, WorkCard, WorkItem, Works } from "./Works";
import { Markdown } from "util/markdown";
import { Table, TR, TD } from "components/Table";
import find from "lodash/find";
import remove from "lodash/remove";

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

export const Swissvotes: React.FC<
  React.PropsWithChildren<{
    votes?: VoteType[];
    setVotes?: (votes: VoteType[]) => void;
    limit?: number;
    keyword?: string;
  }>
> = ({ votes, setVotes, limit = 15, keyword = "" }) => {
  const [keywords, setKeywords] = useState(keyword);
  const [type, setType] = useState<number | undefined>();
  const [result, setResult] = useState<number | undefined>();
  const [offset, setOffset] = useState(0);

  // reset the pagination offset when changing query parameters
  useEffect(() => {
    setOffset(0);
  }, [type, result, keywords]);

  useEffect(() => {
    setKeywords(keyword);
  }, [keyword]);

  function resetFilters() {
    setType(undefined);
    setResult(undefined);
  }

  return (
    <Box>
      <Flex mt={4}>
        <Input
          value={keywords}
          // TODO: debouncing does not work here
          onChange={(evt) => setKeywords(evt.target.value)}
          placeholder="Suche..."
          flex={1}
        />
        <Button ml={3} flex={0.3} mt={[0, 0, "4px"]}>
          Suche
        </Button>
      </Flex>
      <Text mb={4} mt={2} fontSize={1}>
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

export const SwissvotesTopics: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const [topic, setTopic] = useState("");
  const [votes, setVotes] = useState<VoteType[]>([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState<UserWhereUniqueInput[]>([]);
  const [trigger, setTrigger] = useState(0);
  const [doPostWork, state] = usePostWork({
    card: "swissvotes_themen",
    title: topic,
    text,
    users,
    data: {
      topic,
      votes,
      text,
    },
    setTrigger,
  });
  const success = state.called && !state.error;

  return (
    <Box>
      <Text mb={3}>
        <CircleBullet value={1} />
        Wählt ein Thema aus, über das ihr recherchieren möchtet:
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
            <CircleBullet value={2} /> Sucht hier in der Swissvotes Datenbank,
            zu was die Schweiz über das Thema «{topic}» abgestimmt hat und wählt
            drei Initiativen aus, die euch wichtig erscheinen:
          </Text>
          <Swissvotes
            keyword={topic}
            votes={votes}
            setVotes={setVotes}
            limit={10}
          />
        </Box>
      )}
      {votes.length ? (
        <Box mt={4}>
          <Text mb={2} fontWeight="bold">
            Ausgewählte Abstimmungen:{" "}
          </Text>
          <Table>
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
          </Table>
          <Text mt={4}>
            <CircleBullet value={3} />
            Nun begründet, warum ihr diese Abstimmungen wichtig findet und was
            euch bei der Recherche aufgefallen ist. Über welche Abstimmungen
            hättet ihr gerne selber abgestimmt?
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
            />
            <Label mt={3}>Erarbeitet durch:</Label>
            <Authors setUsers={setUsers} />
            {success ? (
              <Text mt={3}>Die Arbeit wurde gespeichert!</Text>
            ) : (
              <Button mt={3} onClick={doPostWork}>
                Abschicken
              </Button>
            )}
            <Err msg={state.error?.message} />
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
    <WorkCard>
      <Text mb={2} fontWeight="semi">
        Thema: {work.data?.topic}
      </Text>
      <Table sx={{ border: "none", borderTop: "1px solid gray" }}>
        {(work.data?.votes as VoteType[]).map(
          (vote) => vote && <Vote key={vote.anr} vote={vote} />
        )}
      </Table>
      <Text mt={3}>
        <Markdown>{work.data?.text}</Markdown>
      </Text>
    </WorkCard>
  );
};

export const Filter: React.FC<
  React.PropsWithChildren<{
    set: Dispatch<SetStateAction<any>>;
    v: string | number | undefined;
    val: string | number | undefined;
    label: string;
    sep?: boolean;
  }>
> = ({ set, v, val, label, sep }) => (
  <>
    <A
      onClick={() => (v === val ? set(undefined) : set(val))}
      sx={{
        fontWeight: val === v ? "bold" : "normal",
        textDecoration: val === v ? "underline" : "none",
      }}
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

export const VotesList: React.FC<
  React.PropsWithChildren<{
    query: VotesQuery;
    resetFilters: () => void;
    votes?: VoteType[];
    setVotes?: (votes: VoteType[]) => void;
  }>
> = ({ query, resetFilters, votes, setVotes }) => {
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
    <Table>
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
    </Table>
  );
};

export const Vote: React.FC<
  React.PropsWithChildren<{
    vote: Swissvote;
    votes?: VoteType[];
    setVotes?: (votes: VoteType[]) => void;
  }>
> = ({ vote, votes, setVotes }) => {
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
    <TR>
      {setVotes && (
        <TD fixed onClick={() => doSelect(vote)}>
          <Checkbox bg="#fff" checked={isSelected(vote)} color="primary" />
        </TD>
      )}
      <TD fixed>{vote.datum && formatYear(vote.datum)}</TD>
      <TD flexy>
        {vote.swissvoteslink && (
          <Link href={vote.swissvoteslink} target="_blank">
            {vote.titel_kurz_d}
          </Link>
        )}
      </TD>
      <TD fixed smHide>
        {getVoteType(vote.rechtsform)}
      </TD>
      <TD fixed width="60" textAlign="center">
        {getVoteResult(vote.annahme)}
      </TD>
    </TR>
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
