import {
  Box,
  Text,
  Button,
  Link,
  Flex,
  Input,
  Label,
  Textarea,
} from "components/ui";
import { useState } from "react";
import { UserWhereUniqueInput, Visibility } from "graphql/types";
import {
  Authors,
  Visible,
  usePostWork,
  WorkItem,
  Works,
  WorkCard,
} from "./Works";
import { Err } from "./Page";
import { Info } from "./Info";

const MAX_CHARS = 140;

export const Tweety: React.FC<
  React.PropsWithChildren<{
    maxChars?: number;
    placeholder?: string;
  }>
> = ({
  maxChars = MAX_CHARS,
  placeholder = "Gib einen kurzen Text ein...",
}) => {
  const [tweet, setTweet] = useState("");
  const [title, setTitle] = useState("");
  const [chars, setChars] = useState(0);
  const [users, setUsers] = useState<Array<UserWhereUniqueInput>>();
  const [trigger, setTrigger] = useState(0);
  const [visibility, setVisibility] = useState<Visibility | undefined>(
    Visibility.Public
  );
  const [doPostWork, state] = usePostWork({
    card: "tweety",
    title,
    text: tweet,
    users,
    visibility,
    setTrigger,
  });

  function doChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = evt.target.value;
    setTweet(value);
    setChars(value.length);
  }
  const success = state.called && !state.error;
  return (
    <Box className="mt-8">
      {success ? (
        <Info>Erfolgreich gespeichert</Info>
      ) : (
        <>
          <Label className="mt-8 font-semibold">Abstimmung / Thema</Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Gib einen Titel ein"
          />
          <Box className="bg-white text-black mt-2">
            <Textarea onChange={doChange} rows={3} placeholder={placeholder} />
            <CharCounter chars={chars} max={maxChars} tweet={tweet} />
          </Box>
          <Visible setVisibility={setVisibility} visibility={visibility} />
          <Label className="mb-2 mt-8">Erarbeitet durch:</Label>
          <Flex>
            <Authors setUsers={setUsers} />
            <Button
              className="ml-4 grow-0"
              onClick={doPostWork}
              disabled={chars < 20 || chars > maxChars}
            >
              Tweet senden
            </Button>
          </Flex>
          <Err msg={state.error?.message} />
        </>
      )}

      <Works
        card="tweety"
        className="mt-32"
        items={TweetyItem}
        trigger={trigger}
      />
    </Box>
  );
};

const CharCounter: React.FC<
  React.PropsWithChildren<{ chars: number; max: number; tweet: string }>
> = ({ chars, max, tweet }) => {
  const over = chars > max;
  let text = "";
  const noHash = tweet.search(/[^\w]#\w\w+/) < 0;

  if (over) {
    text = `Bereits ${chars}/${max} (+${chars - max}) Zeichen. `;
  } else {
    text = chars > 0 ? `Bereits ${chars}/${max} Zeichen. ` : " ";
  }

  return (
    <Box className="pl-4 pb-2 mt-0 text-sm">
      <span
        className={`inline-block ${
          over ? "text-danger font-semibold" : "text-black"
        }`}
      >
        {text}
      </span>
      {noHash && chars > 50 && chars < max && (
        <span className="inline-block">
          &nbsp;Fehlt noch ein{" "}
          <Link
            href="https://de.wikipedia.org/wiki/Hashtag"
            target="_blank"
            className="underline"
          >
            #hashtag
          </Link>
          ?
        </span>
      )}
    </Box>
  );
};

const TweetyCard: React.FC<
  React.PropsWithChildren<{ tweet: string; tags?: string }>
> = ({ tweet, tags }) => (
  <Box className="bg-white text-black border border-[lightgray] rounded-[12px] p-4">
    <TwitterIcon />
    &nbsp;
    {tweet}
    <span style={{ marginLeft: 10, color: "rgb(27, 149, 224)" }}>{tags}</span>
  </Box>
);

const TwitterIcon: React.FC<React.PropsWithChildren<unknown>> = () => (
  <svg viewBox="0 0 24 24" width="24" fill="rgb(29, 161, 242)">
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
);

const TweetyItem: WorkItem = ({ work }) => {
  return (
    <WorkCard>
      <Text className="mb-4 text-sm">Abstimmung / Thema: {work.title}</Text>
      <TweetyCard tweet={work.text} />
    </WorkCard>
  );
};
