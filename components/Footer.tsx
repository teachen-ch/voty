export function Footer() {
  return (
    <footer>
      <div className="row is-center padding-1">
        <div className="auto">
          <p>
            voty ist ein Projekt des Vereins{" "}
            <a href="https://teachen.ch/verein-teachen" className="underline">
              «Teachen!»
            </a>
            <br />
            mit tatkräftiger Unterstützung des
            <br />
            <a
              href="https://prototypefund.opendata.ch"
              target="_blank"
              className="underline"
            >
              PrototypeFund
            </a>
          </p>
          <a href="https://prototypefund.opendata.ch" target="_blank">
            <img
              src="/images/pf_logo.png"
              alt="Prototypefund Logo"
              style={{ width: "40px" }}
            />
          </a>
          <hr />
          <nav>
            <a href="/api/auth/signin">Anmelden</a>&nbsp;&nbsp;| &nbsp;
            <a href="/impressum">Impressum</a>&nbsp;&nbsp;| &nbsp;
            <a href="/datenschutz">Datenschutz</a>&nbsp;&nbsp;| &nbsp;
            <a href="/kontakt">Kontakt</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
