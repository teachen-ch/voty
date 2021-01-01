import { UserWhereUniqueInput } from "graphql/types";
import { Box, Button, Text } from "rebass";
import { Label, Textarea } from "@rebass/forms";
import { useState } from "react";
import { Authors, Works, WorkItem, usePostWork } from "./Works";
import Info from "./Info";
import { Markdown } from "util/markdown";
import { Err } from "./Page";

export const Passion: React.FC = () => {
  const [passion, setPassion] = useState("");
  const [engagement, setEngagement] = useState("");
  const [users, setUsers] = useState<UserWhereUniqueInput[]>();
  const [doPostWork, state, trigger] = usePostWork({
    card: "passion",
    title: "Passion",
    data: { passion, engagement },
    users,
  });

  const success = state.called && !state.error;
  return (
    <Box>
      {success ? (
        <Info>Erfolgreich gespeichert!</Info>
      ) : (
        <Box>
          <Label mt={3}>Für was würdest Du auf die Strasse gehen?</Label>
          <Textarea
            name="passion"
            value={passion}
            onChange={(e) => setPassion(e.target.value)}
          />
          <Label mt={3}>
            Wie willst Du Dich sonst für dieser Sache einsetzen?
          </Label>
          <Textarea
            name="engagement"
            value={engagement}
            onChange={(e) => setEngagement(e.target.value)}
          />
          <Label mt={3}>Erarbeitet durch:</Label>
          <Authors setUsers={setUsers} />
          <Button mt={3} width="100%" onClick={doPostWork} label="Abschicken">
            Abschicken
          </Button>
          <Err msg={state.error?.message} />
        </Box>
      )}
      <Works
        card="passion"
        mt={6}
        items={PassionItem}
        flexDirection="column"
        trigger={trigger}
      />
    </Box>
  );
};

const PassionItem: WorkItem = ({ work }) => {
  return (
    <Box mb={4}>
      <Text my={3}>
        <b>Meine Passion ❤️ </b> {work.data?.passion}
      </Text>
      <Text>
        <b>Mein Engagement 🌱 </b> <Markdown>{work.data?.engagement}</Markdown>
      </Text>
    </Box>
  );
};
