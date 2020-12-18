import { gql } from "@apollo/client";
import { Swissvote, SwissvotesQuery, useSwissvotesQuery } from "graphql/types";
import { Input } from "@rebass/forms";
import { Box, Link, Text, Flex, Button, Image } from "rebass";
import { ErrorPage, Loading } from "./Page";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { A } from "./Breadcrumb";
import { formatYear } from "util/date";
import { debounce } from "lodash";

export const SEARCH_SWISSVOTES = gql`
  query swissvotes(
    $keywords: String
    $type: Int
    $result: Int
    $hasPosters: Boolean
    $offset: Int
    $limit: Int
  ) {
    swissvotes(
      keywords: $keywords
      type: $type
      result: $result
      hasPosters: $hasPosters
      offset: $offset
      limit: $limit
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

export const Swissvotes: React.FC = () => {
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<number | undefined>();
  const [result, setResult] = useState<number | undefined>();
  const [offset, setOffset] = useState(0);
  const limit = 15;

  // reset the offset when changing query parameters
  useEffect(() => {
    setOffset(0);
  }, [type, result, keywords]);

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
      <VotesList query={{ keywords, type, result, offset, limit }} />
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

const Filter: React.FC<{
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

type VotesQuery = {
  keywords?: string;
  type?: number;
  result?: number;
  limit?: number;
  offset?: number;
  sort?: string;
  hasPosters?: boolean;
};

export const VotesList: React.FC<{ query: VotesQuery }> = ({ query }) => {
  const swissvotesQuery = useSwissvotesQuery({
    variables: query,
  });
  const swissvotes = swissvotesQuery.data?.swissvotes;

  if (swissvotesQuery.loading) return <Loading />;
  if (swissvotesQuery.error)
    return <ErrorPage>{swissvotesQuery.error.message}</ErrorPage>;

  if (!swissvotes || swissvotes.length === 0)
    return <Box my={4}>Nichts gefunden…</Box>;

  return (
    <table style={{ borderTop: "2px solid white" }}>
      <tbody>
        {swissvotes?.map(
          (vote) => vote && <Vote key={vote.anr!} vote={vote} />
        )}
      </tbody>
    </table>
  );
};

export const Vote: React.FC<{ vote: Swissvote }> = ({ vote }) => {
  return (
    <tr style={{ fontSize: 16 }}>
      <td>{formatYear(vote.datum!)}</td>
      <td style={{ maxWidth: "500px" }}>
        <Link href={vote.swissvoteslink!} target="_blank">
          {vote.titel_kurz_d}
        </Link>
      </td>
      <td style={{ maxWidth: "100px" }}>{getVoteType(vote.rechtsform!)}</td>
      <td>{getVoteResult(vote.annahme!)}</td>
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

export function getVoteType(r: number) {
  return SwissvoteTypes[r] || "";
}

const SwissvoteResults: Record<number, string> = {
  0: "NEIN",
  1: "JA",
};

export function getVoteResult(r: number) {
  return SwissvoteResults[r] || "–";
}

export const Posters: React.FC = () => {
  const [keywords, setKeywords] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 10;
  return (
    <>
      <Flex mt={4}>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 400)}
          placeholder="Suche..."
        />
        <Button ml={3} px={5} height="100%" mt="3px">
          Suche
        </Button>
      </Flex>
      <PosterList query={{ keywords, limit, offset, hasPosters: true }} />
      <Flex justifyContent="space-between" mt={2}>
        <Link onClick={() => setOffset(offset - limit)} fontSize={1}>
          {offset > 0 ? "Neuere Plakate anzeigen" : ""}
        </Link>
        <Link onClick={() => setOffset(offset + limit)} fontSize={1}>
          {offset < 650 ? "Ältere Plakate anzeigen" : ""}
        </Link>
      </Flex>
    </>
  );
};

export const PosterList: React.FC<{ query: VotesQuery }> = ({ query }) => {
  const swissvotesQuery = useSwissvotesQuery({
    variables: query,
  });
  const swissvotes = swissvotesQuery.data?.swissvotes;

  if (swissvotesQuery.loading) return <Loading />;
  if (swissvotesQuery.error)
    return <ErrorPage>{swissvotesQuery.error.message}</ErrorPage>;

  if (!swissvotes || swissvotes.length === 0)
    return <Box my={4}>Nichts gefunden…</Box>;

  return (
    <>
      <Box sx={{ columnCount: 3, columnGap: "8px" }} mt={3}>
        {swissvotes?.map((vote) => {
          let posters: string[] = [];
          if (vote && vote.poster_ja)
            posters = posters.concat(vote.poster_ja.split(" "));
          if (vote && vote.poster_nein)
            posters = posters.concat(vote.poster_nein.split(" "));
          if (vote && posters.length > 0) {
            return posters.map((p) => <Poster key={p} vote={vote} image={p} />);
          } else return null;
        })}
      </Box>
    </>
  );
};

export const Poster: React.FC<{ vote: Swissvote; image: string }> = ({
  vote,
  image,
}) => {
  const [hover, setHover] = useState(false);
  const copyright = image.replace(/.*\:\/\/(?:www\.)?(.*?)\/.*/, "$1");
  return (
    <Box
      width="calc(100% - 8px)"
      mb={3}
      bg="white"
      p={2}
      sx={{ position: "relative" }}
    >
      {hover && (
        <Box
          sx={{ position: "absolute", hyphens: "auto", cursor: "pointer" }}
          bg="rgba(1,1,1,0.5)"
          p={2}
          width="calc(100%  - 16px)"
          height="calc(100% - 16px)"
          onMouseOut={() => setHover(false)}
          onClick={() => window.open(vote.swissvoteslink!, "_blank")}
        >
          <Text fontWeight="bold" fontSize={2} sx={{ wordWrap: "break-word" }}>
            {vote.titel_kurz_d}
          </Text>
          <Text fontSize={1} my={2}>
            Jahr: {formatYear(vote.datum!)}
          </Text>
          <Text fontSize={1}>&copy; {copyright}</Text>
        </Box>
      )}
      <Image src={image} onMouseOver={() => setHover(true)} />
    </Box>
  );
};
