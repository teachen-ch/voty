import { gql } from "@apollo/client";
import { useTeam, useUser } from "state/user";
import { Box, Text, Button, Flex, Textarea } from "components/ui";
import {
  DiscussionFieldsFragment,
  usePostDiscussionMutation,
  useGetTeamDiscussionsQuery,
} from "graphql/types";
import React, { useState } from "react";
import { Err } from "./Page";
import { Pill } from "components/Misc";
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

export const Discussion: React.FC<
  React.PropsWithChildren<{
    card?: string;
    ballotId?: string;
    title?: string;
  }>
> = ({ card, ballotId, title = "Klassendiskussion" }) => {
  const user = useUser();
  const team = useTeam();

  const discussionsQuery = useGetTeamDiscussionsQuery({
    variables: { card, ballotId, teamId: team?.id },
    skip: !team,
  });
  const discussions = discussionsQuery.data?.getTeamDiscussions;

  if (!team) return null;
  return (
    <Box className="discussion mt-32" id="discussion">
      {title && <H2>{title}</H2>}

      <Box className="my-4">
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

const DiscussionDetail: React.FC<
  React.PropsWithChildren<{
    discussion: DiscussionFieldsFragment;
    userId: string;
  }>
> = ({ discussion, userId }) => {
  const isMe = discussion.user.id === userId;
  return (
    <Flex
      className={`discussion mb-2 pb-2 border-b border-trColor text-base items-start ${
        isMe ? "flex-row-reverse text-right" : "flex-row text-left"
      }`}
    >
      <Pill className={`shrink-0 rounded-[20px] ${isMe ? "ml-2" : ""}`}>
        {isMe ? "Ich" : discussion.user.shortname}
      </Pill>
      <Text className="pt-[6px]">{discussion.text}</Text>
    </Flex>
  );
};

const PostDiscussion: React.FC<
  React.PropsWithChildren<{
    card?: string;
    ballotId?: string;
  }>
> = ({ card, ballotId }) => {
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
          getTeamDiscussions(existingDiscussions: any = []) {
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
    if (!text) return;
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
      <Flex className="justify-between items-center mt-16 flex-wrap">
        Diskussionsbeitrag abgeschickt!
        <Button onClick={() => setSuccess(false)}>Neuer Beitrag</Button>
      </Flex>
    );
  }

  if (!open) {
    return (
      <Button className="w-full" onClick={() => setOpen(true)}>
        Neuer Diskussionsbeitrag
      </Button>
    );
  }

  return (
    <Box id="postDiscussion">
      <Textarea
        className="mt-4 bg-textarea border-white placeholder:text-white text-sm sm:text-base"
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        rows={2}
        placeholder="Mein Kommentar..."
      />
      <Flex className="w-full justify-between mt-2">
        <Button variant="text" onClick={() => setOpen(false)} className="mr-4">
          Abbrechen
        </Button>
        <Button onClick={onSubmit}>Beitrag&nbsp;abschicken</Button>
      </Flex>

      <Err msg={error} />
    </Box>
  );
};
