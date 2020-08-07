import { csrfToken } from "next-auth/client";

export default function Login({ csrfToken }: { csrfToken: String }) {
  return (
    <main className="max-800">
      <h1>voty</h1>
      <h2>Login</h2>
      <p>
        Hier kannst Du dich mit Deiner Schul-Emailadresse anmelden. Wir schicken
        per Email einen Link mit dem Du dich ohne Passwort anmelden kannst.
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
          <input type="submit" value="Login Link schicken" />
        </div>
      </form>
    </main>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await csrfToken(context),
    },
  };
}
