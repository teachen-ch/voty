import { H2, Page } from "components/Page";
import { Button, Text, Flex } from "components/ui";
import { useState } from "react";
import Image from "next/image";
import { A } from "components/Breadcrumb";
import {
  Choice,
  MultiChoice,
  Order,
  Quest,
  Question,
  Textfield,
} from "components/Quests";
import { Pill } from "components/Misc";

export default function CardsPublic(): React.ReactElement {
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();

  function resetFilters() {
    setAge(undefined);
    setType(undefined);
    setKeywords("");
  }
  return (
    <Page heading="Format Lerninhalte">
      <p>
        Hier findest du Beispiele von Lerninhalten, die du für deine eigenen
        Themen verwenden kannst. Du kannst Text, Bilder, Videos und Quizzes
        kombinieren oder du kannst einen eigenen Chatbot zur Demokratie
        erstellen.
      </p>
      <H2>Texte, Bilder, Videos</H2>
      <p>
        Auf voty.ch kannst du Texte mit Bildern und Videos darstellen. Versuche
        deine Texte kurz und einfach zu halten, Jugendliche mögen keine langen
        Texte 🙃.
      </p>
      <p>
        Wenn du gute Bilder zum Thema findest, dann musst du darauf achten, dass
        diese lizenzfrei sind, sonst kriegst du noch eine Copyright-Klage an den
        Hals 😬.{" "}
      </p>
      <p>
        <small>
          Auf der Google-Bildersuche kannst du dazu unter{" "}
          <em>Suchfilter &gt; Nutzungsrechte &gt; Creative-Commons-Lizenzen</em>{" "}
          auswählen. Hier geht&apos;s zur{" "}
          <A href="https://www.google.ch/search?q=griechenland&tbm=isch&tbs=il:cl&hl=de&sa=X&biw=1203&bih=649">
            Google-Bildersuche
          </A>
          .
        </small>
      </p>
      <Image
        src="/content/voty_yeah.jpg"
        alt="voty.ch Yeah!"
        width={736}
        height={342}
      />
      <H2>Chatbot</H2>
      <p>
        Auf voty.ch haben wir einen Chatbot für Demokratie-Inhalte entwickelt.
        Hier findest du ein Beispiel: 👉{" "}
        <A href="/cards/chaty_demokratie_griechenland" target="_blank">
          Chaty: wer hat die Demokratie erfunden?
        </A>
      </p>
      <p>
        Wenn du selber einen eigenen Chatbot entwickeln möchtest, dann klicke
        hier:
      </p>
      <A className="mt-[-4px] mb-8 block" href="/cards/chaty_create">
        <Button>Eigenen Chatbot erstellen</Button>
      </A>
      <H2>Quizzes, Fragen, Tests</H2>
      Am besten fügt ihr zu eurer Online-Lerneinheit auch noch einige
      Kontrollfragen hinzu. Dazu gibt es verschiedene Fragemodule:
      <Quest>
        <Question>
          <Pill>TEXTFRAGE</Pill> Stelle eine Wissens- oder eine
          Diskussionsfrage die Schüler*innen alleine oder in der Gruppe
          beantworten sollen.
          <Textfield
            id="1"
            lines={3}
            placeholder="Zu was soll ich denn eine Antwort schreiben... ?"
          />
        </Question>

        <Question>
          <Pill>MULTICHOICE</Pill> Schliesslich kannst du auch
          Multiple-Choice Fragen stellen.
          <br />
          <br />
          <MultiChoice id="2">
            <Choice>Diese Antwort stimmt sicher nicht.</Choice>
            <Choice correct>Die Antwort ist goldrichtig.</Choice>
            <Choice>Die Antwort soll nur verwirren.</Choice>
          </MultiChoice>
        </Question>
        <Question>
          <Pill>REIHENFOLGE</Pill>Bei dieser Frage hier zum
          Beispiel, musst du die Antworten in eine richtige Reihenfolge bringen:
          <Order
            id="3"
            items={[
              "Als erstens kommt natürlich das hier",
              "Danach wäre es wahrscheinlich clever, das als zweites zu machen",
              "Nach dem zweiten und vor dem vierten",
              "Das hier bleibt noch übrig. Wohin wohl damit?",
              "Und zu guter Letzt kommt noch das hier",
            ]}
          />
        </Question>
      </Quest>
    </Page>
  );
}
