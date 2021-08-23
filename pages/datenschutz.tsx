import Head from "next/head";
import { Page } from "components/Page";
import { Heading, Text } from "rebass";
import { ReactElement } from "react";
import { A } from "components/Breadcrumb";
import { Info } from "components/Info";

export default function Datenschutz(): ReactElement {
  return (
    <Page heading="Datenschutz">
      <Head>
        <title>voty.ch - Datenschutz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h2">Einleitung</Heading>
      <Text fontWeight="semi" fontSize={[2, 2, 3]}>
        Datenschutz und Sicherheit ist für uns zentral. Wir betreiben ein
        Angebot für Schülerinnen und Schüler und bieten die Möglichkeit der
        politischen Meinungsäusserung auf unserer Plattform. Deshalb setzen wir
        alles daran, dass die bei uns gespeicherten Daten nach aktuellen
        Standards gesichert sind und wir werden keine persönliche Daten an
        Drittparteien weitergeben oder jemals versuchen, diese Daten zu
        verkaufen. Unser Ziel ist es, die Demokratie an die Schule zu bringen
        und die gesammelte Meinung der Schülerinnen und Schüler zu nationalen
        Abstimmungen sichtbar zu machen.
      </Text>

      <Info type="success">
        Unsere Server werden in einem Rechenzentrum in Glarus 🇨🇭 zu 100% mit
        erneuerbarern Energie betrieben. Wir verwenden keine Services von
        Drittparteien wie Google oder Amazon für Webanalyse, die Speicherung von
        Daten, oder ähnliche Dienstleistungen.
      </Info>

      <Text fontSize={[2, 2, 2]}>
        <Heading as="h2">
          Was für personenbezogenene Daten wir speichern (ohne Konto)
        </Heading>
        <Text>
          Wenn Du auf voty.ch ohne ein Konto zugreifst, werden automatisch
          technische Informationen (z.B. Art des Webbrowsers, Betriebssystem,
          IP-Adresse) erfasst und im Server-Logfile gespeichert. Ebenso werden
          diese Daten für unsere <A href="#analytics">Web-Analytics</A>{" "}
          verwendet. Dies dient der Sicherstellung eines problemlosen
          Verbindungsaufbaus, zur Optimierung und Wartung unserer Website.
          Informationen dieser Art werden lediglich statistisch nicht
          personenbezogen ausgewertet, um unseren Internetauftritt und die
          dahinterstehende Technik zu verbessern.
        </Text>
        <Heading as="h2">
          Was für personenbezogenene Daten wir speichern (mit Konto)
        </Heading>
        <Text>
          Wenn Du auf voty.ch ein Konto eröffnest, speichern wir die von Dir
          angegebenen Daten (Name, Email, etc.) auf unseren Servern. Diese Daten
          werden wir nicht an Dritte weitergeben und auf Deinen Wunsch jederzeit
          löschen. Wenn Du mit Deinem Konto auf unserer Website abstimmst, dann
          speichern wir auf unseren Servern, an welcher Abstimmung Du
          teilgenommen hast. Deine Stimme wird aber nicht mit Deinem Konto
          verknüpft, da wir die politischen Meinung anonym behalten wollen. Um
          statistische Auswertungen relevant zu machen, werden jedoch folgende
          Attribute zu Deiner Stimme gespeichert, sofern Du diese in Deinem
          Profil angibst: Alter, Geschlecht, Schule, Klasse.
        </Text>
        <Heading as="h2">Publikation der Abstimmungsergebnisse</Heading>
        <Text>
          Wir werden die summierten (aggregierten) Resultate der nationalen
          Abstimmungen auf unserer Plattform veröffentlichen. Dabei können
          Auswertungen nach Kanton, Schultyp, Alter oder Geschlecht gemacht
          werden. Wir stellen dabei aber jederzeit sicher, dass ein Rückschluss
          auf die Meinung einer einzelnen Person oder einer Klasse nicht möglich
          sein wird.
        </Text>

        <Heading as="h2">Cookies und Browserspeicher</Heading>
        <Text>
          Wenn Du auf unserer Website ohne Konto abstimmst, speichert Dein
          Browser ein anonymes Cookie. Aus diesem Cookie können wir keine
          Rückschlüsse auf Deine Person ziehen und wir speichern dieses auch
          nicht unseren Servern. Wenn Du Dich auf unserer Website anmeldest,
          verwenden wir den Browserspeicher, um Deinen Anmeldestatus zu
          speichern. Bei jedem Besuch unserer Plattform wirst Du deshalb
          automatisch eingeloggt. Sobald Du Dich auf unserer Plattform
          abmeldest, wird der Browserspeicher gelöscht.
        </Text>
        <Heading as="h2">
          Eingebettete Inhalte von anderen Websites (z.B. Videos)
        </Heading>
        <Text>
          Lerninhalte auf dieser Website können eingebettete Inhalte beinhalten
          (z.B. Videos). Diese eingebetteten Inhalte von anderen Websites
          verhalten sich exakt so, als ob Du als Besucher die andere Website
          besuchen würdest. Und so können diese Websites auch Nutzungsdaten
          aufzeichnen, Cookies speichern oder zusätzliche Tracking-Dienste von
          Dritten einbetten.
        </Text>
        <Heading as="h2" id="analytics">
          Analytics
        </Heading>
        <Text>
          Für die Analyse und Verbesserung von voty.ch werden Web-Analytics
          aufgezeichnet. Diese Analyse-Daten werden jedoch nur auf unseren
          eigenen Server gespeichert und nicht an Cloud-Provider wie Google o.ä.
          geschickt.
        </Text>
        <Heading as="h2">Wie lange werden Deine Daten gespeichert</Heading>
        <Text>
          Für Benutzer, die sich auf voty.ch registrieren, speichern wir
          zusätzlich die persönlichen Informationen, die sie in ihren
          Benutzerprofilen angeben. Alle Benutzer können jederzeit ihre
          persönlichen Informationen einsehen, verändern oder löschen.
          Administratoren der Website können diese Informationen ebenfalls
          einsehen und verändern.
        </Text>
        <Heading as="h2">Welche Rechte Du an Deinen Daten hast</Heading>
        <Text>
          Deine Daten gehören Dir. Wenn Du ein Konto auf unserer Website
          besitzt, kannst Du einen Export Deiner personenbezogenen Daten bei uns
          anfordern, inklusive aller Daten, die Du uns mitgeteilt habst. Darüber
          hinaus kannst Du die Löschung aller personenbezogenen Daten, die wir
          von Dir gespeichert haben, anfordern. Dies umfasst nicht die Daten,
          die wir aufgrund administrativer, rechtlicher oder
          sicherheitsrelevanter Notwendigkeiten aufbewahren müssen.
        </Text>
        <Heading as="h2">Fragen oder Kommentare?</Heading>
        <Text mb={5}>
          Haben diese Datenschutz-Erklärungen noch Fragen offen gelassen oder
          hast Du einen Kommentar dazu? Dann <A href="/kontakt">kontaktiere</A>{" "}
          uns!
        </Text>
      </Text>
    </Page>
  );
}
