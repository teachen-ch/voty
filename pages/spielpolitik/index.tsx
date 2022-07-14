import { Step } from "pages/abstimmen";
import { Heading, Text } from "rebass";
import { Box, Card, Image, Flex } from "rebass";
import { A } from "components/Breadcrumb";
import { CreateUserForm } from "pages/user/signup";
import { SessionUser, useUser } from "state/user";
import { useState } from "react";
import { Role } from "graphql/types";
import Head from "next/head";
import { DE, FR, IT } from "components/Translated";
import Success from "../user/success";
import { trLink, useTr } from "util/translate";
import { useRouter } from "next/router";
import { ZDAResultPies } from "./resultate";

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
      {tr("ZDA.Start.Intro")}

      <br />
      <br />
      {user && <A href={voteLink}>{tr("ZDA.Start.GoVote")}</A>}
      {user && (
        <A
          href="/user/logout?redirect=/spielpolitik/"
          as="button"
          ml={[2, 2, 4]}
        >
          Logout
        </A>
      )}
      <br />
      <br />
      <DE mt={4} fontSize={[1, 1, 2]}>
        <b>Initiativen «SpielPolitik!»</b>
        <br />
        <A href="/files/spielpolitik_de.pdf" target="_blank">
          Abstimmungsbüchlein herunterladen
        </A>
        <ZDAResultPies />
        <br />
        <br />
        <br />
        <br />
      </DE>
      <FR>
        <b>Initiatives « Joue la politique ! »</b>
        <br />
        <A href="/files/spielpolitik_fr.pdf" target="_blank">
          Télécharger le livret de vote
        </A>
        <ZDAResultPies />
        <br />
        <br />
        <br />
        <br />
      </FR>
      <IT>
        <b>Iniziative «Gioca alla politica!»</b>
        <br />
        <A href="/files/spielpolitik_it.pdf" target="_blank">
          Scarica il libretto di voto
        </A>
        <ZDAResultPies />
        <br />
        <br />
        <br />
        <br />
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
      <A href="https://schulen-nach-bern.ch">schulen-nach-bern.ch</A>
      <A href="/">voty.ch</A>
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
        {props.children}
      </Box>
    </Flex>
  </Flex>
);

function LanguageLinks() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <Text fontSize={1} mb={4}>
      <A href={path} locale={false}>
        deutsch
      </A>
      <span>&nbsp;&nbsp;</span>
      <A href={path} locale="fr">
        français
      </A>
      <span>&nbsp;&nbsp;</span>
      <A href={path} locale="it">
        italiano
      </A>
    </Text>
  );
}

