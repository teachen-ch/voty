import { gql } from "@apollo/client";
import { useTeam } from "state/user";
import { Box, Text, Heading, Button } from "rebass";
import {
  DiscussionFieldsFragment,
  usePostDiscussionMutation,
  useGetTeamDiscussionsQuery,
} from "graphql/types";
import { ErrorBox, QForm } from "./Form";
import React, { useState } from "react";

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
  const team = useTeam();
  if (!team) return null;
  return (
    <Box className="discussion" mt={6}>
      {title && <Heading>{title}</Heading>}
      <Discussions card={card} ballotId={ballotId} teamId={team.id} />
      <PostDiscussion card={card} ballotId={ballotId} />
    </Box>
  );
};

const Discussions: React.FC<{
  card?: string;
  ballotId?: string;
  teamId: string;
}> = ({ card, ballotId, teamId }) => {
  const discussionsQuery = useGetTeamDiscussionsQuery({
    variables: { card, ballotId, teamId },
  });
  const discussions = discussionsQuery.data?.getTeamDiscussions;
  return (
    <>
      {discussions?.map(
        (discussion) =>
          discussion && (
            <DiscussionDetail key={discussion.id} discussion={discussion} />
          )
      )}
    </>
  );
};

const DiscussionDetail: React.FC<{ discussion: DiscussionFieldsFragment }> = ({
  discussion,
}) => {
  return (
    <Box className="discussion" mb={3} fontSize={2}>
      <Text>
        <b>{discussion.user.shortname}:</b> {discussion.text}
      </Text>
    </Box>
  );
};

const PostDiscussion: React.FC<{
  card?: string;
  ballotId?: string;
}> = ({ card, ballotId }) => {
  const [success, setSuccess] = useState(false);
  const team = useTeam();
  const [error, setError] = useState("");
  const [doPost] = usePostDiscussionMutation({
    onCompleted() {
      setSuccess(true);
      setError("");
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

  async function onSubmit(values: Record<string, any>) {
    if (!team?.id) return alert("Kein Team");
    const variables = {
      card,
      ballotId,
      teamId: team?.id,
      title: "",
      text: String(values.text),
    };
    await doPost({ variables });
  }

  if (success) {
    return (
      <Text>
        Diskussionsbeitrag abgeschickt!{" "}
        <Button onClick={() => setSuccess(false)}>Neuer Beitrag</Button>
      </Text>
    );
  }

  return (
    <div id="postDiscussion">
      <QForm
        fields={{
          text: { label: "Kommentar", type: "textarea", required: true },
          submit: { type: "submit", label: "Abschicken" },
        }}
        mutation={doPost}
        onSubmit={onSubmit}
      >
        <ErrorBox error={error} />
      </QForm>
    </div>
  );
};
