import { useUser } from "../../state/user";
import { LoggedInPage } from "../../components/Page";
import { Heading, Button, Text, Card } from "rebass";
import { Teams, CreateTeamForm } from "../admin/teams";
import { LogoutButton } from "../user/logout";
import { useState } from "react";
import { QForm } from "../../components/forms";
import { useSchoolList, SET_USER_SCHOOL } from "components/Schools";
import { useMutation } from "@apollo/client";

export default function Teacher() {
  const user = useUser();
  const [showForm, setShowForm] = useState(false);

  return (
    <LoggedInPage heading="Startseite für Lehrpersonen">
      <Heading as="h2">Willkommen {user && user.name}</Heading>
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
  const schools = useSchoolList();
  const [setUserSchool] = useMutation(SET_USER_SCHOOL);

  if (!user || user.school) {
    return null;
  }
  if (!schools) {
    return <p>Loading...</p>;
  }
  return (
    <Card>
      <QForm
        fields={{
          school: {
            name: "Schule: ",
            required: true,
            options: schools,
          },
        }}
        mutation={setUserSchool}
        onSubmit={(values) =>
          setUserSchool({ variables: { school: values.school.parseInt() } })
        }
      ></QForm>
    </Card>
  );
}
