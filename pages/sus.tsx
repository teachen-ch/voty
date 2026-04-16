import { Text } from "rebass";
import { Page } from "components/Page";
import { ReactElement } from "react";

export default function SusPage(): ReactElement {
  return (
    <Page heading="Als Lernender registrieren">
      <Text>
        Hey, schön bist du hier! Wenn du auf voty.ch ein neues Konto eröffnen
        möchtest, brauchst du dazu von deiner Lehrperson einen Einladungslink.
        Der sieht in etwa so aus:
      </Text>
      <pre> &nbsp; https://voty.ch/i/XYZeinlangercode</pre>
      <Text>
        Falls dich eine Lehrperson bereits mit deiner Email-Adresse angemeldet
        hat, dann klicke auf den Link im Bestätigungsemail, das du erhalten
        hast.
      </Text>
      <center>
        <img src="/images/header_m1.svg" width="70%" alt="" />
      </center>
    </Page>
  );
}
