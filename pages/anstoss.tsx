import { FeedbackPlain } from "components/Feedback";
import { Info, Center } from "components/Learning";
import { Box, Image, Heading, Text } from "components/ui";
import { Page } from "components/Page";
import { ReactElement } from "react";

export default function AnstossPage(): ReactElement {
  return (
    <Page heading="Anstoss Demokratie">
      <Image src="/images/header_m3.svg" />
      <Heading>
        3 Länder, 1 Sprache, viele Ideen: Lernen gemeinsam gestalten
      </Heading>

      <Center>
        <Info>
          Schulklassen aus D-A-CH erarbeiten gemeinsam zwischen Januar – März
          2022 interaktive Lerninhalte zur politischen Bildung, welche durch
          uns redigiert und auf voty.ch veröffentlicht werden.{" "}
          <strong>Anmeldefrist verlängert bis zum 8. Dezember 2021!</strong>
        </Info>
      </Center>

      <FeedbackPlain title="Ja, wir wären gern dabei:" />

      <Box className="text-sm mt-8 mb-16">
        <Text as="p">
          Liebe Schülerinnen und Schüler, liebe Lehrerinnen und Lehrer
        </Text>

        <Text as="p">
          wir sprechen eine Sprache, leben in unterschiedlichen politischen
          Systemen und tauschen uns doch wenig darüber aus: In Österreich,
          Deutschland und der Schweiz können wir viel voneinander lernen –
          besonders über Politik. Wir geben jungen Menschen aus den drei
          Ländern die Möglichkeit, in länderübergreifender Zusammenarbeit
          Lerninhalte rund um politische Themen zu erstellen, die auf der
          Schweizer Plattform für Demokratiebildung voty.ch veröffentlicht
          werden. Die erstellten Lerninhalte können von Schulen in Deutschland,
          Österreich und der Schweiz genutzt werden. Beispiele für Themenfelder
          sind: Umwelt, Gleichberechtigung, Religionsfreiheit, Frauenrechte,
          politische Systeme in D-A-CH uvm. Die Lerninhalte können in
          unterschiedlichen Formaten wie Quizzes, Grafiken, Texten oder Videos
          erstellt werden. Wir, das sind aula.de und voty.ch, begleiten diesen
          Prozess organisatorisch und redaktionell.
        </Text>

        <Text as="p">
          Die Jugendlichen recherchieren zunächst selbstständig, entwickeln
          Formate und tauschen sich anschließend per (Video-)Chat mit
          Schülerinnen und Schülern aus Deutschland, der Schweiz und Österreich
          aus. Die Arbeitsphase startet am <strong>10.01.2022</strong> und
          endet am <strong>08.03.2022</strong>. Die Lerninhalte werden Ende
          März 2022 auf der Plattform voty.ch als freie Lehrmaterialien
          veröffentlicht, wobei die Jugendlichen namentlich als Autor*innen
          genannt werden können. Wir von voty.ch und aula.de begleiten und
          moderieren diesen trinationalen Prozess und stehen stets als
          Ansprechpartner*innen zur Verfügung. Die Bearbeitung der Themen
          lässt sich prima in den Politik-, Sozialwissenschafts- oder
          Geschichtsunterricht integrieren, kann aber auch im Rahmen von AGs
          oder Projekttagen erfolgen.
        </Text>

        <Text as="p">
          Die Bewerbungsfrist wurde verlängert auf den{" "}
          <strong>8.12.2021</strong>. Zusagen und den genauen Ablauf verschicken
          wir am <strong>08.12.2021</strong>. Dann erhalten die teilnehmenden
          Schulen Vorlagen für die Erarbeitung der Lerninhalte durch die
          Schüler*innen.
        </Text>

        <Text as="p">Wir freuen uns auf die Bewerbungen!</Text>

        <Text as="p">Eure Teams von voty.ch und aula.de</Text>
      </Box>

      <FeedbackPlain title="Ja, wir wären gern dabei:" />
    </Page>
  );
}
