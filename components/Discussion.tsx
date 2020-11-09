import { gql } from "@apollo/client";
import { SessionUser, useUser } from "state/user";
import { Box, Text, Heading, Button } from "rebass";
import {
  ThreadFieldsFragment,
  usePostThreadMutation,
  useGetTeamThreadsQuery,
} from "graphql/types";
import { ErrorBox, QForm } from "./Form";
import React, { useState } from "react";

const ThreadFields = gql`
  fragment ThreadFields on Thread {
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

const fragments = { ThreadFields };

export const GET_TEAM_THREADS = gql`
  query getTeamThreads($ref: String!, $teamId: String) {
    getTeamThreads(ref: $ref, teamId: $teamId) {
      ...ThreadFields
    }
  }
  ${fragments.ThreadFields}
`;

export const POST_THREAD = gql`
  mutation postThread(
    $ref: String!
    $text: String!
    $title: String!
    $teamId: String!
  ) {
    postThread(ref: $ref, text: $text, title: $title, teamId: $teamId) {
      ...ThreadFields
    }
  }
  ${fragments.ThreadFields}
`;

export const Discussion: React.FC<{ refid: string; teamId?: string }> = ({
  refid,
  teamId,
}) => {
  const user = useUser();
  const threadsQuery = useGetTeamThreadsQuery({
    variables: { ref: refid, teamId },
  });
  const threads = threadsQuery.data?.getTeamThreads;

  return (
    <Box className="discussion">
      <Heading mt={0}>Diskussion</Heading>
      {threads?.map((thread) => (
        <ThreadDetail key={thread.id} thread={thread} />
      ))}
      <PostThread refid={refid} user={user} teamId={teamId} />
    </Box>
  );
};

const ThreadDetail: React.FC<{ thread: ThreadFieldsFragment }> = ({
  thread,
}) => {
  return (
    <Box className="thread" mb={3} fontSize={2}>
      <Text>
        <b>{thread.user.shortname}:</b> {thread.text}
      </Text>
    </Box>
  );
};

const PostThread: React.FC<{
  user: SessionUser;
  refid: string;
  teamId?: string;
}> = (props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [doPost] = usePostThreadMutation({
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
          getTeamThreads(existingThreads: typeof ThreadFields[] = []) {
            const newThread = cache.writeFragment({
              data: result.data?.postThread,
              fragment: fragments.ThreadFields,
              fragmentName: "ThreadFields",
            });
            return [...existingThreads, newThread];
          },
        },
      });
    },
  });

  async function onSubmit(values: Record<string, any>) {
    const variables = {
      ref: props.refid,
      teamId: props.teamId || String(props.user?.team?.id),
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
    <div id="postThread">
      <QForm
        fields={{
          text: { label: "Kommentar", required: true },
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
