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
  useDeleteWorkMutation,
} from "graphql/types";
import { AttachmentFields } from "components/Uploader";
import { Flex, Text, Box, Button, Label, Radio } from "components/ui";
import { useTeam, useUser } from "state/user";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Err, Loading } from "./Page";
import find from "lodash/find";
import omit from "lodash/omit";
import remove from "lodash/remove";
import truncate from "lodash/truncate";
import Image from "next/image";
import IconPlus from "../public/images/icon_plus.svg";
import IconMinus from "../public/images/icon_minus.svg";
import IconTrash from "../public/images/icon_trash.svg";
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

export const DELETE_WORK = gql`
  mutation deleteWork($where: WorkWhereUniqueInput!) {
    deleteWork(where: $where) {
      id
    }
  }
`;

export type WorkItem = React.FC<
  React.PropsWithChildren<{ work: WorkFieldsFragment }>
>;

export const Works: React.FC<
  React.PropsWithChildren<{
    where?: WorkWhereInput;
    card?: string;
    items: WorkItem;
    list?: React.FC<React.PropsWithChildren<{ className?: string }>>;
    trigger?: number;
    className?: string;
    flexDirection?: string;
    mt?: number | string;
  }>
> = ({
  where,
  items,
  list,
  trigger,
  card,
  className,
  flexDirection,
  mt,
  ...props
}) => {
  const team = useTeam();
  const user = useUser();
  const [doDeleteWork] = useDeleteWorkMutation();

  if (!where) {
    where = team
      ? { teamId: { equals: team.id } }
      : { visibility: { equals: Visibility.Public } };
  }
  if (card) where.card = { equals: card };
  const worksQuery = useWorksQuery({
    variables: { where },
  });
  const works = worksQuery.data?.works;
  const Comp = items;
  const ListComp = list || Flex;
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!works) return;
    const id = document.location.hash.substring(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setActive(id);
    }
  }, [works]);

  useEffect(() => {
    if (trigger) {
      void worksQuery.refetch();
    }
  }, [trigger, worksQuery]);

  if (worksQuery.loading) return <Loading />;
  if (!works) return null;

  if (team && card) {
    if (!user) return null;
    if (
      team.id !== user.team?.id &&
      team.teacher?.id !== user.id &&
      user.role !== Role.Admin
    )
      return null;
    const isTeacher = user.role === Role.Teacher;

    const show = showWorks(team, card);
    if (show === ShowWorks.Never && !isTeacher) return null;

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

  async function doDelete(id: string) {
    if (confirm("Diese Arbeit wirklich löschen?")) {
      await doDeleteWork({ variables: { where: { id } } });
      await worksQuery.refetch();
    }
  }

  const mtClass = mt !== undefined ? `mt-${mt}` : "";
  const dirClass = flexDirection === "column" ? "flex-col" : "";

  return (
    <ListComp className={`flex ${mtClass} ${dirClass} ${className || ""}`}>
      {works.length > 0 && (
        <Text className="font-semibold">Arbeiten zum Thema:</Text>
      )}
      {works?.map((work) => {
        const canDelete =
          user?.role === Role.Teacher || find(work.users, { id: user?.id });
        return (
          <Box key={work.id} className="mt-2" id={work.id}>
            <Flex
              className="bg-black/20 p-1 px-3 items-center rounded-card justify-between cursor-pointer"
              style={{ height: 40 }}
              onClick={() => setActive(active === work.id ? "" : work.id)}
            >
              {active === work.id ? (
                <Box className="inline">
                  <Image src={IconMinus} alt="Schliessen" />
                </Box>
              ) : (
                <Box className="inline mr-2">
                  <Image src={IconPlus} alt="Öffnen" />
                </Box>
              )}
              <Text className="cursor-pointer text-sm sm:text-base flex-1">
                <b>{work.users?.map((u) => u.shortname).join(", ")}:</b> «
                {truncate(work.title, { length: 35 }) || "ohne Titel"}»
                <span className="ml-4 text-sm inline-block">
                  ({formatDate(work.updatedAt)})
                </span>
              </Text>
              {canDelete && (
                <Image
                  src={IconTrash}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    void doDelete(work.id);
                  }}
                  className="pointer"
                  alt="Löschen"
                />
              )}
            </Flex>
            <Box>{active === work.id && <Comp work={work} />}</Box>
          </Box>
        );
      })}
    </ListComp>
  );
};

