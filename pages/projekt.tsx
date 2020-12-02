import { AppPage } from "components/Page";
import { Heading, Text, Card, Link as A } from "rebass";
import { useState } from "react";

export default function Projekt(): React.ReactElement {
  return (
    <AppPage heading="voty.ch – Ein Projekt zur Förderung der Demokratie an den Schulen">
      <Text textAlign="left">
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
        <Card fontSize={2}>
          <Heading as="h2" mt={0}>
            Das Konzept von voty.ch kurz erklärt:
          </Heading>
          <Text>
            voty.ch ist ein Pilotprojekt für eine Lernplattform zur
            De­mo­kratie­förderung an Schulen in der Schweiz bestehend aus
            Modulen:
          </Text>
          <Text mt={4}>
            <strong>Modul «Demokratie verstehen»</strong>&nbsp;
            <Tag>in&nbsp;Entwicklung</Tag>
            <br />
            Ein E-Learning-Modul, das den Lehrer*Innen Lernmaterialien und
            interaktive Elemente zur Verfügung stellt, welche die Schweizerische
            Demokratie einfach und verständlich erklären.
            <Detail>
              <Text my={3}>
                Im ersten Modul stellen wir den Lehrer*Innen
                Unterrichtsmaterialien zum Demokratieprozess in der Schweiz in
                Form von verschiedenen Lernpfaden zur Verfügung. Dies sind zum
                einen von easyvote.ch erarbeitete Unterlagen, aber auch Videos
                von «SRF mySchool» sowie selbst entwickelte, interaktive
                E-Learning-Elemente. Mittels diesen Komponenten möchten wir das
                Thema der Zielgruppe (12 bis 18 Jahre) zusammen mit einfachen
                Beispielen und illustrativen Erklärungen näher bringen.
              </Text>
              <Text>
                Das Modul soll nicht theoretisch bleiben, sondern ist mit den
                beiden anderen Modulen verknüpft. So lernen die Jugendlichen die
                Begriffe in einem konkreten Kontext kennen und erleben den
                Prozess hautnah.
              </Text>
            </Detail>
          </Text>
          <Text mt={4}>
            <strong>Modul «Demokratie testen»</strong>&nbsp;
            <Tag bg={"secondary"}>Live</Tag>
            <br /> Ein Abstimmungsmodul, mit dem aktuelle nationale Urnengänge
            von den Schüler*Innen in der Klasse mit der Lehrerschaft diskutiert
            und danach durchgeführt werden können.
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
                politischen Prozess kennen und setzen sich mit der Theorie und
                der Praxis der Demokratie auseinander.
              </Text>
            </Detail>
          </Text>

          <Text mt={4}>
            <strong>Modul «Demokratie erleben»</strong>&nbsp;
            <Tag>in&nbsp;Konzeption</Tag>
            <br />
            Eine Online-Plattform auf der Schüler*Innen eigene Ideen rund um
            ihre Schule einbringen können. Diese werden on- und offline
            diskutiert, ausgearbeitet und geprüft.
            <Detail>
              <Text my={3}>
                Das dritte Modul bringt den demokratischen Entscheidungsprozess
                in die Schule. Schulleitung, Lehrerschaft und Schüler*Innen
                führen gemeinsam einen offenen und kreativen Dialog über
                schulinterne Ideen und Vorschläge. Schüler*innen können in einem
                mit der Schulleitung vereinbarten Rahmen (Vertrag) auf der
                Platform eigene Ideen («Initiativen») formulieren, diese
                gemeinsam off- und online diskutieren, verbessern, final
                ausarbeiten und dafür Mehrheiten finden. Nach der Prüfung durch
                die Schulleitung (Machbarkeit / Vertragskonformität) gelangt der
                ausgearbeitete Vorschlag zur Abstimmung und wird bei einer
                Annahme realisiert. Dabei werden die Schüler*Innen didaktisch
                begleitet, um den Prozess gemeinsam zu reflektieren.
              </Text>
              <Text>
                Das Modul fördert die Kompetenzen Kommunikation, Kollaboration
                und kritisches Denken und soll die Lust und Freude an
                demokratischer Partizipation wecken.
              </Text>
            </Detail>
          </Text>
        </Card>
        <Heading>Teilnahmevoraussetzungen</Heading>
        <Text>
          Sämtliche Angebote von voty.ch werden Schulen und Lehrpersonen
          kostenlos angeboten und richten sich primär an die Stufen Sek-1,
          Gymnasium und Berufsschule. Die Plattform voty.ch mit den drei Modulen
          ist webbasierend aufgebaut und kann auf jedem Computer, Tablet oder
          Smartphone mit Internetzugang ohne Installation einer zusätzlichen
          Software genutzt werden.
        </Text>
        <Heading>Datenschutz</Heading>
        <Text>
          Datenschutz und Sicherheit ist für uns zentral. Wir betreiben ein
          Angebot für Schülerinnen und Schüler und bieten die Möglichkeit der
          politischen Meinungsäusserung auf unserer Plattform. Deshalb setzen
          wir alles daran, dass die bei uns gespeicherten Daten nach aktuellen
          Standards gesichert. Weitere Informationen zum Datenschutz finden sie
          [hier].
        </Text>
        <Heading>Wer steht hinter voty.ch?</Heading>
        <Text>
          voty.ch ist ein Projekt des Vereins «Teachen!» das im Rahmen des
          prototypefund.opendata.ch entwickelt wird. Das Projektteam setzt sich
          wie folgt zusammen:
        </Text>
        <Text fontSize={2}>
          <ul>
            <li>
              <strong>Stefan Niederhauser</strong> (
              <A
                href="https://linkedin.com/in/sniederhauser"
                variant="underline"
              >
                LinkedIn
              </A>
              ), Projektleitung, technische Umsetzung
            </li>
            <li>
              <strong>Roger Wiezel</strong> (
              <A href="https://atelier-w.ch" variant="underline">
                atelier-w.ch
              </A>
              ), Grafische Gestaltung und User Experience
            </li>
            <li>
              <strong>Urs Wildeisen</strong> (
              <A href="https://phbern.ch" variant="underline">
                PH Bern
              </A>
              ), Pädagogische Begleitung
            </li>
            <li>
              <strong>Barbara Reichen</strong> (
              <A href="https://barbarareichen.com" variant="underline">
                barbarareichen.com
              </A>
              ), Pädagogische Begleitung
            </li>
          </ul>
        </Text>
        <Heading>Wir haben Ihr Interesse geweckt?</Heading>
        <Text>
          Sie sind am Projekt interessiert, haben Fragen, Anregungen oder
          möchten als Pilotklasse am Projekt teilnehmen? Wir freuen uns auf Ihre{" "}
          <A href="/kontakt" variant="underline">
            Kontaktaufnahme
          </A>
        </Text>
        <Heading>Kontakt</Heading>
        <Text>Verein «Teachen!», Alpenweg 11, Münsingen, info@teachen.ch</Text>
      </Text>
    </AppPage>
  );
}

const Tag: React.FC<{ bg?: string }> = ({ children, bg }) => (
  <Text
    fontSize={1}
    bg={bg || "#bbb"}
    sx={{ borderRadius: 0, display: "inline" }}
    color="white"
    px={2}
    py={"2px"}
  >
    {children}
  </Text>
);

export const Detail: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Text sx={{ display: "inline" }}>
      &nbsp;{" "}
      <A onClick={() => setOpen(!open)} variant="underline">
        {open ? "" : "Im Detail…"}
      </A>
      {open && children}
    </Text>
  );
};