export const ZDAFAQ: React.FC = () => (
  <Box className="faq" fontSize={1} textAlign="left" mt={5}>
    <Flex justifyContent="center">
      <Image
        src="/images/header_m2.svg"
        alt="Abstimmen"
        maxWidth={500}
        alignSelf="center"
      />
    </Flex>
    <DE>
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
        voty.ch ist ein Projekt des gemeinnützigen Vereins «Teachen!»,
        unterstützt durch den prototypefund.opendata.ch und die Stiftung
        Mercator. voty.ch bietet kostenlos Online-Materialien für die politische
        Bildung und führt Klassenabstimmungen während allen eidgenössischen
        Abstimmungen durch.
      </Text>
      <Title>Warum muss ich mich mit meiner Email-Adresse registrieren?</Title>
      <Text>
        Mit der Angabe deiner Email-Adresse stellen wir sicher, dass jede Person
        nur <A onClick={() => alert("pro Email-Adresse...")}>eine Stimme</A>{" "}
        abgeben kann. Deine Email-Adresse wird nur zur Durchführung dieser
        Abstimmung verwendet und nie an Dritte weitergegeben.
      </Text>
      <Title>
        Kann ich diese Abstimmungen auch mit meiner Klasse durchführen?
      </Title>
      <Text>
        Klar doch! Auf voty.ch können sich Lehrpersonen{" "}
        <A href="/abstimmen">hier</A> registrieren (aktuell erst auf Deutsch)
        und Schulklassen eröffnen. Danach können alle Schüler*innen in den
        Klassenraum eingeladen werden, die Abstimmungen können durchgeführt
        werden und es ein Lernplan mit interaktiven Online-Materialien zur
        politischen Bildung kann zusammengestellt werden.
      </Text>
      <Title>
        Ich möchte auch mit meiner Schulklasse nach Bern ins Bundeshaus!
      </Title>
      <Text>
        Super! Auf{" "}
        <A href="https://schulen-nach-bern.ch/anmeldung" rel="noreferrer">
          schulen-nach-bern.ch/anmeldung
        </A>{" "}
        findest du die nächsten Durchführungsdaten von «SpielPolitik!» und alle
        Angaben zur Anmeldung.
      </Text>
    </DE>

    <FR>
      <Heading as="h2" mt={3}>
        Questions et réponses
      </Heading>
      <Title>Qu&apos;est-ce que « Joue la politique !»?</Title>
      <Text>
        « Joue la politique !» est un projet de l&apos;association{" "}
        <A href="https://schulen-nach-bern.ch/fr/" rel="noreferrer">
          schulen-nach-bern.ch
        </A>{" "}
        , qui est gérée par le Centre pour la démocratie d&apos;Aarau (ZDA).
        Cinq fois par an, des classes scolaires de toute la Suisse peuvent se
        rendre à Berne et découvrir de visu comment se déroule la politique dans
        la Berne fédérale.
      </Text>
      <Title>Qui est derrière voty.ch ?</Title>
      <Text>
        voty.ch est un projet de l&apos;association à but non lucratif « Teachen
        ! », soutenu par prototypefund.opendata.ch et la Fondation Mercator.
        voty.ch propose du matériel en ligne gratuit pour l&apos;éducation
        politique et organise des votes en classe lors de toutes les votations
        fédérales.
      </Text>
      <Title>
        Pourquoi dois-je m&apos;inscrire avec mon adresse électronique ?
      </Title>
      <Text>
        En fournissant ton adresse électronique, nous veillons à ce que chaque
        personne ne puisse exprimer qu&apos;un{" "}
        <A onClick={() => alert("par adresse électronique...")}></A>seul vote.
        Ton adresse électronique ne sera utilisée que pour effectuer ce vote et
        ne sera jamais transmise à des tiers.
      </Text>
      <Title>
        J&apos;aimerais aussi emmener ma classe d&apos;école au Parlement
        fédéral à Berne !
      </Title>
      <Text>
        Super ! Sur{" "}
        <A href="https://schulen-nach-bern.ch/fr/inscription" rel="noreferrer">
          schulen-nach-bern.ch/fr/inscription
        </A>{" "}
        tu trouveras les prochaines dates de « Joue la politique ! » et toutes
        les informations nécessaires pour t’inscrire.
      </Text>
    </FR>

    <IT>
      <Heading as="h2" mt={3}>
        Domande e risposte
      </Heading>
      <Title>Che cos&apos;è «Gioca alla politica»?</Title>
      <Text>
        «Gioca alla politica!» è un progetto dell&apos;associazione{" "}
        <A href="https://schulen-nach-bern.ch/it" rel="noreferrer">
          schulen-nach-bern.ch
        </A>{" "}
        , gestita dal Centro per la democrazia di Aarau (ZDA). Cinque volte
        all&apos;anno, le classi scolastiche di tutta la Svizzera possono
        recarsi a Berna e sperimentare in prima persona come viene condotta la
        politica nella capitale federale.
      </Text>
      <Title>Chi c&apos;è dietro voty.ch?</Title>
      <Text>
        voty.ch è un progetto dell&apos;organizzazione non-profit «Teachen!»
        sostenuto da prototypefund.opendata.ch e dalla Fondazione Mercator.
        voty.ch offre materiale online gratuito per l&apos;educazione politica e
        organizza il voto in classe in tutte le elezioni federali.
      </Text>
      <Title>Perché devo registrarmi con il mio indirizzo e-mail?</Title>
      <Text>
        Fornendo il tuo indirizzo e-mail, ci assicuriamo che ogni persona possa
        esprimere{" "}
        <A onClick={() => alert("per indirizzo e-mail...")}>un solo voto</A>. Il
        tuo indirizzo e-mail sarà utilizzato solo per questo voto e non sarà mai
        trasmesso a terzi.
      </Text>
      <Title>
        Mi piacerebbe anche portare la mia classe al Parlamento federale a
        Berna!
      </Title>
      <Text>
        Grande! Su{" "}
        <A
          href="https://schulen-nach-bern.ch/it/registrazione"
          rel="noreferrer"
        >
          schulen-nach-bern.ch/it/registrazione
        </A>{" "}
        puoi trovare le prossime date di «Gioca alla politica!» e tutte le
        informazioni necessarie per iscriverti.
      </Text>
    </IT>
  </Box>
);

const Title: React.FC = (props) => (
  <Heading as="h3" mt={3} fontSize={2}>
    {props.children}
  </Heading>
);
