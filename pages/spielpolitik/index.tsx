import { Step } from "pages/abstimmen";
import { Heading, Text } from "rebass";
import { useTr } from "util/hooks";
import { Box, Card, Image, Flex } from "rebass";
import { A } from "components/Breadcrumb";
import { CreateUserForm } from "pages/user/signup";
import { SessionUser, useUser } from "state/user";
import { useState } from "react";
import { Role } from "graphql/types";
import Head from "next/head";
import { DE, FR, IT } from "components/Translated";
import Success from "../user/success";
import { trLink } from "util/translate";
import { useRouter } from "next/router";
import { setBrowserCookie } from "../../util/cookies";

export default function ZDAAbstimmung(): React.ReactElement {
  const user = useUser();
  const [newUser, setNewUser] = useState<SessionUser | undefined>(undefined);
  const tr = useTr();
  const router = useRouter();
  const voteLink = trLink(
    "/spielpolitik/vote",
    router.locale,
    router.defaultLocale
  );
  const hasUser = user || newUser;

  return (
    <ZDAFullPage heading={tr("ZDA.Header")}>
      <Logos />
      <DE>
        Hier können Schüler*innen und Erwachsene über die Initiativen von
        «SpielPolitik!» abstimmen und Jugendliche können für die eidgenössischen
        Abstimmungen vom 26. September ihre Stimme abgeben.
        <Box mb={5} mt={4}>
          <Step n={hasUser ? "✔" : 1} mb={2} bg={hasUser ? "green" : "gray"}>
            <Text fontStyle={hasUser ? "italic" : "normal"}>
              Registriere Dich mit Deiner Email-Adresse
            </Text>
          </Step>
          <Step n="2" mb={2}>
            Klicke den Bestätigungslink im Email
          </Step>
          <Step n="3" mb={2}>
            Stimme über alle Vorlagen ab
          </Step>
        </Box>
      </DE>
      <FR>
        [Übersetzung Intro…]
        <br />
        <br />
      </FR>
      <IT>
        [Übersetzung Intro…]
        <br />
        <br />
      </IT>

      {newUser ? (
        <Card>
          <Success user={newUser} />
        </Card>
      ) : (
        <CreateUserForm
          setUser={setNewUser}
          defaultRole={Role.Student}
          omitFirstname
          omitLastname
          omitPassword
          omitLogin
          submitButtonLabel={tr("ZDA.CreateButton")}
          campaign="spielpolitik"
          redirect={voteLink}
        />
      )}
      {user && (
        <A href="/spielpolitik/vote">Hier geht&apos;s zu den Abstimmungen</A>
      )}
      {user && (
        <A
          href="/user/logout?redirect=/spielpolitik/"
          as="button"
          ml={[2, 2, 4]}
        >
          Logout
        </A>
      )}
      <DE mt={4} fontSize={[1, 1, 2]}>
        <Text>
          <b>Initiativen «SpielPolitik!»</b>
          <br />
          «Sieben Wochen Ferien für Auszubildende», «Familienglück für alle»,
          «Wahl des Geschlechts».{" "}
          <A href="/files/spielpolitik_de.pdf" target="_blank">
            Abstimmungsbüchlein herunterladen
          </A>
        </Text>
        <Text mt={3}>
          <b>Eidgenössische Volksabstimmungen vom 26. September</b>
          <br />
          «99% Initiative», «Ehe für Alle»
        </Text>
      </DE>
      <FR>
        <br />
        <br />
        Salut les mecs. Diese Inhalte müssen noch übersetzt werden…
      </FR>
      <IT>
        <br />
        <br />
        Salutti a tutti. Diese Inhalte müssen noch übersetzt werden…
      </IT>

      <ZDAFAQ />
    </ZDAFullPage>
  );
}

export const Logos: React.FC = () => {
  const router = useRouter();
  return (
    <Flex justifyContent="space-around" alignItems="center" my={4}>
      <Image
        src={`/images/logo_spielpolitik_${router.locale}.png`}
        maxWidth="25%"
        width={100}
        height={83}
        alt="Schulen nach Bern Logo"
      />
      <Image
        src="/images/voty_logo.svg"
        maxWidth="25%"
        width={100}
        height={39}
        alt="voty.ch Logo"
      />
      <Image
        src="/images/logo_zda.svg"
        maxWidth="25%"
        width={100}
        height={60}
        alt="Zentrum für Deomkratie ZDA Logo"
      />
    </Flex>
  );
};

export const ZDAFullPage: React.FC<{
  heading: string;
  image?: string;
}> = ({ heading, image, children }) => (
  <ZDAPage heading={heading} image={image}>
    <LanguageLinks />
    <Heading mt={-3} fontSize={[4, 4, 5]}>
      {heading}
    </Heading>
    {children}
  </ZDAPage>
);

