import { Cards } from "components/Cards";
import { AppPage, H2 } from "components/Page";
import { Text } from "rebass";
import { useState } from "react";
import { A } from "components/Breadcrumb";

export default function CardsPublic(): React.ReactElement {
  const [keywords, setKeywords] = useState("Aula");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  function resetFilters() {
    setAge(undefined);
    setType(undefined);
    setKeywords("");
  }
  return (
    <AppPage
      heading="Demokratie lernen – an der Schule"
      image="/images/aula_header_m1.svg"
    >
      Wie funktioniert denn jetzt eigentlich Demokratie, wer hat sich das
      ausgedacht und warum? Funktioniert Demokratie überall gleich? Mit aula
      wendet ihr können sich an eurer Schule Kinder und Jugendliche schon aktiv
      beteiligen. Ganz praktisch habt ihr also schon Erfahrung mit Demokratie
      gesammelt. Jetzt habt ihr die Möglichkeit, mehr zu den Hintergründen zu
      lernen und dabei selbst aktiv zu werden. Los geht’s!
      <H2>Konzept</H2>
      <Text>
        Gemeinsam mit voty.ch aus der Schweiz laden wir euch ein, mehr rund um
        das große Thema Demokratie zu lernen – und zwar komplett digital. Hier
        findet ihr spannende Videos zum Thema, erstellt einen Chatbot, gestaltet
        selbst Wahlplakate, testet euer Wissen in Quizzes und vieles mehr. Wir
        haben hier auch einen Vorschlag für die Begleitung von
        Beteiligungsprozessen an der Schule hinterlegt. Dadurch, dass ihr
        bereits aula nutzt, könnt ihr vieles davon auf der aula-Plattform
        erledigen.
      </Text>
      <Text my={4}>
        <strong>Übrigens</strong>: Die interaktiven Teile von voty.ch könnt ihr
        als Klasse nutzen, wenn Eure Lehrperson{" "}
        <A href="/user/signup">Eure Klasse hier anmeldet</A>. an.
      </Text>
      <Cards
        keywords={keywords}
        type={type}
        age={age}
        resetFilters={resetFilters}
      />
    </AppPage>
  );
}
