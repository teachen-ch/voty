import { csrfToken } from "next-auth/client";
import Head from "next/head";
import Page from "components/Page";

export default function Login({ csrfToken }: { csrfToken: string }) {
  return (
    <Page>
      <Head>
        <title>voty - Anmeldung</title>
      </Head>
      <h1>Anmeldung</h1>
      <h2></h2>
      <p>
        Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden, wenn Du
        bereits einen Benutzeraccount bei voty hast.
      </p>
      <form method="post" action="/api/auth/callback/credentials">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div className="row">
          <div className="col-4 is-vertical-align">
            <label htmlFor="email">Email: </label>
          </div>
          <div className="col-8">
            <input id="email" name="email" />
          </div>
        </div>
        <div className="row">
          <div className="col-4 is-vertical-align">
            <label htmlFor="password">Passwort: </label>
          </div>
          <div className="col-8">
            <input id="password" name="password" />
          </div>
        </div>
        <input type="submit" className="button primary" value="Anmelden" />
      </form>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await csrfToken(context),
    },
  };
}
