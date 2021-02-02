import { Loading, ErrorPage, AppPage, ShowFor } from "components/Page";
import { Card, getCardMeta } from "components/Cards";
import { useTeamAnon, useUser } from "state/user";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Role } from "graphql/types";
import { Discussion } from "components/Discussion";
import { useQueryParam } from "util/hooks";
import { FeedbackText } from "components/Feedback";
import { Text } from "rebass";
import {
  EditTeamPrefs,
  allowGroups,
  AllowGroupText,
  showWorks,
  ShowWorkText,
} from "components/Prefs";
import { TeamAnonLogin } from "..";

export default function CardPage(): React.ReactElement {
  const user = useUser();
  const team = useTeamAnon();
  const key = useQueryParam("card");

  if (!key || !team)
    return (
      <AppPage>
        <Loading />
      </AppPage>
    );

  const meta = getCardMeta(key);
  if (!meta) return <ErrorPage>Lerninhalt nicht gefunden: {key}</ErrorPage>;
  if (!team) return <AppPage>Klasse nicht gefunden</AppPage>;

  let usercrumb = <></>;
  if (user?.role === Role.Teacher) {
    usercrumb = (
      <>
        <A href="/teacher/">Meine Klassen</A> {" / "}
        <A href={`/team/${team.id}`}>{team.name}</A>
        {" / "}
        <A href={`/team/${team.id}/select`}>Lerninhalte</A>
      </>
    );
  } else if (user?.role === Role.Student) {
    usercrumb = (
      <>
        <A href={`/team/${team.id}`}>Meine Klasse</A>
      </>
    );
  } else {
    usercrumb = (
      <>
        <A href={`/team/${team.id}`}>Klasse «{team.name}»</A>
      </>
    );
  }

  return (
    <AppPage heading={String(meta.title)}>
      <Breadcrumb>
        {usercrumb}
        <Here>{meta.title}</Here>
      </Breadcrumb>

      <Card id={key} />
      <Text
        fontSize={1}
        fontStyle="italic"
        mt={4}
        textAlign="center"
        width="100%"
      >
        {ShowWorkText[showWorks(team, key)]}
        {". "}
        {AllowGroupText[allowGroups(team, key)]}
        {". "}
        <ShowFor role="Teacher">
          <EditTeamPrefs team={team} card={key} />
        </ShowFor>
      </Text>

      {user && meta.discussion !== false && <Discussion card={key} />}
      {user && <FeedbackText card={key} />}
      {!user && <TeamAnonLogin />}
    </AppPage>
  );
}
