import { useSetCardsMutation } from "graphql/types";
import { Box, Text, Button } from "rebass";
import { useTeam } from "state/user";
import { getCardMeta, getCardTypeIcon } from "./Cards";
import { Err } from "./Page";
import { Table, TD, TDIcon, TDImage, TR } from "./Table";
import { useState } from "react";
import { A } from "./Breadcrumb";
import Image from "next/image";
import IconWatch from "../public/images/icon_watch.svg";
import { upperFirst } from "lodash";

export const LearningPath: React.FC<{ path: string; anon?: boolean }> = ({
  path,
  anon,
}) => {
  const team = useTeam();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [doSetCards, mutation] = useSetCardsMutation({
    onCompleted() {
      // TODO: can we update the apollo team cache
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
    <Box py={3} px={3} mb={5} bg="darkgray">
      <Table>
        {cards.map((id) => {
          const [details, setDetails] = useState(true);
          const card = getCardMeta(id);
          if (!card) return <Err msg={`Inhalt «${id}» wurde nicht gefunden`} />;
          return (
            <TR
              noHover
              key={id}
              onMouseOver={() => setDetails(true)}
              height={details ? "60px" : "40px"}
              onMouseOut={() => setDetails(true)}
            >
              <TD flexy>
                <A href={`${teamLink}/cards/${card.id}`} variant="link">
                  {card.title}
                </A>
                {details && (
                  <Text fontSize={1} overflow="show" wrap="wrap">
                    {upperFirst(String(card.type))}: {card.description}
                  </Text>
                )}
              </TD>
              <TDIcon mr={0}>
                <Image src={IconWatch} />
              </TDIcon>
              <TD width="130px" fixed smHide>
                {card?.duration}
              </TD>
              <TDImage src={getCardTypeIcon(card?.type)} />
            </TR>
          );
        })}
      </Table>
      {!anon && (
        <Button
          mt={3}
          width="100%"
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
