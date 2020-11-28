import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Box, Text, Card, Button, Flex } from "rebass";
import { useState } from "react";
import { Textarea } from "@rebass/forms";

const MAX_CHARS = 160;

export const Tweety: React.FC<{
  maxChars?: number;
  tags?: string;
  placeholder?: string;
}> = ({ maxChars, tags, placeholder }) => {
  const max = maxChars || MAX_CHARS;
  const [tweet, setTweet] = useState("");
  const [sent, setSent] = useState(false);
  const [chars, setChars] = useState(0);

  function doChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = evt.target.value;
    setTweet(value);
    setChars(value.length);
  }

  function doTweety() {
    setSent(true);
  }

  if (sent) {
    return <TweetyCard tweet={tweet} tags={tags} />;
  }

  return (
    <Card>
      <Textarea
        onChange={doChange}
        rows={5}
        bg="#efefef"
        sx={{ border: "#ddd", outline: "none" }}
        placeholder={placeholder}
      ></Textarea>
      <Flex justifyContent="space-between" mt={2}>
        <Text fontSize={1}>
          {chars > 1 && `Bereits ${chars}/${max} Zeichen`}
          {chars > max && (
            <span style={{ color: "red" }}>
              &nbsp; <b>+{chars - max}</b>
            </span>
          )}
        </Text>
        <Button onClick={doTweety}>Abschicken</Button>
      </Flex>
    </Card>
  );
};

const TweetyCard: React.FC<{ tweet: string; tags?: string }> = ({
  tweet,
  tags,
}) => (
  <Box
    bg="white"
    color="black"
    sx={{
      border: "1px solid lightgray",
      borderRadius: 12,
    }}
    mt={5}
    p={3}
    textAlign="left"
  >
    <TwitterIcon />
    &nbsp;
    {tweet}
    <span style={{ marginLeft: 10, color: "rgb(27, 149, 224)" }}>{tags}</span>
  </Box>
);

const TwitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="24" fill="rgb(29, 161, 242)">
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
);
