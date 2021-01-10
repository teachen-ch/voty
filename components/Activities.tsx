import { gql } from "@apollo/client";
import { ActivityType } from "@prisma/client";
import {
  ActivitiesQuery as AQType,
  ActivityWhereInput,
  SortOrder,
  useActivitiesQuery,
} from "graphql/types";
import { formatDate, formatTime, isToday } from "util/date";
import { A } from "./Breadcrumb";
import { getCardMeta } from "./Cards";
import { Err, Loading } from "./Page";
import { Table, TD, TR } from "./Table";

export const ACTIVITIES = gql`
  query activities(
    $where: ActivityWhereInput
    $orderBy: [ActivityOrderByInput!]
    $first: Int
  ) {
    activities(where: $where, orderBy: $orderBy, first: $first) {
      user {
        shortname
      }
      type
      card
      summary
      ballotId
      workId
      time
    }
  }
`;

export const Activities: React.FC<{
  card?: string;
  userId?: string;
  teamId?: string;
  schoolId?: string;
  ballotId?: string;
  before?: string; // Scalars["DateTime"]
}> = ({ card, teamId, schoolId, ballotId, userId, before }) => (
  <ActivitiesQuery
    where={{
      card: card ? { equals: card } : undefined,
      ballot: ballotId ? { id: { equals: ballotId } } : undefined,
      userId: userId ? { equals: userId } : undefined,
      teamId: teamId ? { equals: teamId } : undefined,
      schoolId: teamId ? { equals: schoolId } : undefined,
    }}
    before={before}
    teamId={teamId}
  />
);

export const ActivitiesQuery: React.FC<{
  where: ActivityWhereInput;
  first?: number;
  teamId?: string;
  before?: string; // Scalars["DateTime"]
}> = ({ where, first = 50, before, teamId }) => {
  if (before) {
    where.time = { lt: before };
  }
  const activitiesQuery = useActivitiesQuery({
    variables: { where, orderBy: [{ time: SortOrder.Desc }], first },
    fetchPolicy: "cache-and-network",
    // pollInterval: 10000,
  });
  const activities = activitiesQuery.data?.activities;
  if (activitiesQuery.loading) return <Loading />;
  if (activitiesQuery.error) return <Err msg={activitiesQuery.error.message} />;

  return (
    <Table
      fontSize={[1, 1, 2]}
      maxHeight={145}
      overflow="scroll"
      overflowX="hidden"
    >
      {activities?.map((act) => {
        const link = getActivityLink(act, teamId);
        const text = getActivityText(act);
        return (
          <TR key={String(act.time)}>
            <TD width="90px">
              {isToday(act.time) ? formatTime(act.time) : formatDate(act.time)}
            </TD>
            <TD flexy>
              {link ? (
                <A href={link}>
                  {act.user.shortname} {text}
                </A>
              ) : (
                `${act.user.shortname} ${text}`
              )}
              {act.summary ? `: ${act.summary}` : ""}
            </TD>
          </TR>
        );
      })}
      {activities?.length == 0 ? (
        <TR>
          <TD>Noch keine Aktivitäten in der Klasse</TD>
        </TR>
      ) : null}
    </Table>
  );
};

export function getActivityText(
  act: ArrayElement<AQType["activities"]>
): string {
  switch (act.type) {
    case ActivityType.UserInvite:
      return "hat Schüler:innen eingeladen";
    case ActivityType.UserAccept:
      return "ist der Klasse beigetreten";
    case ActivityType.Attachment:
      return "hat hochgeladen";
    case ActivityType.Discussion:
      return "hat diskutiert";
    case ActivityType.Test:
      return "hat Test durchgeführt";
    case ActivityType.Vote:
      return "hat abgestimmt";
    case ActivityType.Work: {
      const meta = getCardMeta(String(act.card));
      return `in «${meta?.title}»`;
    }
    default:
      return "(unbekannte Aktion)";
  }
}

export function getActivityLink(
  act: ArrayElement<AQType["activities"]>,
  teamId?: string
): string | undefined {
  const teamLink = teamId ? `/team/${teamId}/` : "/";
  const cardLink = act.card ? `${teamLink}cards/${act.card}` : undefined;
  const workLink = act.workId ? `${cardLink}#${act.workId}` : undefined;
  const ballotLink = `${teamLink}ballots/${act.ballotId}`;

  switch (act.type) {
    case ActivityType.UserInvite:
      return undefined;
    case ActivityType.UserAccept:
      return undefined;
    case ActivityType.Attachment:
      return undefined;
    case ActivityType.Discussion:
      return act.card ? `${cardLink}#discussion` : `${ballotLink}#discussion`;
    case ActivityType.Test:
      return cardLink;
    case ActivityType.Vote:
      return ballotLink;
    case ActivityType.Work:
      return workLink;
    default:
      return undefined;
  }
}
