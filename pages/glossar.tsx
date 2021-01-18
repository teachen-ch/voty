import { Glossary, GlossaryReplace } from "components/Glossary";
import { Page } from "components/Page";
import { Info } from "components/Info";
import { A } from "components/Breadcrumb";

export default function GlossaryPage(): React.ReactElement {
  function sendMail() {
    const email = "hc.ytov@rassolg:otliam";
    document.location.href = email.split("").reverse().join("");
  }
  return (
    <Page heading="Begriffe der Demokratie">
      <Info>
        Dieses Glossar ist in einer frühen Phase der Entstehung und hat weder
        Anspruch auf Vollständigkeit noch auf Korrektheit. Bitte schickt
        Ergänzungs- und Präsizierungsvorschläge an ✉️
        <A onClick={sendMail}>glossar@voty.ch</A>
      </Info>
      <GlossaryReplace>
        <Glossary />
      </GlossaryReplace>
    </Page>
  );
}
