import { AppPage } from "components/Page";
import { Heading, Button, Text, Card, Link as A } from "rebass";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Center } from "components/Learning";
import { HideFeature } from "components/HideFeature";
import { Team } from "components/Team";
import { useTr } from "util/translate";

export default function Projekt(): React.ReactElement {
  const router = useRouter();
  return (
    <AppPage
      heading="voty.ch – Ein Projekt zur Förderung der Demokratie an den Schulen"
      image="/images/header_m1.svg"
    >
      <Card fontSize={2}>
        <Text fontWeight="semi">
          Die Demokratie ist eines der wohl wichtigsten Güter der Schweiz. Aber
          wie ge­lingt es uns, die Ju­gendlichen für die Demo­kratie zu
          begeis­tern?
        </Text>
        <Text mt={4}>
          Wir glauben, dass ein demokratisches Verständnis nur durch
          demokratische Praxis erreicht werden kann. Deshalb möchten wir mit
          voty.ch bereits in der Schule eine Basis für das Demokratieverständnis
          schaffen, dieses mit den Schüler*Innen praktisch anwenden und so die
          Fähigkeiten fördern, welche für eine demokratische Partizipation
          wichtig sind.
        </Text>
        <Heading as="h2">Das Konzept von voty.ch kurz erklärt:</Heading>
        <Text>
          voty.ch ist ein Projekt für eine Lernplattform zur
          De­mo­kratie­förderung an Schulen in der Schweiz bestehend aus drei
          Modulen:
        </Text>
        <Text mt={4}>
          <A href="/lernen" fontWeight="bold" variant="underline">
            Modul «Demokratie verstehen»
          </A>
          &nbsp;
          <Tag bg="primary">Live</Tag>
          <br />
          Ein E-Learning-Modul, das den Lehrer*Innen Lernmaterialien und
          interaktive Elemente zur Verfügung stellt, welche die Schweizerische
          Demokratie einfach und verständlich erklären.
          <Detail>
            <Text my={3}>
              Im ersten Modul stellen wir den Lehrer*Innen
              Unterrichtsmaterialien zum Demokratieprozess in der Schweiz in
              Form von verschiedenen Lernpfaden zur Verfügung. Dies sind zum
              einen von easyvote.ch erarbeitete Unterlagen, aber auch Videos von
              «SRF mySchool» sowie selbst entwickelte, interaktive
              E-Learning-Elemente. Mittels diesen Komponenten möchten wir das
              Thema der Zielgruppe (12 bis 18 Jahre) zusammen mit einfachen
              Beispielen und illustrativen Erklärungen näher bringen.
            </Text>
            <Text>
              Das Modul soll nicht theoretisch bleiben, sondern ist mit den
              beiden anderen Modulen verknüpft. So lernen die Jugendlichen die
              Begriffe in einem konkreten Kontext kennen und erleben den Prozess
              hautnah.
            </Text>
            <Button mt={3} onClick={() => router.push("/anmelden")}>
              Jetzt anmelden
            </Button>
          </Detail>
        </Text>
        <Text mt={4}>
          <A href="/abstimmung" variant="underline" fontWeight="bold">
            Modul «Demokratie testen»
          </A>
          &nbsp;
          <Tag bg="primary">Live</Tag>
          <br /> Ein Abstimmungsmodul, mit dem aktuelle nationale Urnengänge von
          den Schüler*Innen in der Klasse zuerst diskutiert und danach
          durchgeführt werden können.
          <Detail>
            <Text my={3}>
              Um die Theorie in die Praxis zu übertragen, wollen wir
              Abstimmungen für die Jugendlichen erlebbar machen. Hierzu werden
              die zu den nationalen Vorlagen aufbereiteten Inhalte von
              easyvote.ch im Modul integriert. Diese dienen als Basis für die
              Pro/Kontra-Diskussionen innerhalb der Schulklasse. Anschliessend
              erhalten die Schüler*Innen die Möglichkeit, mittels der
              Abstimmungsfunktion des Moduls selber an diesen Abstimmungen
              teilzunehmen.{" "}
            </Text>
            <Text>
              Die Schülerinnen und Schüler lernen so in diesen Probeläufen den
              politischen Prozess kennen und setzen sich mit der Theorie und der
              Praxis der Demokratie auseinander.
            </Text>
          </Detail>
        </Text>

        <Text mt={4} id="modul3">
          <A href="/leben" variant="underline" fontWeight="bold">
            Modul «Demokratie leben»
          </A>
          &nbsp;
          <Tag>in&nbsp;Konzeption</Tag>
          <br />
          Eine Online-Plattform auf der Schüler*Innen eigene Ideen rund um ihre
          Schule einbringen können. Diese werden on- und offline diskutiert,
          ausgearbeitet und geprüft.
          <Detail>
            <Text my={3}>
              Das dritte Modul bringt den demokratischen Entscheidungsprozess in
              die Schule. Schulleitung, Lehrerschaft und Schüler*Innen führen
              gemeinsam einen offenen und kreativen Dialog über schulinterne
              Ideen und Vorschläge. Schüler*innen können in einem mit der
              Schulleitung vereinbarten Rahmen (Vertrag) auf der Platform eigene
              Ideen («Initiativen») formulieren, diese gemeinsam off- und online
              diskutieren, verbessern, final ausarbeiten und dafür Mehrheiten
              finden. Nach der Prüfung durch die Schulleitung (Machbarkeit /
              Vertragskonformität) gelangt der ausgearbeitete Vorschlag zur
              Abstimmung und wird bei einer Annahme realisiert. Dabei werden die
              Schüler*Innen didaktisch begleitet, um den Prozess gemeinsam zu
              reflektieren.
            </Text>
            <Text>
              Das Modul fördert die Kompetenzen Kommunikation, Kollaboration und
              kritisches Denken und soll die Lust und Freude an demokratischer
              Partizipation wecken.
            </Text>
          </Detail>
        </Text>
        <HideFeature id="demo">
          <Center>
            <Button mt={4} onClick={() => router.push("/demo")}>
              Auf demo.voty.ch testen?
            </Button>
          </Center>
        </HideFeature>
        <Heading>Teilnahmevoraussetzungen</Heading>
        <Text>
          Sämtliche Angebote von voty.ch werden Schulen und Lehrpersonen
          kostenlos angeboten und richten sich primär an die Stufen Sek-1,
          Gymnasium und Berufsschule. Die Plattform voty.ch mit den drei Modulen
          kann auf jedem Computer, Tablet oder Smartphone mit Internetzugang
          ohne Installation einer zusätzlichen Software genutzt werden.
        </Text>
        <Heading>Datenschutz</Heading>
        <Text>
          Datenschutz und Sicherheit ist für uns zentral. Wir betreiben ein
          Angebot für Schülerinnen und Schüler und bieten die Möglichkeit der
          politischen Meinungsäusserung auf unserer Plattform. Deshalb setzen
          wir alles daran, dass die bei uns gespeicherten Daten nach aktuellen
          Standards gesichert. Weitere Informationen zum Datenschutz findest Du{" "}
          <A href="/datenschutz" variant="underline">
            hier
          </A>
          .
        </Text>
        <Heading>Wer steht hinter voty.ch?</Heading>
        <Text>
          voty.ch ist ein Projekt des Vereins «voty.ch», das initial im Rahmen
          des prototypefund.opendata.ch entwickelt und durch mercator-schweiz.ch
          finanziert wurde.
        </Text>
        <Team />
        <Heading>Wir haben ihr Interesse geweckt?</Heading>
        <Text>
          Du bist am Projekt interessiert, hast Fragen, Anregungen oder ihr
          möchtet als Pilotklasse am Projekt teilnehmen? Wir freuen uns auf eine{" "}
          <A href="/kontakt" variant="underline">
            Kontaktaufnahme
          </A>
        </Text>
        <Heading>Kontakt</Heading>
        <Text>voty.ch, Effingerstrasse 10, 3011 Bern, hello@voty.ch</Text>
      </Card>
    </AppPage>
  );
}

export const Tag: React.FC<React.PropsWithChildren<{ bg?: string }>> = ({
  children,
  bg,
}) => (
  <Text
    fontSize={1}
    bg={bg || "rgb(187, 187, 187)"}
    sx={{ borderRadius: 0, display: "inline" }}
    color="#fff"
    px={2}
    py={"2px"}
  >
    {children}
  </Text>
);

export const Detail: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const tr = useTr();
  return (
    <Text sx={{ display: "inline" }}>
      &nbsp;{" "}
      <A onClick={() => setOpen(!open)} variant="underline">
        {open ? tr("Misc.DetailOpen") : tr("Misc.DetailClosed")}
      </A>
      {open && children}
    </Text>
  );
};
