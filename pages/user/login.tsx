import { csrfToken } from "next-auth/client";
import Head from "next/head";
import Page from "../../components/Page";

export default function Login({ csrfToken }: { csrfToken: string }) {
  return (
    <Page>
      <Head>
        <title>voty - Anmeldung</title>
      </Head>
      <h1>Login</h1>
      <p>
        Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden. Wir schicken
        Dir per Email einen Link mit dem Du Dich ohne Passwort anmelden kannst.
      </p>
      <form method="post" action="/api/auth/signin/email" className="row">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div className="col-1 is-vertical-align">
          <label htmlFor="email">Email: </label>
        </div>
        <div className="col-7">
          <input id="email" name="email" />
        </div>
        <div className="col-4">
          <button type="submit" className="button primary">
            Login Link schicken
          </button>
        </div>
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
