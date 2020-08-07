import Head from "next/head";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>voty – Demokratie an die Schule</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          <img src="/images/voty_logo.svg" alt="voty" className="logo" />
        </h1>
        <h2>Demokratie an die Schule!</h2>
        <h4 className="text-center max-800 bold">
          Kurzer, knackiger Introtext: Die Demokratie ist das wohl wichtigste
          Gut der Schweiz, das wird uns bei der aktuellen Weltlage bewusster
          denn je. Aber wie gelingt es uns, die Jugend für die Demokratie zu
          begeistern?
        </h4>
        <br />

        <div className="row">
          <div className="col-12 col-4-md card bg-light text-center">
            <header>
              <h3>Demokratie verstehen</h3>
              <img src="images/voty_module_1.svg" alt="Bundehaus" />
            </header>
            <p>
              Wie funktioniert die Demokratie in der Schweiz und warum ist sie
              so wertvoll? Wir möchten Jugendliche von 12-18 Jahren motivieren,
              sich mit unserem politischen System auseinanderzusetzen.
            </p>
            <a
              href="kontakt/#newsletter"
              role="button"
              className="button primary is-full-width"
            >
              Anmeldung Newsletter
            </a>
          </div>
          <div className="col-12 col-4-md card bg-light text-center">
            <header>
              <h3>Demokratie testen</h3>
              <img src="images/voty_module_2.svg" alt="Abstimmen" />
            </header>
            <p>
              Nur Erwachsene dürfen abstimmen, aber auch Jugendliche haben eine
              Meinung! Wir möchten Test-Abstimmungen zeitgleich zu nationalen
              Urnengängen durchführen und die Resultate diskutieren
            </p>
            <a
              href="kontakt/"
              role="button"
              className="button primary is-full-width"
            >
              Wollen wir auch!
            </a>
          </div>
          <div className="col-12 col-4-md card bg-light text-center">
            <header>
              <h3>Demokratie erleben</h3>
              <img src="images/voty_module_3.svg" alt="Diskutieren" />
            </header>
            <p>
              Wer entscheidet an Eurer Schule? Dürfen Schülerinnen und Schüler
              mitreden und Vorschläge einbringen? Wir möchten gemeinsam testen,
              wie wir Demokratie in Schulhäuser bringen können.
            </p>

            <a
              href="kontakt/"
              role="button"
              className="button primary is-full-width"
            >
              Das interessiert uns!
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
