import { usePostWorkMutation, UserWhereUniqueInput } from "graphql/types";
import { Box, Button, Text } from "rebass";
import { Label, Textarea } from "@rebass/forms";
import { useState } from "react";
import { useTeam, useUser } from "state/user";
import { Authors, Works, WorkItem } from "./Works";
import Info from "./Info";

export const Passion: React.FC = () => {
  const [trigger, setTrigger] = useState(0);
  return (
    <Box>
      <PassionForm onSuccess={() => setTrigger(1)} />
      <Works
        card="passion"
        mt={3}
        items={PassionItem}
        flexDirection="column"
        trigger={trigger}
      ></Works>
    </Box>
  );
};

const PassionForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [passion, setPassion] = useState("");
  const [engagement, setEngagement] = useState("");
  const user = useUser();
  const team = useTeam();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<Array<UserWhereUniqueInput>>();
  const [doPostWork] = usePostWorkMutation();

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
          title: "Passion",
          card: "passion",
          data: {
            passion,
            engagement,
          },
        },
      },
    });
    if (success) {
      setSuccess(true);
      onSuccess();
    } else setError("Es ist ein Fehler aufgetreten");
  }

  if (success) {
    return <Info>Erfolgreich abgeschickt!</Info>;
  }

  return (
    <Box>
      <Label mt={3}>Für was würdest Du auf die Strasse gehen?</Label>
      <Textarea
        name="passion"
        value={passion}
        onChange={(e) => setPassion(e.target.value)}
      />
      <Label mt={3}>Wie willst Du Dich sonst für dieser Sache einsetzen?</Label>
      <Textarea
        name="engagement"
        value={engagement}
        onChange={(e) => setEngagement(e.target.value)}
      />
      <Label mt={3}>Erarbeitet durch:</Label>
      <Authors setUsers={setUsers} />
      <Button mt={3} width="100%" onClick={doSubmit} label="Abschicken">
        Abschicken
      </Button>
      {error}
    </Box>
  );
};

const PassionItem: WorkItem = ({ work }) => {
  return (
    <Box mb={4}>
      <Text>Von: {work.users?.map((u) => u.shortname).join(", ")}</Text>
      <Text>Meine Passion: {work.data?.passion}</Text>
      <Text>Mein Engagement: {work.data?.engagement}</Text>
    </Box>
  );
};
