import { Info } from "components/Learning";
import { NewsletterSlim } from "components/Newsletter";
import { AppPage, H2 } from "components/Page";
import { Text } from "rebass";

export default function LebenPage(): React.ReactElement {
  return (
    <AppPage
      heading="Demokratie leben – an der Schule"
      image="/images/header_m3.svg"
    >
      <Text>
        Wie sehen die Entscheidungsfindungsprozesse an ihrer Schule aus? Dürfen
        Schülerinnen und Schüler Ideen einbringen? Das Erleben eines
        demokratischen Prozesses fördert die Kompetenzen Kommunikation,
        Kollaboration und kritisches Denken und soll die Lust und Freude an
        demokratischer Partizipation wecken.
      </Text>
      <img src="/screens/voty_screen_leben.jpg" className="screenshot" />
      <figcaption>In Konzeption: Modul 3 – «Demokratie leben»</figcaption>
      <H2>Konzept</H2>
      <Text>
        Wir möchten auf voty.ch den demokratischen Entscheidungsprozess in die
        Schule bringen. Schulleitung, Lehrerschaft und Schüler*Innen führen
        gemeinsam einen offenen und kreativen Dialog über schulinterne Ideen und
        Vorschläge. Schüler*innen können in einem mit der Schulleitung
        vereinbarten Rahmen («Vertrag») auf der Platform eigene Ideen
        («Initiativen») formulieren, diese gemeinsam off- und online
        diskutieren, verbessern, final ausarbeiten und dafür Mehrheiten finden.
        Nach der Prüfung durch die Schulleitung (Machbarkeit und
        Vertragskonformität) gelangt der ausgearbeitete Vorschlag zur Abstimmung
        und wird bei einer Annahme realisiert. Dabei werden die Schüler\*Innen
        didaktisch begleitet, um den Prozess gemeinsam zu reflektieren.
      </Text>
      <Info type="info" py={3}>
        Denken sie darüber nach, an ihrer Schule partizipative Prozessen
        einzuführen oder haben sie bereits Erfahrungen damit gesammelt? Dann
        würden wir gerne mit ihnen ins Gespräch kommen!
        <br />
        <br />
        <NewsletterSlim campaign="modul3-leben" />
      </Info>
    </AppPage>
  );
}
