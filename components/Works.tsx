import { gql, MutationResult } from "@apollo/client";
import {
  useWorksQuery,
  WorkWhereInput,
  UserWhereUniqueInput,
  WorkFieldsFragment,
  User,
  usePostWorkMutation,
  PostWorkMutation,
  Scalars,
  Visibility,
  Role,
} from "graphql/types";
import { AttachmentFields } from "components/Uploader";
import { Flex, Text, FlexProps, Box, BoxProps, Button } from "rebass";
import { useTeam, useUser } from "state/user";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Err, Loading } from "./Page";
import { find, omit, remove, truncate } from "lodash";
import IconPlus from "../public/images/icon_plus.svg";
import IconMinus from "../public/images/icon_minus.svg";
import { Label, Radio } from "@rebass/forms";
import { formatDate } from "util/date";
import { Pill } from "./Misc";
import { CardContext } from "./Cards";
import { AllowGroups, allowGroups, showWorks, ShowWorks } from "./Prefs";

export const WorkFields = gql`
  fragment WorkFields on Work {
    id
    card
    title
    text
    data
    updatedAt
    users {
      id
      name
      shortname
    }
    attachments {
      ...AttachmentFields
    }
  }
  ${AttachmentFields}
`;

export const WORKS = gql`
  query works($where: WorkWhereInput) {
    works(where: $where) {
      ...WorkFields
    }
  }
  ${WorkFields}
`;

export type WorkItem = React.FC<{ work: WorkFieldsFragment }>;

// TODO: Rethink, whether we want to keep the where param
export const Works: React.FC<
  FlexProps & {
    where?: WorkWhereInput;
    card?: string;
    items: WorkItem;
    list?: React.FC;
    trigger?: number;
  }
> = ({ where, items, list, trigger, card, ...props }) => {
  const team = useTeam();
  const user = useUser();
  if (!where) {
    where = team
      ? { teamId: { equals: team.id } }
      : { visibility: { equals: Visibility.Public } };
  }
  if (card) where.card = { equals: card };
  const worksQuery = useWorksQuery({
    variables: { where },
    onCompleted() {
      // scroll to, and open work if page is called with hash #id
      const id = document.location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setActive(id);
      }
    },
  });
  const works = worksQuery.data?.works;
  const Comp = items;
  const ListComp = list || Flex;
  const [active, setActive] = useState("");

  useEffect(() => {
    if (trigger) {
      void worksQuery.refetch();
    }
  }, [trigger]);

  if (worksQuery.loading) return <Loading />;
  if (!works) return null;

  // check permissions and teacher preferences for showWorks
  if (team && card) {
    if (!user) return null;
    // Not part of class or teacher?
    if (team.id !== user.team?.id && team.teacher?.id !== user.id) return null;
    const isTeacher = user.role === Role.Teacher;

    // pref "Never": never show works to class
    const show = showWorks(team, card);
    if (show === ShowWorks.Never && !isTeacher) return null;

    // pref "After": show only after submitted own work
    let submitted = false;
    works.forEach((work) => {
      const authorIds = work.users.map((user) => user.id);
      if (authorIds.indexOf(user?.id) >= 0) {
        submitted = true;
      }
    });
    if (show === ShowWorks.After && !submitted && !isTeacher) {
      return null;
    }
  }

  const flexProps = omit(props, "children", "ref");
  return (
    <ListComp flexDirection="column" {...flexProps}>
      {works.length > 0 && <Text fontWeight="bold">Arbeiten zum Thema:</Text>}
      {works?.map((work) => {
        return (
          <Box key={work.id} mt={2} id={work.id}>
            <Flex
              bg="darkgray"
              p={1}
              height="40px"
              pl={"12px"}
              alignItems="center"
              sx={{ borderRadius: "5px" }}
              onClick={() => setActive(active === work.id ? "" : work.id)}
            >
              {active === work.id ? (
                <IconMinus style={{ marginRight: "10px" }} alt="Schliessen" />
              ) : (
                <IconPlus style={{ marginRight: "10px" }} alt="Öffnen" />
              )}
              <Text sx={{ cursor: "pointer" }} fontSize={[1, 1, 2]}>
                <b>{work.users?.map((u) => u.shortname).join(", ")}:</b> «
                {truncate(work.title, { length: 35 }) || "ohne Titel"}»
                <Text ml={3} variant="inline" fontSize={1}>
                  ({formatDate(work.updatedAt)})
                </Text>
              </Text>
            </Flex>
            <Box pl={0}>{active === work.id && <Comp work={work} />}</Box>
          </Box>
        );
      })}
    </ListComp>
  );
};

