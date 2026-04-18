import { gql, NetworkStatus, QueryResult } from "@apollo/client";
import {
  ProgressCard,
  ProgressStudent,
  TeamAnonFieldsFragment,
  useProgressQuery,
} from "graphql/types";
import { Fragment, useState } from "react";
import { A } from "./Breadcrumb";
import { getCardTitle } from "./Cards";
import { Err, H3, Loading } from "./Page";
import { Table, TD, TR } from "./Table";
import { Flex, Box } from "components/ui";
import { Pill } from "./Misc";
import Image from "next/image";
import IconReload from "../public/images/icon_reload.svg";

export const PROGRESS = gql`
  query progress($teamId: String!) {
    progress(teamId: $teamId) {
      cards {
        id
        done {
          id
          email
        }
        due {
          id
          email
        }
      }
      students {
        id
        email
        done
        due
      }
    }
  }
`;

export const ShowProgress: React.FC<
  React.PropsWithChildren<{
    team: TeamAnonFieldsFragment;
  }>
> = ({ team }) => {
  const queryProgress = useProgressQuery({
    variables: { teamId: team.id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const progress = queryProgress.data?.progress;

  if (queryProgress.loading) return <Loading />;
  if (!progress) return <Err msg="Noch kein Fortschritt" />;

  const { cards, students } = progress;
  const tStud = students?.length;
  const tCards = team.cards.split(" ").length;

  const sortedStudents = students?.slice();
  sortedStudents?.sort((a, b) => (a?.due?.length || 0) - (b?.due?.length || 0));

  const sortedCards = cards?.slice();
  sortedCards?.sort((a, b) => (a?.due?.length || 0) - (b?.due?.length || 0));

  return (
    <>
      <H3>Fortschritt nach Lerninhalten</H3>
      <Box className="absolute right-8" style={{ marginTop: -32 }}>
        <Reload query={queryProgress} />
      </Box>
      <Table>
        {sortedCards?.map(
          (card) =>
            card && (
              <CardProgress
                key={card.id}
                card={card as ProgressCard}
                total={tStud}
              />
            )
        )}
      </Table>

      <H3 className="mt-16">Fortschritt nach SuS</H3>
      <Box className="absolute right-8" style={{ marginTop: -32 }}>
        <Reload query={queryProgress} />
      </Box>
      <Table>
        {sortedStudents?.map(
          (student) =>
            student && (
              <StudentProgress
                key={student.id}
                student={student}
                total={tCards}
              />
            )
        )}
      </Table>
    </>
  );
};

const CardProgress: React.FC<
  React.PropsWithChildren<{ card: ProgressCard; total?: number }>
> = ({ card, total }) => {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <TR>
        <TD flexy>{getCardTitle(String(card.id))}</TD>
        <TD>
          <A onClick={() => setShow(!show)}>
            {card.done?.length
              ? `${card.done?.length} / ${total} erledigt`
              : "-"}
          </A>
        </TD>
      </TR>
      {show && (
        <Box className="text-sm text-right">
          {card.done?.length === 0 ? (
            "Noch niemand hat diese Aufgabe erledigt"
          ) : (
            <Flex className="flex-wrap">
              {card.done?.map(
                (user) =>
                  user && (
                    <Pill key={user.id} bg="green">
                      <Email student={user} />
                    </Pill>
                  )
              )}
              {card.due?.map(
                (user) =>
                  user && (
                    <Pill key={user.id} bg="danger">
                      <Email student={user} />
                    </Pill>
                  )
              )}
            </Flex>
          )}
        </Box>
      )}
    </Fragment>
  );
};

const Email: React.FC<
  React.PropsWithChildren<{ student: { email?: string | null } }>
> = ({ student }) => (
  <A href={`mailto:${student.email}?subject=voty.ch Aufgaben`}>
    {student.email}
  </A>
);

const StudentProgress: React.FC<
  React.PropsWithChildren<{
    student: ProgressStudent;
    total?: number;
  }>
> = ({ student, total }) => {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <TR>
        <TD flexy>
          <Email student={student} />
        </TD>
        <TD>
          <A onClick={() => setShow(!show)}>
            {student.done?.length} / {total} erledigt
          </A>
        </TD>
      </TR>
      {show && (
        <Box className="text-sm text-right">
          {student.done?.length === 0 ? (
            "Noch keine Aufgabe erledigt"
          ) : (
            <Flex className="flex-wrap">
              {student.done?.map((card, i) => (
                <Pill key={i} bg="green">
                  {getCardTitle(String(card))}
                </Pill>
              ))}
              {student.due?.map((card, i) => (
                <Pill key={i} bg="danger">
                  {getCardTitle(String(card))}
                </Pill>
              ))}
            </Flex>
          )}
        </Box>
      )}
    </Fragment>
  );
};

const Reload: React.FC<
  React.PropsWithChildren<{
    query: Pick<QueryResult, "networkStatus" | "refetch" | "loading">;
  }>
> = ({ query }) => {
  const reloading = query.networkStatus === NetworkStatus.refetch;
  return (
    <A
      onClick={query.loading || reloading ? undefined : () => query.refetch()}
      className={`text-sm ${reloading ? "text-gray" : ""}`}
    >
      Aktualisieren
      <Box className="inline-block ml-2">
        <Image src={IconReload} alt="" />
      </Box>
    </A>
  );
};
