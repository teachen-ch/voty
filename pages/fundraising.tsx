import { AppPage, H2 } from "components/Page";
import { Info } from "components/Learning";
import { ReadMore } from "components/ReadMore";
import { Flex, Text, Card, Link as A, Box, Button } from "rebass";
import { Detail, Person, Tag } from "./projekt";
import { isMobile } from "util/isBrowser";
import { useState } from "react";
import { FeedbackText } from "components/Feedback";
import { SlideShow } from "components/SlideShow";
import { Label, Input } from "@rebass/forms";
import { Grid } from "theme-ui";

export default function Fundraising(): React.ReactElement {
  const [password, setPassword] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("fundraising")
      : ""
  );
  const CORRECT = "6973e3e8";

  function strHash(b: string) {
    let c, a;
    for (a = 0, c = b.length; c--; )
      (a += b.charCodeAt(c)), (a += a << 10), (a ^= a >> 6);
    a += a << 3;
    a ^= a >> 11;
    return (((a + (a << 15)) & 4294967295) >>> 0).toString(16);
  }

  if (!password || strHash(password) !== CORRECT) {
    return (
      <AppPage
        heading="voty.ch – Demokratie an die Schule"
        image="/images/header_m1.svg"
      >
        <Text my={4}>Für diesen Bereich wird ein Passwort benötigt.</Text>
        <Label htmlFor="password">Passwort:</Label>
        <Grid columns="3fr 1fr">
          <Input type="text" onChange={(e) => setPassword(e.target.value)} />
          <Button mt={"4px"} onClick={() => alert("Passwort überprüfen")}>
            Prüfen
          </Button>
        </Grid>
      </AppPage>
    );
  }
  if (typeof localStorage !== "undefined")
    localStorage.setItem("fundraising", password);

  return (
    <AppPage
      heading="voty.ch – Demokratie an die Schule"
      image="/images/header_m1.svg"
    >
      <Card fontSize={2}>
        <Text fontWeight="semi" mt={5} mb={3} px={5}>
          Die Demokratie ist wohl eines der wichtigsten Güter der Schweiz. Aber
          wie ge­lingt es uns, Ju­gendliche dafür zu begeis­tern? Und wie können
          wir helfen, Themen wie dieses in der Schule der Zukunft zu verankern?
          Auf dieser Seite möchten wir unsere <a href="#idee">Idee</a>, den
          aktuellen <a href="#demokratie">Entwicklungsstand</a>, unsere{" "}
          <a href="ziele">Zielsetzung</a> sowie den{" "}
          <a href="#finanzierung">Finanzierungsbedarf</a> für voty.ch darlegen.
          Damit möchten wir Fragen von Stiftungen und potentiellen Geldgebern
          transparent beantworten.
        </Text>
        <Info mx={5} pl={3} fontStyle="italic" fontSize={1}>
          Für Feedback und Anregungen zu dieser Seite sind wir sehr dankbar. Bei
          jedem Abschnitt hast Du die Möglichkeit, uns eine{" "}
          <FeedbackText
            display="inline-block"
            card="Fundraising"
            mt={0}
            text="Frage oder
          Anmerkung"
          />{" "}
          zu schicken.
        </Info>
        <Section title="Idee" id="idee">
          <Text mb={4}>
            Der gemeinnützige Verein «Teachen!» entstand während des ersten
            Lockdowns 2020 und dem spontanen Weekend-Projekt{" "}
            <a href="https://teachen.ch" target="_blank" rel="noreferrer">
              teachen.ch
            </a>
            , einer Plattform für kreative Ideen für den Unterricht zuhause. Als
            Team mit einer Kombination aus viel digitaler Erfahrung und Passion
            in Bildung möchten wir helfen, die Schule der Zukunft
            mitzugestalten. Dafür braucht es tolle Konzepte und Inhalte,
            State-of-the-Art Technologie und ein Gespür dafür, wie der
            Unterricht künftig sowohl synchron im Klassenzimmer als auch
            asynchron im Distance-Learning oder in Mischformen davon ablaufen
            wird.
          </Text>

          <Text mb={4}>
            Den traditionellen Lehrmittelverlagen fehlt dazu die digitale
            Kompetenzen. Google und Microsoft beherrschen zwar die Technologie,
            aber wir trauen ihnen weder das didaktische Feingespür zu, noch
            möchten wir unsere Kinder «Big Tech» anvertrauen. Verschiedene
            Startups sind bereits daran, für die Standardinhalte (Mathematik,
            Sprachen, etc.) entsprechende Plattformen und Inhalte zu entwickeln,
            aber insbesondere bei den Themen der nachhaltigen Entwicklung
            (Schwerpunkt «BNE») gibt es ein grosses Potential in der
            Digitalisierung. Denn auch wenn diese Inhalte im Lehrplan 21 mehr
            Platz finden, im Unterricht fristen sie oft noch ein
            stiefmütterliches Dasein.
          </Text>
          <Text mb={4}>
            Mit «Teachen!» möchten wir diese Lücke schliessen. Wir möchten
            Themen spannend aufbereiten und für die hybride On-/Offline Schule
            bereitstellen. Wir entwickeln eine{" "}
            <a
              href="https://github.com/teachen-ch/voty"
              target="_blank"
              rel="noreferrer"
            >
              Open-Source Lernplattform
            </a>
            . Wir möchten engagierten Lehrpersonen ermöglichen, Inhalte
            beizusteuern und Änderungen vorzuschlagen («github.com for
            educational content»). Wir möchten den wichtigen Themen der
            nachhaltigen Entwicklung den Platz erkämpfen, der ihnen gebührt. Und
            wir möchten lernen, wie wir direkt oder über Partner viele Schulen
            erreichen. Diese Learnings möchten wir weiterzugeben, um künftige
            Bildungsprojekte rascher skalieren zu können.
          </Text>
        </Section>

        <Section
          title="Warum Demokratie – Aktueller Entwicklungsstand"
          id="demokratie"
        >
          <Text mb={4}>
            Der PrototypeFund hat uns ermöglicht, diese Vision für das Thema
            Demokratie zu testen. Dieses Thema liegt uns selber sehr am Herzen,
            und wir sehen einen Handlungsbedarf: die Stimmbeteiligung der jungen
            Bevölkerungsschichten ist knapp halb so hoch wie die der älteren
            Generationen. Und insbesondere in niedrigeren Bildungsschichten wäre
            die Schule noch die einzige Chance, ein Grundverständnis – und eine
            Passion – für unser Demokratie zu legen.
          </Text>
          <Text mb={4}>
            Innerhalb von wenigen Wochen haben wir deshalb eine Plattform
            entwickelt, ein Netzwerk mit Partnern geknüpft und sind bereits im
            November 2020 mit unserem ersten Modul «Demokratie Testen» live
            gegangen. 11 Klassen haben die «Konzernverantwortungsinitiative»
            intensiv diskutiert und danach auf voty.ch abgestimmt. Denn auch
            Jugendliche haben eine Meinung!
          </Text>
          <img src="/screens/voty_screen_vote.jpg" className="screenshot" />
          <figcaption>Screenshot voty.ch Abstimmungsmodul</figcaption>
          <Text my={4}>
            Danach haben wir unseren Online-Werkzeugkasten für den politischen
            Unterricht ausgebaut. Mit interaktiven Modulen für Einzel- oder
            Gruppenarbeiten, Videos mit Quizzes, dem Chatbot «Chaty» oder der
            integrierten Datenbank sämtlicher CH-Abstimmungen und Tausenden von
            Wahlplakaten legen wir den Grundstein für ein neues Lernerlebnis mit
            der Klasse: online oder im Klassenzimmer.
          </Text>
          <SlideShow
            mb={4}
            images={[
              "/screens/voty_screen_cards.jpg",
              "/screens/voty_screen_lerninhalte.jpg",
              "/screens/voty_screen_chaty.jpg",
              "/screens/voty_screen_plakate.jpg",
            ]}
            captions={[
              "Die Online-Werkzeugkiste mit einigen ausgewählten Modulen",
              "Lehrpläne können frei gewählt oder vorgeschlagen werden",
              "Der Chatbot «Chaty» erklärt Grundbegriffe der Demokratie",
              "Integrierte Suche mit Tausenden historischen Wahlplakaten",
            ]}
            className="screenshot"
          />
          <Info fontSize={1} pl={3}>
            <strong>Kostenlose Lehrmittel?</strong> Der Einkauf von Lehrmitteln
            ist in der Schweiz sehr dezentral organisiert. Zudem hat eine
            Lehrperson nur sehr beschränkte Budgetkompetenz. Es reicht also
            weder, einige zentrale Stellen zu überzeugen, noch kann man die
            Basis gewinnen. Vielmehr braucht es aufwändige Sales-Prozesse, die
            aus unserer Sicht in keinem Verhältnis zum Ertrag stehen.
          </Info>
          <ReadMore title="Mehr zu den drei Module von voty.ch">
            <Text mt={4} color="#000">
              <strong>Modul «Demokratie verstehen»</strong>&nbsp;
              <Tag bg={"primary"}>Live seit Feb/21</Tag>
              <br />
              Ein E-Learning-Modul, das den Lehrer*Innen Lernmaterialien und
              interaktive Elemente zur Verfügung stellt, welche die
              Schweizerische Demokratie einfach und verständlich erklären.
              <Detail>
                <Text my={3}>
                  Im ersten Modul stellen wir den Lehrer*Innen
                  Unterrichtsmaterialien zum Demokratieprozess in der Schweiz in
                  Form von verschiedenen Lernpfaden zur Verfügung. Dies sind zum
                  einen von easyvote.ch erarbeitete Unterlagen, aber auch Videos
                  von «SRF mySchool» sowie selbst entwickelte, interaktive
                  E-Learning-Elemente. Mittels diesen Komponenten möchten wir
                  das Thema der Zielgruppe (12 bis 18 Jahre) zusammen mit
                  einfachen Beispielen und illustrativen Erklärungen näher
                  bringen.
                </Text>
                <Text>
                  Das Modul soll nicht theoretisch bleiben, sondern ist mit den
                  beiden anderen Modulen verknüpft. So lernen die Jugendlichen
                  die Begriffe in einem konkreten Kontext kennen und erleben den
                  Prozess hautnah.
                </Text>
              </Detail>
            </Text>
            <Text mt={4} id="module3" color="#000">
              <strong>
                <A href="/abstimmung" variant="underline">
                  Modul «Demokratie testen»
                </A>
              </strong>
              &nbsp;
              <Tag bg={"primary"}>Live seit Nov/20</Tag>
              <br /> Ein Abstimmungsmodul, mit dem aktuelle nationale Urnengänge
              von den Schüler*Innen in der Klasse zuerst diskutiert und danach
              durchgeführt werden können.
              <Detail>
                <Text my={3}>
                  Um die Theorie in die Praxis zu übertragen, wollen wir
                  Abstimmungen für die Jugendlichen erlebbar machen. Hierzu
                  werden die zu den nationalen Vorlagen aufbereiteten Inhalte
                  von easyvote.ch im Modul integriert. Diese dienen als Basis
                  für die Pro/Kontra-Diskussionen innerhalb der Schulklasse.
                  Anschliessend erhalten die Schüler*Innen die Möglichkeit,
                  mittels der Abstimmungsfunktion des Moduls selber an diesen
                  Abstimmungen teilzunehmen.{" "}
                </Text>
                <Text>
                  Die Schülerinnen und Schüler lernen so in diesen Probeläufen
                  den politischen Prozess kennen und setzen sich mit der Theorie
                  und der Praxis der Demokratie auseinander.
                </Text>
              </Detail>
            </Text>
            <Text mt={4} color="#000">
              <strong>Modul «Demokratie erleben»</strong>&nbsp;
              <Tag>in&nbsp;Konzeption</Tag>
              <br />
              Eine Online-Plattform auf der Schüler*Innen eigene Ideen rund um
              ihre Schule einbringen können. Diese werden on- und offline
              diskutiert, ausgearbeitet und geprüft.
              <Detail>
                <Text my={3}>
                  Das dritte Modul bringt den demokratischen
                  Entscheidungsprozess in die Schule. Schulleitung, Lehrerschaft
                  und Schüler*Innen führen gemeinsam einen offenen und kreativen
                  Dialog über schulinterne Ideen und Vorschläge. Schüler*innen
                  können in einem mit der Schulleitung vereinbarten Rahmen
                  (Vertrag) auf der Plattform eigene Ideen («Initiativen»)
                  formulieren, diese gemeinsam off- und online diskutieren,
                  verbessern, final ausarbeiten und dafür Mehrheiten finden.
                  Nach der Prüfung durch die Schulleitung (Machbarkeit /
                  Vertragskonformität) gelangt der ausgearbeitete Vorschlag zur
                  Abstimmung und wird bei einer Annahme realisiert. Dabei werden
                  die Schüler*Innen didaktisch begleitet, um den Prozess
                  gemeinsam zu reflektieren.
                </Text>
                <Text>
                  Das Modul fördert die Kompetenzen Kommunikation, Kollaboration
                  und kritisches Denken und soll die Lust und Freude an
                  demokratischer Partizipation wecken.
                </Text>
              </Detail>
            </Text>
          </ReadMore>
        </Section>

        <Section title="Zielsetzung und Wirkung" id="ziele">
          <Text mb={4}>
            Die Wirkung unseres Projekt entfaltet sich auf zwei Arten. Zum
            ersten möchten wir mit voty.ch einen Standard setzen für ein toll
            gemachtes hybrides Lehrmittel für politische Bildung und damit in
            den nächsten 3 Jahren mindestens{" "}
            <Tag bg="primary">500&nbsp;Schulklassen</Tag> erreichen. Wir sind
            überzeugt, dass die politische Partizipation der nächsten Generation
            nachhaltig gesteigert werden kann, wenn das Thema in der Schulzeit
            intensiver bearbeitet wird. Dabei unterstützt unser «ready-made
            approach» insbesondere Lehrpersonen, die heute Respekt vor dem
            «heiklen» Thema Politik haben.
          </Text>
          <Text>
            Und schliesslich möchten wir nach der Skalierung von voty.ch unseren
            Open-Source Techstack, sowie unsere Erfahrung in der Erarbeitung und
            der Verbreitung von digitalen Lehrmitteln anderen Partnern zur
            Verfügung stellen. In den nächsten 3 Jahren möchten wir prototypisch
            mit Partnerorganisationen aus dem Bereich der nachhaltigen
            Entwicklung{" "}
            <Tag bg="primary">drei&nbsp;weitere&nbsp;Lernprojekte</Tag>{" "}
            durchführen, um dadurch gemeinsam eine ähnliche Wirkung in anderen
            Themenbereichen zu erzielen. Durch diesen Ansatz erhoffen wir uns
            auch, ein nachhaltiges Finanzierungsmodell aufzubauen.
          </Text>
        </Section>

        <Section title="Das Team hinter voty.ch" id="team">
          <Text fontSize={2}>
            <Flex mx={-2} flexWrap="wrap">
              <Person
                name="Stefan Niederhauser"
                href="https://linkedin.com/in/sniederhauser"
                role="Projektleitung und techn. Umsetzung"
                org="LinkedIn"
                image="/people/sn.jpg"
              >
                Stefan hat 25 Jahre Erfahrung mit IT-Projekten aus Startups und
                Corporates und will diese im Bereich der digitalen Bildung und
                der Demokratie einsetzen als Fullstack-Engineer, Entrepreneur,
                Organisator und Weltverbesserer.
              </Person>
              <Person
                name="Roger Wiezel"
                href="http://atelier-w.ch"
                role="Grafische Gestaltung und User Experience"
                org="atelier-w.ch"
                image="/people/rw.jpg"
              >
                Roger gestaltet schon sein Leben lang und seit über zwanzig
                Jahren auch digital. Dabei interessiert ihn vor allem die
                Schnittstelle zwischen Mensch und Maschine. Wie denkt der
                Mensch? Wie wird die Maschine verständlich? Und wie verwandeln
                wir Komplexität in Schönheit?
              </Person>
              <Person
                name="Urs Wildeisen"
                href="https://phbern.ch"
                role="Pädagogische Begleitung"
                org="PH Bern"
                image="/people/uw.jpg"
              >
                Urs ist ein Meister der Didaktik. Wobei er findet, das Kinder
                nach dem ersten Schuljahr meist bereits genügend Bücher gelesen
                haben. Deshalb setzt er seinen Fokus in der Arbeit mit Kindern
                und PH-Studenten lieber auf Robotik, Programmierung, 3D-Druck
                oder Projektarbeit.
              </Person>
              <Person
                name="Barbara Reichen"
                href="https://barbarareichen.com"
                role="Pädagogische Begleitung"
                org="barbarareichen.com"
                image="/people/br.jpg"
              >
                Barbara ist Künstlerin, Kindergärtnerin und Mutter zweier
                Teenager. Sie weiss, dass wir die Welt schleunigst verändern
                müssen und nimmt das auch in die Hand. Mit Kunst. Mit Kindern.
                Und nun mit Demokratie als Mittel zum Zweck!
              </Person>
            </Flex>
          </Text>
        </Section>
        <Section title="Finanzierungsbedarf" id="finanzen">
          <Text mb={4}>
            <strong>Teamgrösse</strong> – Für die Fertigstellung und Skalierung
            von voty.ch benötigten wir schätzungsweise{" "}
            <b>300% Stellenprozente</b>, aufgeteilt auf 6-8 Personen über 2-3
            Jahre. Das bisherige Kernteam bleibt bestehen, im Bereich
            Educational Content würden wir uns gerne verstärken (60% durch 1-2
            Personen), ebenso möchten wir das Team durch zwei Juniors im Bereich
            Software-Entwicklung und Design/UX bereichern, um Nahe bei der
            Zielgruppe zu sein und jungen Menschen wertvolle Startup-Erfahrung
            zu bieten.
          </Text>
          <Text mb={4}>
            <strong>Finanzierungsbedarf</strong> – Für den Aufbau und die
            Skalierung rechnen mit Kosten von etwa <b>CHF 300k / Jahr</b>. Wir
            möchten bis im Sommer 2021 das Budget für ein langfristiges
            Commitment des Teams für die nächsten 2-3 Jahre sichern. Insgesamt
            rechnen wird mit einem Finanzierungsbedarf von
            <b> CHF 600k – 900k</b>.
          </Text>
          <Text mb={4}>
            <strong>Langfristige Finanzierung</strong> - Für die
            Weiterentwicklung und den Betrieb rechnen wir mit Kosten von
            <b>CHF 150k / Jahr</b>, welche wir über 2-3 Projekte mit neuen
            Bildungsinhalten aus dem BNE-Bereich (Nachhaltige Entwicklung)
            finanzieren möchten. Partner liefern dazu Inhalte und betreiben
            Fundraising und wir setzen die Projekt auf unserer Platform um mit
            der Erfahrung in der Skalierung von Lernprojekten.
          </Text>
        </Section>
        <H2 mt={5}>Kontakt für Stiftungen und potentielle Geldgeber</H2>
        <Text mb={4}>
          Stefan Niederhauser, Verein «Teachen!», Alpenweg 11, 3110 Münsingen.
          <br />
          Email:{" "}
          <a href="mailto:fundraising@teachen.ch">fundraising@teachen.ch</a>
        </Text>
      </Card>
    </AppPage>
  );
}

const Section: React.FC<{ title: string; id: string }> = ({
  title,
  id,
  children,
}) => {
  const [show, setShow] = useState(false);
  return (
    <Box
      mt={5}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <Box mt={"-120px"} sx={{ position: "absolute" }} id={id}>
        &nbsp;
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: ["34px", "34px", "50px"],
          visibility: show ? "visible" : "hidden",
          cursor: "pointer",
        }}
        fontSize={1}
        mt={2}
      >
        <FeedbackText
          mt={0}
          text={isMobile() ? "Feedback" : "Feedback zu diesem Abschnitt"}
          card="Fundraising"
          quest={title}
        />
      </Box>
      <H2 mt={0}>{title}</H2>
      {children}
    </Box>
  );
};
