import { Loading, ErrorPage, LoggedInPage } from "components/Page";
import { Card, getCardMeta } from "components/Cards";
import { useRouter } from "next/router";
import { Text } from "rebass";
import { useTeam, useUser } from "state/user";
import { A, Breadcrumb } from "components/Breadcrumb";
import { Role } from "graphql/types";
import { Discussion } from "components/Discussion";

export default function CardPage(): React.ReactElement {
  const router = useRouter();
  const user = useUser();
  const team = useTeam();
  const key = String(router.query.card);

  if (!key || !team)
    return (
      <LoggedInPage>
        <Loading />
      </LoggedInPage>
    );

  const meta = getCardMeta(key);
  if (!meta) return <ErrorPage>Lerninhalt nicht gefunden: {key}</ErrorPage>;
  if (!team) return <LoggedInPage>Klasse nicht gefunden</LoggedInPage>;

  let usercrumb = <></>;
  if (user?.role === Role.Teacher) {
    usercrumb = (
      <>
        <A href="/teacher/">Meine Klassen</A> {" / "}
        <A href={`/team/${team.id}/admin`}>{team.name}</A>
      </>
    );
  } else if (user?.role === Role.Student) {
    usercrumb = (
      <>
        <A href={`/student/`}>Meine Klasse</A>
      </>
    );
  }

  return (
    <LoggedInPage heading={String(meta.title)}>
      <Text textAlign="left">
        <Breadcrumb>
          <A href="/">Start</A>
          {usercrumb}
          <b>Lerninhalte</b>
        </Breadcrumb>

        <Card id={key} />

        {meta.discussion !== false && <Discussion card={key} />}
      </Text>
    </LoggedInPage>
  );
}
