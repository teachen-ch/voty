import Head from "next/head";

export default function Impressum() {
  return (
    <div>
      <Head>
        <title>voty - Datenschutz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-800">
        <h1>voty</h1>
        <h2>Impressum</h2>
        <p>
          Voty ist ein Projekt des{" "}
          <a href="https://teachen.ch/verein-teachen/">Vereins «Teachen!»</a>
        </p>
        <p>
          Verein «Teachen!»
          <br />
          Alpenweg 11
          <br />
          3110 Münsingen
        </p>
        <p>Email: voty&#64;teachen.ch</p>
        <p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </p>
      </main>
    </div>
  );
}
