import { Loading, ErrorPage, LoggedInPage } from "components/Page";
import { Card, getCardMeta } from "components/Cards";
import { Text } from "rebass";
import { useTeam, useUser } from "state/user";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Role } from "graphql/types";
import { Discussion } from "components/Discussion";
import { useQueryParam } from "util/hooks";

export default function CardPage(): React.ReactElement {
  const user = useUser();
  const team = useTeam();
  const key = useQueryParam("card");

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
        {" / "}
        <A href={`/team/${team.id}/select`}>Lerninhalte</A>
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
          <Here>{meta.title}</Here>
        </Breadcrumb>

        <Card id={key} />

        {meta.discussion !== false && <Discussion card={key} />}
      </Text>
    </LoggedInPage>
  );
}