export const WorkCard: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    sx={{ borderRadius: 5 }}
    bg="lightgray"
    fontSize={[1, 1, 2]}
    color="#000"
    p={3}
    my={3}
    {...props}
  >
    {children}
  </Box>
);

type PostWorkHookType = (args: {
  card: string;
  title?: string;
  text?: string;
  data?: Scalars["Json"];
  users?: UserWhereUniqueInput[];
  visibility?: Visibility;
  setTrigger?: (n: number) => void;
}) => [() => void, MutationResult<PostWorkMutation>];

export const usePostWork: PostWorkHookType = (args) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { card, title, text, data, users, visibility, setTrigger } = args;
  const user = useUser();
  const team = useTeam();
  const [doPostWork, state] = usePostWorkMutation();

  async function doPost() {
    if (!team || !user)
      return alert("Lerninhalte können nur in einer Klasse bearbeitet werden.");
    const result = await doPostWork({
      variables: {
        data: {
          team: { connect: { id: team.id } },
          school: { connect: { id: user?.school?.id } },
          users: { connect: users ? users : [{ id: user.id }] },
          title,
          text,
          card,
          visibility,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data,
        },
      },
    });
    // this can be used to refetch <Works trigger={trigger}/>
    if (setTrigger) setTrigger(1);
    return result;
  }

  return [doPost, state];
};

export const POST_WORK = gql`
  mutation postWork($data: WorkCreateInput!) {
    postWork(data: $data) {
      ...WorkFields
    }
  }
  ${WorkFields}
`;

export const WorkSubmit: React.FC<{
  title?: string;
  text?: string;
  data: any;
  visibility?: Visibility;
  setTrigger?: (n: number) => void;
}> = ({ title, data, text, visibility: visibilityDefault, setTrigger }) => {
  const { card, title: cardTitle } = useContext(CardContext);
  const user = useUser();
  const team = useTeam();
  if (!title) title = cardTitle;
  const [users, setUsers] = useState<Array<UserWhereUniqueInput>>();
  const [visibility, setVisibility] = useState<Visibility | undefined>(
    visibilityDefault
  );
  const [doPostWork, state] = usePostWork({
    card: "tweety",
    title,
    text,
    users,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data,
    visibility,
    setTrigger,
  });

  return (
    <Box>
      {visibility && (
        <Visible setVisibility={setVisibility} visibility={visibility} />
      )}
      {team && allowGroups(team, card) === AllowGroups.Yes && (
        <>
          <Label mt={3}>Erarbeitet durch:</Label>
          <Authors setUsers={setUsers} />
        </>
      )}
      <Button
        mt={3}
        width="100%"
        onClick={doPostWork}
        label="Abschicken"
        disabled={Boolean(!user || !team)}
      >
        Abschicken
      </Button>
      <Err msg={state.error?.message} />
    </Box>
  );
};

