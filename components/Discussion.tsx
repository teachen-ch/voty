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
    ref
    createdAt
    updatedAt
    user {
      shortname
    }
  }
`;

const fragments = { DiscussionFields };

export const GET_TEAM_DISCUSSIONS = gql`
  query getTeamDiscussions($ref: String!, $teamId: String) {
    getTeamDiscussions(ref: $ref, teamId: $teamId) {
      ...DiscussionFields
    }
  }
  ${fragments.DiscussionFields}
`;

export const POST_DISCUSSION = gql`
  mutation postDiscussion(
    $ref: String!
    $text: String!
    $title: String!
    $teamId: String!
  ) {
    postDiscussion(ref: $ref, text: $text, title: $title, teamId: $teamId) {
      ...DiscussionFields
    }
  }
  ${fragments.DiscussionFields}
`;

export const Discussion: React.FC<{
  id: string;
  title?: string;
}> = ({ id, title = "Diskussion" }) => {
  return (
    <Box className="discussion">
      {title && <Heading>{title}</Heading>}
      <Discussions id={id} />
      <PostDiscussion id={id} />
    </Box>
  );
};

const Discussions: React.FC<{ id: string }> = ({ id }) => {
  const team = useTeam();
  const discussionsQuery = useGetTeamDiscussionsQuery({
    variables: { ref: id, teamId: team?.id },
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
  id: string;
}> = (props) => {
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
      ref: props.id,
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
