import { gql } from "@apollo/client";
import { useTeam, useUser } from "state/user";
import { Box, Text, Button, Flex } from "rebass";
import {
  DiscussionFieldsFragment,
  usePostDiscussionMutation,
  useGetTeamDiscussionsQuery,
} from "graphql/types";
import React, { useState } from "react";
import { Textarea } from "@rebass/forms";
import { Err } from "./Page";
import { Pill } from "components/Works";
import { H2 } from "components/Page";

const DiscussionFields = gql`
  fragment DiscussionFields on Discussion {
    id
    title
    text
    card
    ballotId
    createdAt
    updatedAt
    user {
      id
      shortname
    }
  }
`;

const fragments = { DiscussionFields };

export const GET_TEAM_DISCUSSIONS = gql`
  query getTeamDiscussions($card: String, $ballotId: String, $teamId: String) {
    getTeamDiscussions(card: $card, ballotId: $ballotId, teamId: $teamId) {
      ...DiscussionFields
    }
  }
  ${fragments.DiscussionFields}
`;

export const POST_DISCUSSION = gql`
  mutation postDiscussion(
    $card: String
    $ballotId: String
    $text: String!
    $title: String!
    $teamId: String!
  ) {
    postDiscussion(
      card: $card
      ballotId: $ballotId
      text: $text
      title: $title
      teamId: $teamId
    ) {
      ...DiscussionFields
    }
  }
  ${fragments.DiscussionFields}
`;

export const Discussion: React.FC<{
  card?: string;
  ballotId?: string;
  title?: string;
}> = ({ card, ballotId, title = "Klassendiskussion" }) => {
  const user = useUser();
  const team = useTeam();

  const discussionsQuery = useGetTeamDiscussionsQuery({
    variables: { card, ballotId, teamId: team?.id },
    skip: !team,
  });
  const discussions = discussionsQuery.data?.getTeamDiscussions;

  if (!team) return null;
  return (
    <Box className="discussion" id="discussion" mt={6}>
      {title && <H2>{title}</H2>}

      <Box my={3}>
        {discussions && discussions.length > 0
          ? discussions.map(
              (discussion) =>
                discussion && (
                  <DiscussionDetail
                    key={discussion.id}
                    discussion={discussion}
                    userId={String(user?.id)}
                  />
                )
            )
          : "Noch keine Diskussionsbeiträge"}
      </Box>
      <PostDiscussion card={card} ballotId={ballotId} />
    </Box>
  );
};

const DiscussionDetail: React.FC<{
  discussion: DiscussionFieldsFragment;
  userId: string;
}> = ({ discussion, userId }) => {
  const isMe = discussion.user.id === userId;
  return (
    <Flex
      className="discussion"
      mb={2}
      pb={2}
      sx={{ borderBottom: "1px solid gray" }}
      fontSize={2}
      alignItems="flex-start"
      flexDirection={isMe ? "row-reverse" : "inherit"}
      textAlign={isMe ? "right" : "left"}
    >
      <Pill sx={{ flexShrink: 0, borderRadius: 20 }} ml={isMe ? 2 : 0}>
        {isMe ? "Ich" : discussion.user.shortname}
      </Pill>
      <Text pt="6px">{discussion.text}</Text>
    </Flex>
  );
};

const PostDiscussion: React.FC<{
  card?: string;
  ballotId?: string;
}> = ({ card, ballotId }) => {
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const team = useTeam();
  const [error, setError] = useState("");
  const [doPost] = usePostDiscussionMutation({
    onCompleted() {
      setSuccess(true);
      setError("");
      setText("");
    },
    onError(error) {
      setError(error.message);
    },
    update: (cache, result) => {
      cache.modify({
        fields: {
          getTeamDiscussions(
            existingDiscussions: typeof DiscussionFields[] = []
          ) {
            const newDiscussion = cache.writeFragment({
              data: result.data?.postDiscussion,
              fragment: fragments.DiscussionFields,
              fragmentName: "DiscussionFields",
            });
            return [...existingDiscussions, newDiscussion];
          },
        },
      });
    },
  });

  async function onSubmit() {
    if (!team?.id) return alert("Kein Team");
    const variables = {
      card,
      ballotId,
      teamId: team?.id,
      title: "",
      text: text,
    };
    await doPost({ variables });
  }

  if (success) {
    return (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt={5}
        flexWrap="wrap"
      >
        Diskussionsbeitrag abgeschickt!
        <Button onClick={() => setSuccess(false)}>Neuer Beitrag</Button>
      </Flex>
    );
  }

  if (!open) {
    return (
      <Button width="100%" onClick={() => setOpen(true)}>
        Neuer Diskussionsbeitrag
      </Button>
    );
  }

  return (
    <Box id="postDiscussion">
      <Textarea
        mt={3}
        value={text}
        bg="#B1BDC3"
        sx={{ border: "white", "::placeholder": { color: "white" } }}
        onChange={(evt) => setText(evt.target.value)}
        fontSize={[1, 1, 2]}
        rows={2}
        placeholder="Mein Kommentar..."
      />
      <Flex width="100%" justifyContent="space-between" mt={2}>
        <Button variant="text" onClick={() => setOpen(false)} mr={3}>
          Abbrechen
        </Button>
        <Button onClick={onSubmit}>Beitrag&nbsp;abschicken</Button>
      </Flex>

      <Err msg={error} />
    </Box>
  );
};
