import { gql } from "@apollo/client";
import { useTeam } from "state/user";
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

export const Discussion: React.FC<{
  id: string;
  title?: string;
}> = ({ id, title = "Diskussion" }) => {
  return (
    <Box className="discussion">
      {title && <Heading>{title}</Heading>}
      <Threads id={id} />
      <PostThread id={id} />
    </Box>
  );
};

const Threads: React.FC<{ id: string }> = ({ id }) => {
  const team = useTeam();
  const threadsQuery = useGetTeamThreadsQuery({
    variables: { ref: id, teamId: team?.id },
  });
  const threads = threadsQuery.data?.getTeamThreads;
  return (
    <>
      {threads?.map(
        (thread) => thread && <ThreadDetail key={thread.id} thread={thread} />
      )}
    </>
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
  id: string;
}> = (props) => {
  const [success, setSuccess] = useState(false);
  const team = useTeam();
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
    <div id="postThread">
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
