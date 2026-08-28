import { Swissvote, useSwissvotesQuery } from "graphql/types";
import { Input } from "components/ui";
import { Box, Link, Text, Flex, Button, Image, Heading } from "components/ui";
import { ErrorPage, Loading } from "./Page";
import { useEffect, useState } from "react";
import date, { formatYear } from "util/date";
import debounce from "lodash/debounce";
import random from "lodash/random";
import { Filter, getVoteResult, getVoteType, VotesQuery } from "./Swissvotes";

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
        <Button className="ml-4 flex-[0.3] mt-0 sm:mt-1">Suche</Button>
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

export const RandomPosters: React.FC<
  React.PropsWithChildren<{ amount?: number }>
> = ({ amount = 10 }) => {
  return (
    <PosterList query={{ hasPosters: true, sort: "random", limit: amount }} />
  );
};

export const PosterList: React.FC<
  React.PropsWithChildren<{ query: VotesQuery; yes?: string }>
> = ({ query, yes }) => {
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
      <Box
        style={{ columnCount: 3, columnGap: "8px" }}
        className="mt-4 [column-count:2] sm:[column-count:3]"
      >
        {swissvotes?.map((vote) => {
          if (!vote) return null;
          const posters: { image: string; position: "JA" | "NEIN" }[] = [];
          if (vote.poster_ja && !onlyNo) {
            const ja = vote.poster_ja.split(" ");
            posters.push({
              image: ja[random(0, ja.length - 1)],
              position: "JA",
            });
          }
          if (vote.poster_nein && !onlyYes) {
            const nein = vote.poster_nein.split(" ");
            posters.push({
              image: nein[random(0, nein.length - 1)],
              position: "NEIN",
            });
          }
          if (posters.length > 0) {
            return posters.map((p) => (
              <Poster
                key={`${p.image}-${p.position}`}
                vote={vote}
                image={p.image}
                position={p.position}
              />
            ));
          } else return null;
        })}
      </Box>
    </>
  );
};

export const Poster: React.FC<
  React.PropsWithChildren<{
    vote: Swissvote;
    image: string;
    position: "JA" | "NEIN";
  }>
> = ({ vote, image, position }) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const copyright = image.replace(/.*:\/\/(?:www\.)?(.*?)\/.*/, "$1");

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function downloadPoster() {
    const filename = `voty-${vote.anr}-${position.toLowerCase()}.jpg`;
    try {
      const response = await fetch(image);
      if (!response.ok) throw new Error("Image download failed");
      const blobUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement("a");
      link.href = image;
      link.download = filename;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.click();
    }
  }

  return (
    <>
      <Box className="w-[calc(100%-8px)] mb-4 bg-white p-2 relative">
        {hover && (
          <Box
            className="absolute cursor-pointer bg-[rgba(1,1,1,0.5)] text-white p-2 w-[calc(100%-16px)] h-[calc(100%-16px)]"
            style={{ hyphens: "auto" }}
            onMouseOut={() => setHover(false)}
            onClick={() => setOpen(true)}
          >
            <Text className="font-semibold text-sm sm:text-base wrap-break-word">
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
      {open && (
        <Box
          role="dialog"
          aria-modal="true"
          aria-label={vote.titel_kurz_d || "Plakat"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <Box
            className="relative flex max-h-full w-full max-w-4xl flex-col overflow-auto rounded-card bg-gray-900 p-4 pb-20 text-white sm:p-6 sm:pb-20"
            onClick={(event) => event.stopPropagation()}
          >
            <Button
              variant="secondary"
              aria-label="Schliessen"
              className="absolute right-4 top-4 z-10 min-h-8 px-3"
              onClick={() => setOpen(false)}
            >
              ×
            </Button>
            <Image
              src={image}
              alt={vote.titel_kurz_d || "Plakat"}
              className="mx-auto max-h-[65vh] w-auto object-contain rounded border border-white"
            />
            <Box className="mt-4 border-t border-gray-500 pt-4">
              <Heading className="mt-0 pr-10 text-lg">
                {vote.titel_kurz_d} ({getVoteType(vote.rechtsform) || "–"},{" "}
                {vote.datum ? date(vote.datum).format("DD.MM.YYYY") : "–"})
              </Heading>
              <Text>
                Plakat: {position}. Abstimmungsresultat:{" "}
                {getVoteResult(vote.annahme)}
              </Text>
              <Button className="mt-4" onClick={downloadPoster}>
                Bild herunterladen
              </Button>
              <Button
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
                onClick={() =>
                  vote.swissvoteslink &&
                  window.open(vote.swissvoteslink, "_blank")
                }
              >
                Infos auf Swissvotes.ch
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
