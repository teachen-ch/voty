import { SlideShow } from "components/SlideShow";
import { A } from "components/Breadcrumb";
import { InlineSignup } from "./user/signup";
import { AppPage } from "components/Page";
import { Text } from "rebass";

export default function LernenPage(): React.ReactElement {
  return (
    <AppPage
      heading="Online Werkzeugkiste für Demokratie-Unterricht"
      image="/images/header_m1.svg"
    >
      <Text>
        voty.ch stellt ein stetig wachsendes Angebot an kostenlosen digitalen
        Lerninhalten für die politische Bildung zur Verfügung. Parallel zu
        unserem{" "}
        <A href="/abstimmung" target="content">
          Abstimmungsmodul
        </A>{" "}
        für Schulklassen , einer Auswahl an{" "}
        <A href="/cards/" target="content">
          Videos von «SRF mySchool»
        </A>{" "}
        sowie dem{" "}
        <A href="/cards/chaty_demokratie_griechenland" target="content">
          Bot «Chaty»
        </A>
        , der Grundbegriffe der Demokratie erklärt, entwickeln wir interaktive,
        digitale Lerninhalte für Einzel- oder Gruppenarbeiten (Bsp:{" "}
        <A href="/cards/passion" target="content">
          Passion für Demokratie
        </A>
        ,{" "}
        <A href="/cards/swissvotes_themen" target="content">
          Themen, die die Schweiz bewegen
        </A>
        ,{" "}
        <A href="/cards/tweety" target="content">
          Tweety – Deine Meinung
        </A>
        ).
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
          "Integrierte Suche mit Tausenden von historischen Wahlplakaten",
        ]}
        className="screenshot"
      />
      Du unterrichtest politische Bildung und möchtest voty.ch im Unterricht
      einsetzen? Noch sind nicht alle Inhalte fertiggestellt aber wir freuen uns
      über Feedback aus dem Praxiseinsatz!
      <InlineSignup />
    </AppPage>
  );
}