export const ZDAPage: React.FC<{
  heading?: string;
  image?: string;
}> = (props) => (
  <Flex
    bg="#3D4564"
    mt={0}
    pt={0}
    flexDirection="column"
    justifyContent="center"
    minHeight="100vh"
  >
    <Head>
      <title>voty.ch – {props.heading}</title>
    </Head>
    <Flex
      justifyContent="space-between"
      fontSize={1}
      color="#fff"
      width="100%"
      px={3}
      pt={2}
    >
      <A href="https://schulen-nach-bern.ch">zu schulen-nach-bern.ch</A>
      <A href="/">zu voty.ch</A>
    </Flex>
    <Flex
      alignItems="center"
      flexDirection="column"
      flex={1}
      mx={"auto"}
      maxWidth={["100%", "100%", "100%", "1160px"]}
    >
      <Box
        as="main"
        my={[2, 2, "50px"]}
        mx={[1, 2, 3]}
        px={[3, 3, 4]}
        py="25px"
        sx={{
          borderRadius: [0, 0, 5],
          backgroundColor: "panelColor",
          position: "relative",
        }}
        minWidth="min(100%, 800px)"
        width="100%"
        maxWidth="800px"
        minHeight="450px"
      >
        {props.image && <Image src={props.image} width="100%" mt={-150} />}
        {props.children}
      </Box>
    </Flex>
  </Flex>
);
function LanguageLinks() {
  function setLocaleCookie(locale: string) {
    setBrowserCookie("NEXT_LOCALE", locale);
  }

  return (
    <Text fontSize={1} mb={4}>
      <A
        href="/spielpolitik"
        locale={false}
        onClick={() => setLocaleCookie("de")}
      >
        deutsch
      </A>
      <span>&nbsp;&nbsp;</span>
      <A
        href="/spielpolitik"
        locale={"fr"}
        onClick={() => setLocaleCookie("fr")}
      >
        français
      </A>
      <span>&nbsp;&nbsp;</span>
      <A
        href="/spielpolitik"
        locale={"it"}
        onClick={() => setLocaleCookie("it")}
      >
        italiano
      </A>
    </Text>
  );
}

export const ZDAFAQ: React.FC = () => (
  <Box className="faq" fontSize={1} textAlign="left" mt={5}>
    <Flex justifyContent="center">
      <Image src="/images/header_m2.svg" maxWidth={500} alignSelf="center" />
    </Flex>
    <Heading as="h2" mt={3}>
      Fragen und Antworten
    </Heading>
    <Title>Was ist «SpielPolitik!»?</Title>
    <Text>
      «SpielPolitik!» ist ein Projekt des Vereins{" "}
      <A href="https://schulen-nach-bern.ch" rel="noreferrer">
        schulen-nach-bern.ch
      </A>{" "}
      , welches vom Zentrum für Demokratie Aarau (ZDA) durchgeführt wird. Fünf
      Mal pro Jahr können Schulklassen aus der ganzen Schweiz nach Bern reisen
      und hautnah erleben, wie die Politik in Bundesbern abläuft.
    </Text>
    <Title>Wer steht hinter voty.ch?</Title>
    <Text>
      voty.ch ist ein Projekt des gemeinnützigen Vereins «Teachen!», unterstützt
      durch den prototypefund.opendata.ch und die Stiftung Mercator. voty.ch
      bietet kostenlos Online-Materialien für die politische Bildung und führt
      Klassenabstimmungen während allen eidgenössischen Abstimmungen durch.
    </Text>
    <Title>Warum muss ich mich mit meiner Email-Adresse registrieren?</Title>
    <Text>
      Mit der Angabe Deiner Email-Adresse stellen wir sicher, dass jede Person
      nur <A onClick={() => alert("pro Email-Adresse...")}>eine Stimme</A>{" "}
      abgeben kann. Deine Email-Adresse wird nur zur Durchführung dieser
      Abstimmung verwendet und nie an Dritte weitergegeben.
    </Text>
    <Title>
      Kann ich diese Abstimmungen auch mit meiner Klasse durchführen?
    </Title>
    <Text>
      Klar doch! Auf voty.ch können sich Lehrpersonen{" "}
      <A href="/abstimmen">hier</A> registrieren (aktuell erst auf Deutsch) und
      Schulklassen eröffnen. Danach können alle Schüler*innen in den Klassenraum
      eingeladen werden, die Abstimmungen können durchgeführt werden und es ein
      Lernplan mit interaktiven Online-Materialien zur politischen Bildung kann
      zusammengestellt werden.
    </Text>
    <Title>
      Ich möchte auch mit meiner Schulklasse nach Bern ins Bundeshaus!
    </Title>
    <Text>
      Super! Auf{" "}
      <A href="https://schulen-nach-bern.ch/anmeldung" rel="noreferrer">
        schulen-nach-bern.ch/anmeldung
      </A>{" "}
      findest Du die nächsten Durchführungsdaten von «SpielPolitik!» und alle
      Angaben zur Anmeldung.
    </Text>
  </Box>
);

const Title: React.FC = (props) => (
  <Heading as="h3" mt={3} fontSize={2}>
    {props.children}
  </Heading>
);
