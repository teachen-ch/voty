import { gql } from "@apollo/client";
import {
  ProgressCard,
  ProgressStudent,
  TeamAnonFieldsFragment,
  useProgressQuery,
} from "graphql/types";
import { useState } from "react";
import { A } from "./Breadcrumb";
import { getCardTitle } from "./Cards";
import { Err, H3, Loading } from "./Page";
import { Table, TD, TR } from "./Table";
import { Flex, Box } from "rebass";
import { Pill } from "./Misc";

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

export const ShowProgress: React.FC<{
  team: TeamAnonFieldsFragment;
}> = ({ team }) => {
  const queryProgress = useProgressQuery({ variables: { teamId: team.id } });
  const progress = queryProgress.data?.progress;

  if (queryProgress.loading) return <Loading />;
  if (!progress) return <Err msg="Noch kein Fortschritt" />;

  const { cards, students } = progress;
  const tStud = students?.length;
  const tCards = team.cards.split(" ").length;

  // students and cards are readonly as query results
  const sortedStudents = students?.slice();
  sortedStudents?.sort((a, b) => (a?.due?.length || 0) - (b?.due?.length || 0));

  const sortedCards = cards?.slice();
  sortedCards?.sort((a, b) => (a?.due?.length || 0) - (b?.due?.length || 0));

  return (
    <>
      <H3>Fortschritt nach Lerninhalten</H3>
      <Table>
        {sortedCards?.map(
          (card) =>
            card && <CardProgress card={card as ProgressCard} total={tStud} />
        )}
      </Table>
      <H3 mt={5}>Fortschritt nach SuS</H3>
      <Table>
        {sortedStudents?.map(
          (student) =>
            student && <StudentProgress student={student} total={tCards} />
        )}
      </Table>
    </>
  );
};

const CardProgress: React.FC<{ card: ProgressCard; total?: number }> = ({
  card,
  total,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <TR key={card.id}>
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
        <Box fontSize={1} textAlign="right">
          {card.done?.length === 0 ? (
            "Noch niemand hat diese Aufgabe erledigt"
          ) : (
            <Flex flexWrap="wrap">
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
    </>
  );
};

const Email: React.FC<{ student: { email?: string | null } }> = ({
  student,
}) => (
  <A href={`mailto:${student.email}?subject=voty.ch Aufgaben`} variant="link">
    {student.email}
  </A>
);

const StudentProgress: React.FC<{
  student: ProgressStudent;
  total?: number;
}> = ({ student, total }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <TR key={student.id}>
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
        <Box fontSize={1} textAlign="right">
          {student.done?.length === 0 ? (
            "Noch keine Aufgabe erledigt"
          ) : (
            <Flex flexWrap="wrap">
              {student.done?.map((card) => (
                <Pill key={card} bg="green">
                  {getCardTitle(String(card))}
                </Pill>
              ))}
              {student.due?.map((card) => (
                <Pill key={card} bg="danger">
                  {getCardTitle(String(card))}
                </Pill>
              ))}
            </Flex>
          )}
        </Box>
      )}
    </>
  );
};
