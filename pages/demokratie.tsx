import Head from "next/head";
import Newsletter from "../components/Newsletter";
import Page from "../components/Page";

export default function Kontakt() {
  return (
    <Page>
      <Head>
        <title>voty - Demokratie an die Schule!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Demokratie an die Schule!</h1>
      <h2>27. September – ein spannendes Abstimmungswochenende</h2>
      <p>
        Die Demokratie ist das wohl wichtigste Gut der Schweiz, das wird uns bei
        der aktuellen Weltlage bewusster denn je. Aber wie gelingt es uns, die
        Jugend für die Demokratie zu begeistern? Das Projekt «voty» will sich
        diesem Thema annehmen und das Demokratieverständnis fördern. Unterstützt
        durch den{" "}
        <a href="https://prototypefund.opendata.ch" target="_blank">
          prototypefund.opendata.ch
        </a>{" "}
        und in Zusammenarbeit mit easyvote.ch und SRF werden wir in den nächsten
        Monaten gemeinsam mit Schulen einen Prototypen entwickeln und testen.
      </p>
      <p className="is-center margin-vertical">
        <img src="/images/voty_module_1.svg" alt="Bundeshaus" />
      </p>
      <p>
        Nun stehen am 27. September bereits wichtige Abstimmungen an, welche
        auch für Jugendliche greifbar und relevant sind (Kampfjets,
        Begrenzungsinitiative, Kinderdrittbetreuungskosten, Vaterschaftsurlaub,
        Jagdgesetz). Auch wenn wir erst am Anfang unseres Projektes stehen,
        möchten wir die Chance unbedingt packen und mit einigen Klassen eine
        erste Iteration durchführen. Dazu suchen wir engagierte Lehrerinnen und
        Lehrer der Oberstufe (Sek I + II), welche im September mindestens 8
        Lektionen diesem Thema widmen möchten. «voty» stellt dazu
        Unterrichtsmaterialien und eine Austauschplatform zur Verfügung.
      </p>
      <h2>Klingt spannend? </h2>
      <p>
        Wäre das etwas für sie und ihrer Klasse? Dann tragen Sie sich auf unsere
        Liste ein und wir nehmen gerne mit ihnen Kontakt auf.
      </p>
      <div className="card bg-light" id="newsletter">
        <header>
          <h2>Das interessiert mich!</h2>
        </header>
        <Newsletter />
      </div>
    </Page>
  );
}