export const WorkCard: React.FC<
  React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>
> = ({ children, className, style }) => (
  <Box
    className={`rounded-card bg-highlight text-sm sm:text-base text-black p-4 my-4 ${
      className || ""
    }`}
    style={style}
  >
    {children}
  </Box>
);

type PostWorkHookType = (args: {
  card: string;
  title?: string;
  text?: string;
  data?: Scalars["Json"]["input"];
  users?: UserWhereUniqueInput[];
  visibility?: Visibility;
  setTrigger?: (n: number) => void;
}) => [() => void, MutationResult<PostWorkMutation>];

export const usePostWork: PostWorkHookType = (args) => {
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
          school: { connect: { id: user?.school?.id || "" } },
          users: { connect: users ? users : [{ id: user.id }] },
          title,
          text,
          card,
          visibility,
          data,
        },
      },
    });
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

export const WorkSubmit: React.FC<
  React.PropsWithChildren<{
    title?: string;
    text?: string;
    data: any;
    visibility?: Visibility;
    setTrigger?: (n: number) => void;
  }>
> = ({ title, data, text, visibility: visibilityDefault, setTrigger }) => {
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
          <Label className="mt-4">Erarbeitet durch:</Label>
          <Authors setUsers={setUsers} />
        </>
      )}
      <Button
        className="mt-4 w-full"
        onClick={doPostWork}
        aria-label="Abschicken"
        disabled={Boolean(!user || !team)}
      >
        Abschicken
      </Button>
      <Err msg={state.error?.message} />
    </Box>
  );
};

export const Visible: React.FC<
  React.PropsWithChildren<{
    visibility?: Visibility;
    setVisibility: (v?: Visibility) => void;
  }>
> = ({ visibility, setVisibility }) => {
  return (
    <Flex className="my-4 gap-4 flex-wrap sm:flex-nowrap">
      <Label>Veröffentlichen: </Label>
      <Label className="items-center flex gap-1">
        <Radio
          name="vis"
          checked={visibility === Visibility.Team}
          onChange={() => setVisibility(Visibility.Team)}
          value={visibility}
          className="fill-white"
        />
        In der Klasse
      </Label>
      <Label className="items-center flex gap-1">
        <Radio
          name="vis"
          checked={visibility === Visibility.School}
          onChange={() => setVisibility(Visibility.School)}
          value={visibility}
          className="fill-white"
        />
        in der Schule
      </Label>
      <Label className="items-center flex gap-1">
        <Radio
          name="vis"
          checked={visibility === Visibility.Public}
          onChange={() => setVisibility(Visibility.Public)}
          value={visibility}
          className="fill-white"
        />
        öffentlich
      </Label>
    </Flex>
  );
};

export const Authors: React.FC<
  React.PropsWithChildren<{
    work?: WorkFieldsFragment;
    setUsers: (u: Array<UserWhereUniqueInput>) => void;
    className?: string;
  }>
> = ({ work, setUsers, className }) => {
  type U = Pick<User, "id" | "shortname">;
  const user = useUser();
  const team = useTeam();
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState<U[]>([]);
  const [authors, setAuthors] = useState<U[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateUsers = useCallback(
    (users: U[]) => {
      setAuthors(users);
      setUsers(
        users.map((user) => {
          return { id: user.id };
        })
      );
    },
    [setUsers]
  );

  useEffect(() => {
    if (work && work.users) {
      updateUsers(work.users);
    } else if (user) {
      updateUsers([user]);
    }
  }, [updateUsers, user, work]);

  if (!user || !team)
    return <Text className="text-sm italic">Nicht eingeloggt</Text>;
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
      updateUsers(authors.slice());
    }
  }

  return (
    <Box className={`flex-1 ${className || ""}`}>
      <Flex
        className="flex-wrap bg-white grow py-1 px-2 rounded-card cursor-text"
        onClick={() => inputRef.current?.focus()}
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
          width={100}
          placeholder="Suche nach Vorname…"
        />
        {matches.length > 0 && (
          <Flex className="mt-2 w-full">
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
