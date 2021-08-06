import Link from "next/link";
import { AppPage } from "components/Page";
import { useRouter } from "next/router";
import { Heading, Text } from "rebass";
import { useTr } from "util/hooks";
import { Image, Card, Flex } from "rebass";
import { A } from "components/Breadcrumb";
import { CreateUserForm, InlineSignup } from "pages/user/signup";
import { SessionUser } from "state/user";
import { useState } from "react";
import { Role } from "graphql/types";

export default function Abstimmung(): React.ReactElement {
  const router = useRouter();
  const [newUser, setNewUser] = useState<SessionUser | undefined>(undefined);
  const tr = useTr();

  return (
    <AppPage heading={tr("ZDA.Header")} image="/images/header_m2.svg">
      <Text fontSize={1} mb={4}>
        <A href="/zda" locale={false}>
          deutsch
        </A>
        <span>&nbsp;&nbsp;</span>
        <A href="/fr/zda">français</A>
        <span>&nbsp;&nbsp;</span>
        <A href="/it/zda">italiano</A>
      </Text>
      <Logos />
      {newUser ? (
        <Card>Success</Card>
      ) : (
        <CreateUserForm
          setUser={setNewUser}
          defaultRole={Role.Student}
          omitFirstname
          omitLastname
          omitPassword
          omitLogin
          submitButtonLabel={tr("ZDA.CreateButton")}
        />
      )}
      <Text mt={4} fontSize={[2, 2, 3]}>
        … Volksabstimmungen Schulen nach Bern
        <ul>
          <li>Sieben Wochen Ferien für Auszubildende</li>
          <li>Familienglück für alle</li>
          <li>Wahl des Geschlechts</li>
        </ul>
        … nationale Volksabstimmungen
        <ul>
          <li>99% Initiative</li>
          <li>Ehe für Alle</li>
        </ul>
      </Text>
    </AppPage>
  );
}

const Logos: React.FC = () => (
  <Flex justifyContent="space-around">
    <Image
      src="https://www.schulen-nach-bern.ch/uploads/images/logos/_logosSupporters/Verein_Schulen_nach_Bern_Logo_v2.png"
      width="100"
      height="88"
      alt="Schulen nach Bern Logo"
    />
    <Image
      src="https://www.zdaarau.ch/static/img/cdci/logo.svg"
      width={100}
      height={60}
      alt="Zentrum für Deomkratie ZDA Logo"
    />
  </Flex>
);
