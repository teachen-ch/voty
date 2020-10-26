import Head from "next/head";
import { Page } from "components/Page";
import { Link as A, Heading, Text } from "rebass";
import { ReactElement } from "react";

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

      <Text fontSize={[2, 2, 2]} textAlign="left">
        <Heading as="h2">
          Was für personenbezogenene Daten wir speichern (ohne Konto)
        </Heading>
        <Text>
          Wenn Sie auf diese Webseite ohne ein voty.ch-Konto zugreifen, werden
          automatisch technische Informationen (z.B. Art des Webbrowsers,
          Betriebssystem, IP-Adresse) erfasst und im Server-Logfile gespeichert.
          Ebenso werden diese Daten für unsere{" "}
          <A href="#analytics">Web-Analytics</A> verwendet. Dies dient der
          Sicherstellung eines problemlosen Verbindungsaufbaus, zur Optimierung
          und Wartung unserer Website. Informationen dieser Art werden lediglich
          statistisch nicht personenbezogen ausgewertet, um unseren
          Internetauftritt und die dahinterstehende Technik zu verbessern.
        </Text>
        <Heading as="h2">
          Was für personenbezogenene Daten wir speichern (mit Konto)
        </Heading>
        <Text>
          Wenn Sie auf unserer Website ein Konto eröffnen, speichern wir die von
          ihnen angegebenen Daten (Name, Email, etc.) auf unseren Servern. Diese
          Daten werden wir nicht an Dritte weitergeben und auf ihren Wunsch
          jederzeit löschen. Wenn Sie mit ihrem Konto auf unserer Website
          abstimmen, dann speichern wir auf unseren Servern, an welcher
          Abstimmung Sie teilgenommen haben. Die eigentliche Stimme wird nicht
          mit ihrem Konto verknüpft, da wir die politischen Meinung anonym
          behalten wollen. Um statistische Auswertungen relevanter zu machen,
          werden jedoch folgende Attribute zu ihrer Stimme gespeichert, sofern
          Sie diese in ihrem Profil gespeichert haben: Alter, Geschlecht,
          Schulhaus, Klasse.
        </Text>
        <Heading as="h2">Publikation der Abstimmungsergebnisse</Heading>
        <Text>
          Wir werden die summierten (aggregierten) Resultate der nationalen
          Abstimmungen auf unserer Plattform veröffentlichen. Dabei können
          Auswertungen nach Kanton, Schultyp, Alter oder Geschlecht gemacht
          werden. Wir stellen dabei aber jederzeit sicher, dass ein Rückschluss
          auf die Meinung einer einzelnen Person oder einer Schulklasse nicht
          möglich sein wird.
        </Text>

        <Heading as="h2">Cookies</Heading>
        <Text>
          Wenn Sie auf unserer Website ohne Konto abstimmen, speichert ihr
          Browser ein anonymes Cookie. Aus diesem Cookie können wir keine
          Rückschlüsse auf ihre Person ziehen und wir speichern dieses auch
          nicht unseren Servern. Wenn Sie sich auf unserer Website anmelden,
          verwenden wir die LocalStorage ihres Browsers, um ihren Anmeldestatus
          zu speichern. Bei jedem Besuch unserer Plattform werden sie deshalb
          automatisch eingeloggt. Sobald sie sich auf unserer Plattform
          abmelden, wird die LocalStorage gelöscht.
        </Text>
        <Heading as="h2">
          Eingebettete Inhalte von anderen Websites (z.B. Videos)
        </Heading>
        <Text>
          Beiträge auf dieser Website können eingebettete Inhalte beinhalten
          (z.B. Videos, Bilder, Beiträge etc.). Eingebettete Inhalte von anderen
          Websites verhalten sich exakt so, als ob der Besucher die andere
          Website besucht hätte.
        </Text>
        <Text>
          Diese Websites (z.B. srf.ch) können Daten über Sie sammeln, Cookies
          benutzen, zusätzliche Tracking-Dienste von Dritten einbetten und ihre
          Interaktion mit diesem eingebetteten Inhalt aufzeichnen, inklusive
          ihrer Interaktion mit dem eingebetteten Inhalt, falls Sie ein Konto
          haben und auf dieser Website angemeldet sind.
        </Text>
        <Heading as="h2" id="analytics">
          Analytics
        </Heading>
        <Text>
          Für die Analyse und Verbesserung dieser Webseite werden Web-Analytics
          aufgezeichnet. Diese Analyse-Daten werden jedoch nur auf unseren
          Server gespeichert und nicht an Cloud-Provider wie Google o.ä.
          geschickt.
        </Text>
        <Heading as="h2">Wie lange wir ihre Daten speichern</Heading>
        <Text>
          Für Benutzer, die sich auf unserer Website registrieren, speichern wir
          zusätzlich die persönlichen Informationen, die sie in ihren
          Benutzerprofilen angeben. Alle Benutzer können jederzeit ihre
          persönlichen Informationen einsehen, verändern oder löschen.
          Administratoren der Website können diese Informationen ebenfalls
          einsehen und verändern.
        </Text>
        <Heading as="h2">Welche Rechte Sie an ihren Daten haben</Heading>
        <Text>
          Wenn Sie ein Konto auf dieser Website besitzen, können Sie einen
          Export ihrer personenbezogenen Daten bei uns anfordern, inklusive
          aller Daten, die Sie uns mitgeteilt haben. Darüber hinaus können Sie
          die Löschung aller personenbezogenen Daten, die wir von Ihnen
          gespeichert haben, anfordern. Dies umfasst nicht die Daten, die wir
          aufgrund administrativer, rechtlicher oder sicherheitsrelevanter
          Notwendigkeiten aufbewahren müssen.
        </Text>
      </Text>
    </Page>
  );
}
