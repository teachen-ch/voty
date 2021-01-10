import { Swissvote, useSwissvotesQuery } from "graphql/types";
import { Input } from "@rebass/forms";
import { Box, Link, Text, Flex, Button, Image } from "rebass";
import { ErrorPage, Loading } from "./Page";
import { useState } from "react";
import { formatYear } from "util/date";
import { debounce, random } from "lodash";
import { Filter, VotesQuery } from "./Swissvotes";

export const Posters: React.FC = () => {
  const [keywords, setKeywords] = useState("");
  const [yes, setYes] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20;
  return (
    <>
      <Flex mt={4}>
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 300)}
          placeholder="Suche..."
          flex={1}
        />
        <Button ml={3} flex={0.3} mt={[0, 0, "4px"]} height="50px">
          Suche
        </Button>
      </Flex>
      <Text mb={4} mt={2} fontSize={1}>
        Filtern nach: <Filter set={setYes} v={yes} val={"JA"} label="JA" sep />
        <Filter set={setYes} v={yes} val={"NEIN"} label="NEIN" />
      </Text>
      <PosterList
        query={{ keywords, limit, offset, hasPosters: true }}
        yes={yes}
      />
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

export const RandomPosters: React.FC<{ amount?: number }> = ({
  amount = 10,
}) => {
  return (
    <PosterList query={{ hasPosters: true, sort: "random", limit: amount }} />
  );
};

export const PosterList: React.FC<{ query: VotesQuery; yes?: string }> = ({
  query,
  yes,
}) => {
  const swissvotesQuery = useSwissvotesQuery({
    variables: query,
  });
  const swissvotes = swissvotesQuery.data?.swissvotes;

  if (swissvotesQuery.loading) return <Loading />;
  if (swissvotesQuery.error)
    return <ErrorPage>{swissvotesQuery.error.message}</ErrorPage>;

  if (!swissvotes || swissvotes.length === 0)
    return <Box my={4}>Nichts gefunden…</Box>;

  const onlyYes = yes === "JA";
  const onlyNo = yes === "NEIN";

  return (
    <>
      <Box sx={{ columnCount: [2, 2, 3], columnGap: "8px" }} mt={3}>
        {swissvotes?.map((vote) => {
          if (!vote) return null;
          const posters: string[] = [];
          if (vote.poster_ja && !onlyNo) {
            const ja = vote.poster_ja.split(" ");
            posters.push(ja[random(0, ja.length - 1)]);
          }
          if (vote.poster_nein && !onlyYes) {
            const nein = vote.poster_nein.split(" ");
            posters.push(nein[random(0, nein.length - 1)]);
          }
          if (posters.length > 0) {
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
  const copyright = image.replace(/.*:\/\/(?:www\.)?(.*?)\/.*/, "$1");
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
          onClick={() =>
            vote.swissvoteslink && window.open(vote.swissvoteslink, "_blank")
          }
        >
          <Text
            fontWeight="semi"
            fontSize={[1, 1, 2]}
            sx={{ wordWrap: "break-word" }}
          >
            {vote.titel_kurz_d}
          </Text>
          <Text fontSize={1} my={2}>
            Jahr: {vote.datum && formatYear(vote.datum)}
          </Text>
          <Text fontSize={1}>&copy; {copyright}</Text>
        </Box>
      )}
      <Image src={image} onMouseOver={() => setHover(true)} />
    </Box>
  );
};
