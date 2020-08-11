import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>voty – Demokratie an die Schule</title>
      </Head>

      <main className="start">
        <h1>
          <img src="/images/voty_logo.svg" alt="voty" className="logo" />
          <br />
          Demokratie an die Schule!
        </h1>
        <h2 className="text-center max-800">
          Die Demokratie ist das wohl wichtigste Gut der Schweiz. Aber wie
          gelingt es uns, die Jugend für die Demokratie zu begeistern? Voty ist
          ein Projekt für die Demokratieförderung an Schweizer Schulen in drei
          Modulen.
        </h2>
        <br />

        <div className="row stretch is-center ">
          <div className="col-6 col-4-md module">
            <header>
              <h3 className="nowrap">Demokratie verstehen</h3>
              <img src="images/voty_module_1.svg" alt="Bundehaus" />
            </header>
            <p>
              Wie funktioniert die Demokratie in der Schweiz und warum ist sie
              so wertvoll? Wir möchten Jugendliche von 12-18 Jahren motivieren,
              sich mit unserem politischen System auseinanderzusetzen.
            </p>
            <a
              href="/newsletter"
              role="button"
              className="button primary is-full-width nowrap"
            >
              Anmeldung Newsletter
            </a>
          </div>
          <div className="col-6 col-4-md module">
            <header>
              <h3>Demokratie testen</h3>
              <img src="images/voty_module_2.svg" alt="Abstimmen" />
            </header>
            <p>
              Nur Erwachsene dürfen abstimmen, aber auch Jugendliche haben eine
              Meinung! Wir möchten Test-Abstimmungen zeitgleich zu nationalen
              Urnengängen durchführen und die Resultate diskutieren.
            </p>
            <a
              href="/newsletter"
              role="button"
              className="button primary is-full-width nowrap"
            >
              Wollen wir auch!
            </a>
          </div>
          <div className="col-6 col-4-md module">
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
              href="/kontakt"
              role="button"
              className="button primary is-full-width nowrap"
            >
              Das interessiert uns!
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
