import Head from "next/head";
import { Page } from "components/Page";
import { Link as A, Heading, Text } from "rebass";
import { ReactElement } from "react";

export default function Datenschutz(): ReactElement {
  return (
    <Page heading="Datenschutz">
      <Head>
        <title>voty - Datenschutz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h2">
        Welche personenbezogenen Daten wir sammeln und warum
      </Heading>
      <Text>
        Wenn Sie auf diese Webseite zugreifen werden automatisch Informationen
        allgemeiner Natur erfasst. Diese Informationen werden im Server-Logfile
        erfasst und beinhalten die Art des Webbrowsers, das verwendete
        Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre
        IP-Adresse und ähnliches.
      </Text>
      <Text>Dies aus folgendem Grund:</Text>
      <ul>
        <li>
          Sicherstellung eines problemlosen Verbindungsaufbaus der Website
        </li>
        <li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
        <li>Auswertung der Systemsicherheit und -stabilität sowie</li>
        <li>zu weiteren administrativen Zwecken</li>
      </ul>
      <Text>
        Ihre Daten werden nicht verwendet, um Rückschlüsse auf Ihre Person zu
        ziehen. Informationen dieser Art werden lediglich statistisch
        ausgewertet, um unseren Internetauftritt und die dahinterstehende
        Technik zu optimieren.
      </Text>
      <Heading as="h2">Speicherdauer</Heading>
      <Text>
        Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht
        mehr erforderlich sind. Dies ist für die Daten, die der Bereitstellung
        der Webseite dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung
        beendet ist.
      </Text>
      <Heading as="h2">Kommentare</Heading>
      <Text>
        Wenn Besucher Kommentare auf der Website schreiben, sammeln wir die
        Daten, die im Kommentar-Formular angezeigt werden, ausserdem die
        IP-Adresse des Besuchers und den User-Agent-String (damit wird der
        Browser identifiziert), um die Erkennung von Spam zu unterstützen.
      </Text>
      <Text>
        Aus Ihrer E-Mail-Adresse kann eine anonymisierte Zeichenfolge erstellt
        (auch Hash genannt) und dem Gravatar-Dienst übergeben werden, um zu
        prüfen, ob Sie diesen benutzt. Die Datenschutzerklärung des
        Gravatar-Dienstes finden Sie hier: https://automattic.com/privacy/.
        Nachdem Ihr Kommentar freigegeben wurde, ist Ihr Profilbild öffentlich
        im Kontext Ihres Kommentars sichtbar.
      </Text>
      <Heading as="h2">Medien</Heading>
      <Text>
        Wenn Sie ein registrierter Benutzer sind und Fotos auf diese Website
        laden, sollten Sie vermeiden, Fotos mit einem EXIF-GPS-Standort
        hochzuladen. Besucher dieser Website könnten Fotos, die auf dieser
        Website gespeichert sind, downloaden und deren Standort-Informationen
        extrahieren.
      </Text>
      <Heading as="h2">Kontaktformulare</Heading>
      <Text>
        Die von Ihnen eingegebenen Daten werden zum Zweck der individuellen
        Kommunikation mit Ihnen gespeichert. Hierfür ist die Angabe einer
        validen E-Mail-Adresse sowie Ihres Namens erforderlich. Diese dient der
        Zuordnung der Anfrage und der anschließenden Beantwortung derselben. Die
        Angabe weiterer Daten ist optional.
      </Text>
      <Heading as="h2">Cookies</Heading>
      <Text>
        Wenn Sie einen Kommentar auf unserer Website schreiben, kann das eine
        Einwilligung sein, Ihren Namen, E-Mail-Adresse und Website in Cookies zu
        speichern. Dies ist eine Komfortfunktion, damit Sie nicht, wenn Sie
        einen weiteren Kommentar schreiben, all diese Daten erneut eingeben
        müssen. Diese Cookies werden ein Jahr lang gespeichert.
      </Text>
      <Text>
        Falls Sie ein Konto haben und Sie sich auf dieser Website anmelden,
        werden wir ein temporäres Cookie setzen, um festzustellen, ob Ihr
        Browser Cookies akzeptiert. Dieses Cookie enthält keine
        personenbezogenen Daten und wird verworfen, wenn Sie Ihren Browser
        schliessen.
      </Text>
      <Text>
        Wenn Sie sich anmelden, werden wir einige Cookies einrichten, um Ihre
        Anmeldeinformationen und Anzeigeoptionen zu speichern. Anmelde-Cookies
        verfallen nach zwei Tagen und Cookies für die Anzeigeoptionen nach einem
        Jahr. Falls Sie bei der Anmeldung „Angemeldet bleiben“ auswählen, wird
        Ihre Anmeldung zwei Wochen lang aufrechterhalten. Mit der Abmeldung aus
        Ihrem Konto werden die Anmelde-Cookies gelöscht.
      </Text>
      <Text>
        Wenn Sie einen Artikel bearbeiten oder veröffentlichen, wird ein
        zusätzlicher Cookie in Ihrem Browser gespeichert. Dieser Cookie enthält
        keine personenbezogenen Daten und verweist nur auf die Beitrags-ID des
        Artikels, den Sie gerade bearbeitet haben. Der Cookie verfällt nach
        einem Tag.
      </Text>
      <Heading as="h2">
        Verwendung von Scriptbibliotheken (Google Webfonts)
      </Heading>
      <Text>
        Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend
        darzustellen, verwenden wir auf dieser Website „Google Web Fonts“ der
        Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA;
        nachfolgend „Google“) zur Darstellung von Schriften.
      </Text>
      <Text>
        Die Datenschutzrichtlinie des Bibliothekbetreibers Google finden Sie
        hier:&nbsp;
        <A href="www.google.com/policies/privacy/">
          google.com/policies/privacy/
        </A>
      </Text>
      <Heading as="h2">Eingebettete Inhalte von anderen Websites</Heading>
      <Text>
        Beiträge auf dieser Website können eingebettete Inhalte beinhalten
        (z.&nbsp;B. Videos, Bilder, Beiträge etc.). Eingebettete Inhalte von
        anderen Websites verhalten sich exakt so, als ob der Besucher die andere
        Website besucht hätte.
      </Text>
      <Text>
        Diese Websites können Daten über Sie sammeln, Cookies benutzen,
        zusätzliche Tracking-Dienste von Dritten einbetten und Ihre Interaktion
        mit diesem eingebetteten Inhalt aufzeichnen, inklusive Ihrer Interaktion
        mit dem eingebetteten Inhalt, falls Sie ein Konto haben und auf dieser
        Website angemeldet sind.
      </Text>
      <Heading as="h2">Analytics</Heading>
      <Text>
        Für die Analyse und Verbesserung dieser Webseite werden Web-Analytics
        aufgezeichnet. Diese Analyse-Daten werden jedoch nur auf unseren Server
        gespeichert und nicht an Cloud-Provider wie Google o.ä. geschickt.
      </Text>
      <Heading as="h2">Wie lange wir Ihre Daten speichern</Heading>
      <Text>
        Wenn Sie einen Kommentar schreiben, wird dieser inklusive Metadaten
        zeitlich unbegrenzt gespeichert. Auf diese Art können wir
        Folgekommentare automatisch erkennen und freigeben, anstelle sie in
        einer Moderations-Warteschlange festzuhalten.
      </Text>
      <Text>
        Für Benutzer, die sich auf unserer Website registrieren, speichern wir
        zusätzlich die persönlichen Informationen, die sie in ihren
        Benutzerprofilen angeben. Alle Benutzer können jederzeit ihre
        persönlichen Informationen einsehen, verändern oder löschen.
        Administratoren der Website können diese Informationen ebenfalls
        einsehen und verändern.
      </Text>
      <Heading as="h2">Welche Rechte Sie an Ihren Daten haben</Heading>
      <Text>
        Wenn Sie ein Konto auf dieser Website besitzen oder Kommentare
        geschrieben haben, können Sie einen Export Ihrer personenbezogenen Daten
        bei uns anfordern, inklusive aller Daten, die Sie uns mitgeteilt haben.
        Darüber hinaus können Sie die Löschung aller personenbezogenen Daten,
        die wir von Ihnen gespeichert haben, anfordern. Dies umfasst nicht die
        Daten, die wir aufgrund administrativer, rechtlicher oder
        sicherheitsrelevanter Notwendigkeiten aufbewahren müssen.
      </Text>
      {/*}
        <Heading as="h2">Wohin wir Ihre Daten senden</Heading>
        <Text>
          Besucher-Kommentare werden von einem automatisierten Dienst zur
          Spam-Erkennung untersucht.
          </Text>*/}
    </Page>
  );
}
