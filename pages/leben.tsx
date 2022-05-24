import { Info } from "components/Learning";
import { NewsletterSlim } from "components/Newsletter";
import { AppPage, H2 } from "components/Page";
import { Text } from "rebass";

export default function LebenPage(): React.ReactElement {
  return (
    <AppPage
      heading="Demokratie leben – an der Schule"
      image="/images/aula_header_m3.svg"
    >
      <Text>
        Wie sehen die Entscheidungsfindungsprozesse an Ihrer Schule aus? Dürfen
        Schülerinnen und Schüler Ideen einbringen? Das Erleben eines
        demokratischen Prozesses fördert die Kompetenzen Kommunikation,
        Kollaboration und kritisches Denken und soll die Lust und Freude an
        demokratischer Partizipation wecken.
      </Text>
      <H2>Konzept</H2>
      <Text>
        Gemeinsam mit aula.de aus Deutschland möchten wir den demokratischen
        Entscheidungsprozess in Schweizer Schulen bringen. Schulleitung,
        Lehrerschaft und Schüler*Innen führen gemeinsam einen offenen und
        kreativen Dialog über schulinterne Ideen und Vorschläge. Schüler*innen
        können in einem mit der Schulleitung vereinbarten Rahmen («Vertrag») auf
        der Platform eigene Ideen («Initiativen») formulieren, diese gemeinsam
        off- und online diskutieren, verbessern, final ausarbeiten und dafür
        Mehrheiten finden. Nach der Prüfung durch die Schulleitung (Machbarkeit
        und Vertragskonformität) gelangt der ausgearbeitete Vorschlag zur
        Abstimmung und wird bei einer Annahme realisiert. Dabei werden die
        Schüler*Innen didaktisch begleitet, um den Prozess gemeinsam zu
        reflektieren.
      </Text>
      <Info type="info" py={3}>
        Wollen Sie an ihrer Schule partizipative Prozessen einzuführen? Dann
        melden Sie sich gerne bei uns!
        <br />
        <br />
        <NewsletterSlim campaign="modul3-leben" />
      </Info>
    </AppPage>
  );
}
