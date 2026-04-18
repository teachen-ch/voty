import { useSetCardsMutation } from "graphql/types";
import { Box, Text, Button } from "components/ui";
import { useTeam } from "state/user";
import { getCardMeta, getCardTypeIcon } from "./Cards";
import { Err } from "./Page";
import { Table, TD, TDIcon, TDImage, TR } from "./Table";
import { useState } from "react";
import { A } from "./Breadcrumb";
import Image from "next/image";
import IconWatch from "../public/images/icon_watch.svg";
import upperFirst from "lodash/upperFirst";

export const LearningPath: React.FC<React.PropsWithChildren<{ path: string; anon?: boolean }>> = ({
  path,
  anon,
}) => {
  const team = useTeam();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [doSetCards, mutation] = useSetCardsMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError(err) {
      setError(err.message);
    },
  });
  const cards = path.split(" ");

  async function addPath() {
    if (!team)
      return alert("Der Lernpfad kann nur einer Klasse hinzugefügt werden");
    const current = team.cards;
    const newCards = current ? `${current} ${path}` : path;
    await doSetCards({ variables: { teamId: team.id, cards: newCards } });
  }

  const teamLink = team ? `/team/${team?.id}` : "";

  return (
    <Box className="py-4 px-4 mb-16 bg-black/20">
      <Table>
        {cards.map((id) => (
          <CardDetail key={id} id={id} teamLink={teamLink} />
        ))}
      </Table>
      {!anon && (
        <Button
          className="mt-4 w-full"
          onClick={addPath}
          disabled={mutation.loading}
        >
          {mutation.loading
            ? "Bitte warten..."
            : success
            ? "Lernpfad erfolgreich hinzugefügt"
            : "Lernpfad der Klasse hinzufügen"}
        </Button>
      )}
      <Err msg={error} />
    </Box>
  );
};

const CardDetail: React.FC<React.PropsWithChildren<{ id: string; teamLink: string }>> = ({
  id,
  teamLink,
}) => {
  const [details, setDetails] = useState(true);
  const card = getCardMeta(id);
  if (!card) return <Err msg={`Inhalt «${id}» wurde nicht gefunden`} />;
  return (
    <TR
      noHover
      key={id}
      onMouseOver={() => setDetails(true)}
      onMouseOut={() => setDetails(true)}
    >
      <TD flexy>
        <A
          href={`${teamLink}/cards/${card.id}`}
          className="block truncate text-inherit"
        >
          {card.title}
        </A>
        {details && (
          <Text className="text-sm truncate">
            {upperFirst(String(card.type))}: {card.description}
          </Text>
        )}
      </TD>
      <TDIcon>
        <Image src={IconWatch} alt="" />
      </TDIcon>
      <TD width={130} fixed smHide>
        {card?.duration}
      </TD>
      <TDImage src={getCardTypeIcon(card?.type)} />
    </TR>
  );
};
