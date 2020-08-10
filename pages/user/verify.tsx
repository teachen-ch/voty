import { csrfToken } from "next-auth/client";

export default function Verify() {
  return (
    <main className="max-800 text-center">
      <h1>voty</h1>
      <h1>Email verschickt</h1>
      Wir haben Dir einen Login-Link an Deine Email-Adresse geschickt.
      <h1>💌</h1>
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
