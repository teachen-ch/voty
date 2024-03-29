import { Info } from "components/Learning";
import { NewsletterSlim } from "components/Newsletter";
import { AppPage } from "components/Page";
import { SlideShow } from "components/SlideShow";
import { Text } from "rebass";

export default function DistanceLearningBlog(): React.ReactElement {
  return (
    <AppPage
      heading="Wie sehen gute Lehrmittel für Distance Learning aus?"
      image="/images/header_m1.svg"
    >
      <Text fontWeight="bold">
        Als im Frühling 2020 die Schulen geschlossen wurden war Improvisation
        das Gebot der Stunde. Buchseiten wurde fotografiert, E-Learning Angebote
        für den Selbstunterricht wurden verteilt, kreative Aufgaben wurden
        erfunden. Aber wie sehen Lehrmittel aus, die den Lernprozess einer
        «Distributed Class» optimal unterstützen?
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
      <Text>
        Der Trend zu mehr «Home Office» und zu «Distributed Teams» wird die
        Arbeitswelt nachhaltig auch nach der Pandemie prägen. Ebenso wird die
        Schule von Morgen Elemente des Distance Learnings fest integrieren.
        Denn, darin sind sich viele Lehrpersonen wie Schüler*innen einig: eine
        Kombination beider Welten (Online + Klassenzimmer) wäre optimal. Aber
        solche Szenarien benötigen auch neue Lehrmittel und Unterrichtsmethoden.
      </Text>
      <Text mt={4}>
        Wir haben den Anspruch, voty.ch als hybride Platform zu entwickeln. Wenn
        morgen die Schulen schliessen, kann der Demokratie-Unterricht zu 100%
        online stattfinden. Aber auch sonst sollen Schüler*innen wo möglich im
        eigenen Tempo lernen, recherchieren und Aufgaben bearbeiten. Aber ebenso
        wichtig ist die Interaktion mit der Klasse. Auf voty.ch integrieren wir
        deshalb Diskussions- und Feedbackmodule in alle Lerninhalte. Ein
        «Klassenfeed» zeigt an, wo die Lernenden gerade stehen. Und natürlich
        freuen wir uns auf die Zeit, wo im Klassenzimmer wieder ohne Maske
        beherzt debattieren werden kann - denn auch das ist ein wichtiges
        Werkzeug der Demokratie, das gelernt sein will.
      </Text>
      <img
        src="/screens/screen_activities.png"
        className="screenshot"
        alt="Aktivitäten"
      />
      <Info type="info" py={3}>
        Möchten sie unsere Lerninhalte mit ihrer Klasse im Distance Learning
        oder im Klassenzimmer testen? Tragen sie sich ein auf unser Liste ein
        und wir melden uns gerne bei Ihnen:
        <br />
        <br />
        <NewsletterSlim />
      </Info>
    </AppPage>
  );
}
