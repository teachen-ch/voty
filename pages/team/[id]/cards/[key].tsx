import { Page, Loading, ErrorPage } from "components/Page";
import { Card, getCardMeta } from "components/Cards";
import { useRouter } from "next/router";
import { Text } from "rebass";
import { useUser } from "state/user";
import { A, Breadcrumb } from "components/Breadcrumb";
import { Role, useTeamUserQuery } from "graphql/types";

export default function CardPage(): React.ReactElement {
  const router = useRouter();
  const user = useUser();
  const key = String(router.query.key);
  const id = String(router.query.id);
  const teamQuery = useTeamUserQuery({
    variables: { where: { id } },
    skip: !id,
  });
  const team = teamQuery.data?.team;

  if (!key || teamQuery.loading)
    return (
      <Page>
        <Loading />
      </Page>
    );

  const meta = getCardMeta(key);
  if (!meta) return <ErrorPage>Lerninhalt nicht gefunden: {key}</ErrorPage>;
  if (!team) return <ErrorPage>Klasse nicht gefunden</ErrorPage>;

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
    <Page heading={String(meta.title)}>
      <Text textAlign="left">
        <Breadcrumb>
          <A href="/">Start</A>
          {usercrumb}
          <b>Lerninhalte</b>
        </Breadcrumb>

        <Card id={key} />
      </Text>
    </Page>
  );
}
