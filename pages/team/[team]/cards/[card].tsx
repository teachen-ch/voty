import { Loading, ErrorPage, LoggedInPage } from "components/Page";
import { Card, getCardMeta } from "components/Cards";
import { useTeam, useUser } from "state/user";
import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Role } from "graphql/types";
import { Discussion } from "components/Discussion";
import { useQueryParam } from "util/hooks";
import { HideFeature } from "components/HideFeature";
import { FeedbackText } from "components/Feedback";
import { Text } from "rebass";
import {
  allowGroups,
  AllowGroupText,
  showWorks,
  ShowWorkText,
} from "components/Works";

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
      <Breadcrumb>
        {usercrumb}
        <Here>{meta.title}</Here>
      </Breadcrumb>

      <Card id={key} />
      <Text fontSize={1} fontStyle="italic" mt={4} textAlign="center">
        {ShowWorkText[showWorks(team, key)]}
        {". "}
        {AllowGroupText[allowGroups(team, key)]}
      </Text>

      <HideFeature id="discussions">
        {meta.discussion !== false && <Discussion card={key} />}
      </HideFeature>
      <FeedbackText card={key} />
    </LoggedInPage>
  );
}
