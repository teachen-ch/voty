import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Box, Text, Card } from "rebass";
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
  const [chars, setChars] = useState(0);

  function doChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = evt.target.value;
    setTweet(value);
    setChars(value.length);
  }

  return (
    <Card>
      <Textarea
        onChange={doChange}
        rows={5}
        bg="#efefef"
        sx={{ border: "#ddd" }}
        placeholder={placeholder}
      ></Textarea>
      <Text fontSize={1}>
        {chars > 1 && `Bereits ${chars}/${max} Zeichen`}
        {chars > max && (
          <span style={{ color: "red" }}>
            &nbsp; <b>+{chars - max}</b>
          </span>
        )}
      </Text>
      <Box
        sx={{ border: "1px solid lightgray", borderRadius: 12 }}
        my={4}
        p={3}
        textAlign="left"
      >
        {tweet}
        <span style={{ marginLeft: 10, color: "lightblue" }}>{tags}</span>
      </Box>
    </Card>
  );
};