export const Visible: React.FC<{
  visibility?: Visibility;
  setVisibility: (v?: Visibility) => void;
}> = ({ visibility, setVisibility }) => {
  return (
    <Flex my={3} flexWrap={["wrap", "wrap", "nowrap"]}>
      <Label>Veröffentlichen: </Label>
      <Label alignItems="center">
        <Radio
          name="vis"
          checked={visibility === Visibility.Team}
          onChange={() => setVisibility(Visibility.Team)}
          value={visibility}
          sx={{ fill: "white" }}
        />
        In der Klasse
      </Label>
      <Label alignItems="center">
        <Radio
          name="vis"
          checked={visibility === Visibility.School}
          onChange={() => setVisibility(Visibility.School)}
          value={visibility}
          sx={{ fill: "white" }}
        />
        in der Schule
      </Label>
      <Label alignItems="center">
        <Radio
          name="vis"
          checked={visibility === Visibility.Public}
          onChange={() => setVisibility(Visibility.Public)}
          value={visibility}
          sx={{ fill: "white" }}
        />
        öffentlich
      </Label>
    </Flex>
  );
};

export const Authors: React.FC<
  BoxProps & {
    work?: WorkFieldsFragment;
    setUsers: (u: Array<UserWhereUniqueInput>) => void;
  }
> = ({ work, setUsers, ...props }) => {
  type U = Pick<User, "id" | "shortname">;
  const user = useUser();
  const team = useTeam();
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState<U[]>([]);
  const [authors, setAuthors] = useState<U[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (work && work.users) {
      updateUsers(work.users);
    } else if (user) {
      updateUsers([user]);
    }
  }, [user]);

  if (!user || !team)
    return (
      <Text fontSize={1} fontStyle="italic">
        Nicht eingeloggt
      </Text>
    );
  const teamUsers = team?.members;

  function doSearch(evt: ChangeEvent<HTMLInputElement>) {
    const str = evt.target.value;
    setSearch(str);
    if (str.length < 1) {
      setMatches([]);
      return;
    }
    const matches = teamUsers?.filter((u) =>
      u.shortname
        ? u.shortname.toLowerCase().indexOf(str.toLowerCase()) >= 0
        : false
    );
    if (matches?.length === 1) {
      addAuthor(matches[0]);
    } else {
      setMatches(matches || []);
    }
  }

  function onKey(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.key === "Backspace" && search.length === 0)
      if (authors.length > 1) {
        authors.pop();
        updateUsers(authors.slice());
      }
  }

  function updateUsers(users: U[]) {
    setAuthors(users);
    setUsers(
      users.map((user) => {
        return { id: user.id };
      })
    );
  }

  function addAuthor(author: U): boolean {
    if (find(authors, (a) => a.id === author.id)) return false;
    authors.push(author);
    updateUsers(authors.slice());
    setSearch("");
    setMatches([]);
    return true;
  }

  function removeAuthor(author: U) {
    if (author.id === user?.id)
      return alert("Du kannst dich selber nicht entfernen");
    if (find(authors, (a) => a.id === author.id)) {
      remove(authors, author);
      setAuthors(authors.slice());
      setUsers(authors.slice());
    }
  }

  return (
    <Box {...props} flex={1}>
      <Flex
        flexWrap="wrap"
        bg="#fff"
        flexGrow={1}
        py={"2px"}
        px={2}
        onClick={() => inputRef.current?.focus()}
        sx={{ borderRadius: "5px" }}
      >
        {authors.map((author) => (
          <Pill
            key={author.id}
            deleteLink={author.id !== user?.id && (() => removeAuthor(author))}
          >
            {author.shortname}
          </Pill>
        ))}
        <input
          ref={inputRef}
          onKeyDown={onKey}
          value={search}
          onChange={doSearch}
          style={{
            border: "none",
            outline: "none",
            fontSize: 22,
          }}
          width="100px"
          placeholder="Suche nach Vorname…"
        />
        {matches.length > 0 && (
          <Flex mt={2} width="100%">
            {matches.map((author) => (
              <Pill key={author.id} bg="gray" onClick={() => addAuthor(author)}>
                {author.shortname}
              </Pill>
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
