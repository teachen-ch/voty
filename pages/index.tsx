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
        <h1>voty</h1>
        <h2>Demokratie an die Schule!</h2>

        <div className="row">
          <div className="col-12 col-4-md card bg-light">
            <header>
              <h3>Demokratie verstehen</h3>
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
          <div className="col-12 col-4-md  card bg-light">
            <header>
              <h3>Demokratie testen</h3>
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
          <div className="col-12 col-4-md card bg-light">
            <header>
              <h3>Demokratie erleben</h3>
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
