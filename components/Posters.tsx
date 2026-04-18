import { Swissvote, useSwissvotesQuery } from "graphql/types";
import { Input } from "components/ui";
import { Box, Link, Text, Flex, Button, Image } from "components/ui";
import { ErrorPage, Loading } from "./Page";
import { useState } from "react";
import { formatYear } from "util/date";
import debounce from "lodash/debounce";
import random from "lodash/random";
import { Filter, VotesQuery } from "./Swissvotes";

export const Posters: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [keywords, setKeywords] = useState("");
  const [yes, setYes] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20;
  return (
    <>
      <Flex className="mt-8">
        <Input
          onChange={debounce((evt) => setKeywords(evt.target.value), 300)}
          placeholder="Suche..."
          className="flex-1"
        />
        <Button className="ml-4 flex-[0.3] mt-0 sm:mt-[4px]">
          Suche
        </Button>
      </Flex>
      <Text className="mb-8 mt-2 text-sm">
        Filtern nach: <Filter set={setYes} v={yes} val={"JA"} label="JA" sep />
        <Filter set={setYes} v={yes} val={"NEIN"} label="NEIN" />
      </Text>
      <PosterList
        query={{ keywords, limit, offset, hasPosters: true }}
        yes={yes}
      />
      <Flex className="justify-between mt-2">
        <Link onClick={() => setOffset(offset - limit)} className="text-sm">
          {offset > 0 ? "Neuere Plakate anzeigen" : ""}
        </Link>
        <Link onClick={() => setOffset(offset + limit)} className="text-sm">
          {offset < 650 ? "Ältere Plakate anzeigen" : ""}
        </Link>
      </Flex>
    </>
  );
};

export const RandomPosters: React.FC<React.PropsWithChildren<{ amount?: number }>> = ({
  amount = 10,
}) => {
  return (
    <PosterList query={{ hasPosters: true, sort: "random", limit: amount }} />
  );
};

export const PosterList: React.FC<React.PropsWithChildren<{ query: VotesQuery; yes?: string }>> = ({
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
    return <Box className="my-8">Nichts gefunden…</Box>;

  const onlyYes = yes === "JA";
  const onlyNo = yes === "NEIN";

  return (
    <>
      <Box style={{ columnCount: 3, columnGap: "8px" }} className="mt-4 [column-count:2] sm:[column-count:3]">
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

export const Poster: React.FC<React.PropsWithChildren<{ vote: Swissvote; image: string }>> = ({
  vote,
  image,
}) => {
  const [hover, setHover] = useState(false);
  const copyright = image.replace(/.*:\/\/(?:www\.)?(.*?)\/.*/, "$1");
  return (
    <Box
      className="w-[calc(100%-8px)] mb-4 bg-white p-2 relative"
    >
      {hover && (
        <Box
          className="absolute cursor-pointer bg-[rgba(1,1,1,0.5)] text-white p-2 w-[calc(100%-16px)] h-[calc(100%-16px)]"
          style={{ hyphens: "auto" }}
          onMouseOut={() => setHover(false)}
          onClick={() =>
            vote.swissvoteslink && window.open(vote.swissvoteslink, "_blank")
          }
        >
          <Text
            className="font-semibold text-sm sm:text-base break-words"
          >
            {vote.titel_kurz_d}
          </Text>
          <Text className="text-sm my-2">
            Jahr: {vote.datum && formatYear(vote.datum)}
          </Text>
          <Text className="text-sm">&copy; {copyright}</Text>
        </Box>
      )}
      <Image src={image} onMouseOver={() => setHover(true)} alt="Plakat" />
    </Box>
  );
};
