import Head from "next/head";
import Newsletter from "../components/Newsletter";

export default function Kontakt() {
  return (
    <div>
      <Head>
        <title>voty - Demokratie an die Schule!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-800">
        <h1>voty</h1>
        <h2>Demokratie an die Schule!</h2>
        <p>
          Die Demokratie ist das wohl wichtigste Gut der Schweiz, das wird uns
          bei der aktuellen Weltlage bewusster denn je. Aber wie gelingt es uns,
          die Jugend für die Demokratie zu begeistern? Das Projekt «voty» will
          sich diesem Thema annehmen und das Demokratieverständnis fördern.
          Unterstützt durch den https://prototypefund.opendata.ch und in
          Zusammenarbeit mit easyvote.ch und SRF werden wir in den nächsten
          Monaten gemeinsam mit Schulen einen Prototypen entwickeln und testen.
        </p>
        <h3>27. September – ein spannendes Abstimmungswochenende!</h3>
        <p>
          Nun stehen am 27. September bereits wichtige Abstimmungen an, welche
          auch für Jugendliche greifbar und relevant sind (Kampfjets,
          Begrenzungsinitiative, Kinderdrittbetreuungskosten,
          Vaterschaftsurlaub, Jagdgesetz). Auch wenn wir erst am Anfang unseres
          Projektes stehen, möchten wir die Chance unbedingt packen und mit
          einigen Klassen eine erste Iteration durchführen. Dazu suchen wir
          engagierte Lehrerinnen und Lehrer der Oberstufe (Sek I + II), welche
          im September mindestens 8 Lektionen diesem Thema widmen möchten.
          «voty» stellt dazu Unterrichtsmaterialien und eine Austauschplatform
          zur Verfügung.
        </p>
        <h3>Klingt spannend? </h3>
        <p>
          Tragen sie sich doch gleich unverbindlich auf unsere Liste ein und wir
          halten sie auf dem Laufenden.
        </p>
        <div className="card bg-light" id="newsletter">
          <Newsletter />
        </div>
      </main>
    </div>
  );
}
