import { useUser, useSetUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Button, Text, Card } from "rebass";
import { Teams, CreateTeamForm } from "../admin/teams";
import { LogoutButton } from "../user/logout";
import { useState } from "react";
import { QForm } from "../../components/Forms";
import { useSchoolList, SET_USER_SCHOOL } from "components/Schools";
import { useMutation } from "@apollo/client";

export default function Teacher() {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>
      <SelectSchool />
      <Heading as="h3">Deine Klassen auf voty</Heading>
      <Teams where={{ teacher: { id: { equals: user?.id } } }} />
      {showForm ? (
        <CreateTeamForm onCompleted={() => setShowForm(false)} />
      ) : (
        <Button onClick={() => setShowForm(!showForm)}>
          Neue Klasse erfassen
        </Button>
      )}
      <Text />
      <LogoutButton my={4} />
    </LoggedInPage>
  );
}

function SelectSchool() {
  const user = useUser();
  const setUser = useSetUser();
  const schools = useSchoolList();
  const [setUserSchool] = useMutation(SET_USER_SCHOOL, {
    onCompleted({ user }) {
      setUser(user);
    },
  });

  if (!user) return null;

  if (user.school) {
    return (
      <Text>
        <b>Dein Schulhaus</b>: {user.school.name}, {user.school.city}
      </Text>
    );
  }
  if (!schools) {
    return <p>Loading...</p>;
  }

  const options = schools.reduce(
    (o, i) => {
      const label = `${i.zip} ${i.city} – ${i.name}`;
      o[label] = i.id;
      return o;
    },
    { "-- Bitte wählen --": undefined }
  );
  return (
    <Card>
      <Heading mt={0}>
        Bitte wähle Dein Schulhaus aus oder erstelle eines:
      </Heading>
      <QForm
        fields={{
          school: {
            label: "Deine Schule: ",
            required: true,
            options,
          },
          submit: {
            type: "submit",
            label: "Bestätigen",
          },
        }}
        mutation={setUserSchool}
        onSubmit={(values) =>
          setUserSchool({ variables: { school: parseInt(values.school) } })
        }
      ></QForm>
    </Card>
  );
}
