import { gql } from "@apollo/client";
import {
  Role,
  useAttachmentsQuery,
  AttachmentFieldsFragment,
} from "graphql/types";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Flex, Text, Image } from "rebass";
import { useUser } from "state/user";
import { authHeaders } from "util/apollo";
import { tr } from "util/translate";
import { CircleBullet } from "./Cards";
import { Center } from "./Learning";
import { Loading } from "./Page";
import Video from "./Video";

export const UploadArea: React.FC<{
  width: string;
  prompt: string;
  card?: string;
  thread?: string;
}> = ({ width, prompt, card, thread }) => {
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<Record<string, File>>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  // TODO: this relies on Uploader being called from /pages/team/[id]/...
  const team = String(router.query.team);
  const fields: Record<string, string> = { team };
  if (card) fields.card = card;
  if (thread) fields.thread = thread;

  async function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    if (fileInput.current && fileInput.current.files)
      await uploadFiles(fileInput.current.files);
  }

  function dragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDrag(true);
  }
  function dragExit(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  }
  async function doDrop(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    await uploadFiles(e.dataTransfer.files);
  }

  async function uploadFiles(files: FileList) {
    if (files && files.length) {
      setUploading(true);
      const result = await doUploadFiles(files, fields);
      if (result.attachments) {
        setFiles(result.attachments);
        setUploading(false);
        setDrag(false);
        // TODO: This is a shitty way, but <UploadArea> and <Uploaded/> are not really connected
        // so not sure how one can signal the other easily
        router.reload();
      }
      if (result.error) {
        setError(tr(result.error));
        setUploading(false);
        setDrag(false);
      }
    }
  }

  async function doDelete(id: string) {
    if (files) {
      await doDeleteFile(id);
      delete files[id];
      setFiles({ ...files });
    }
  }

  return (
    <Flex
      onDragOver={dragEnter}
      onDragLeave={dragExit}
      onDrop={doDrop}
      onClick={() => fileInput.current?.click()}
      bg={drag ? "primary" : "secondary"}
      height={80}
      width={width}
      justifyContent="center"
      alignItems="center"
      sx={{ cursor: "pointer" }}
    >
      <input
        type="file"
        ref={fileInput}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Center>
        <Text fontWeight="bold" fontSize={4} color="white" textAlign="center">
          {uploading ? <Loading /> : null}
          {files && files.length ? (
            <Preview files={files} doDelete={doDelete} />
          ) : (
            prompt
          )}
          {error && <Text>{error}</Text>}
        </Text>
      </Center>
    </Flex>
  );
};

const Preview: React.FC<{
  files: Record<string, File>;
  doDelete: (id: string) => void;
}> = ({ files, doDelete }) => {
  return (
    <Flex>
      {Object.keys(files).map((id) => (
        <PreviewFile key={id} id={id} file={files[id]} doDelete={doDelete} />
      ))}
    </Flex>
  );
};

const PreviewFile: React.FC<{
  id: string;
  file: File;
  doDelete: (id: string) => void;
}> = ({ id, file, doDelete }) => {
  return (
    <Flex
      bg="white"
      color="black"
      height="50px"
      alignItems="center"
      px={3}
      mx={3}
    >
      <Text fontSize={1}>
        {file.name}{" "}
        <CircleBullet
          value="x"
          bg="lightgray"
          onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            evt.preventDefault();
            evt.stopPropagation();
            doDelete(id);
          }}
        />
      </Text>
    </Flex>
  );
};

export const AttachmentFields = gql`
  fragment AttachmentFields on Attachment {
    id
    file
    title
    type
    user {
      id
      shortname
      name
    }
  }
`;

export const GET_ATTACHMENTS = gql`
  query attachments($where: AttachmentWhereInput) {
    attachments(where: $where) {
      ...AttachmentFields
    }
  }
  ${AttachmentFields}
`;

export const Uploaded: React.FC<{ card: string }> = ({ card }) => {
  const attachmentsQuery = useAttachmentsQuery({
    variables: { where: { card: { equals: card } } },
  });
  const attachments = attachmentsQuery.data?.attachments;
  if (attachmentsQuery.loading) return <Loading />;

  return (
    <Flex mx={-2} flexWrap="wrap" mt={2}>
      {attachments &&
        attachments.map((attachment) => (
          <Attachment
            key={attachment.id}
            attachment={attachment}
            refetch={attachmentsQuery.refetch}
          />
        ))}
    </Flex>
  );
};

export const Attachment: React.FC<{
  attachment: AttachmentFieldsFragment;
  refetch: () => void;
}> = ({ attachment, refetch }) => {
  const user = useUser();
  function canDelete() {
    return user
      ? attachment.user.id === user.id || user.role === Role.Teacher
      : false;
  }
  async function doDelete() {
    const result = await doDeleteFile(attachment.id);
    if (result.error) {
      alert(tr(result.error));
    } else {
      refetch();
    }
  }
  return (
    <Box bg="white" p={2} m={2} width="calc(33.3333% - 16px)">
      <Text fontSize={1} color="black" sx={{ position: "relative" }}>
        {canDelete() && (
          <Box sx={{ position: "absolute", right: -2 }} p={2}>
            <CircleBullet
              onClick={doDelete}
              value="x"
              bg="lightgray"
              color="white"
            />
          </Box>
        )}
        {getAttachmentPreview(attachment)}
        <Text sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          «{attachment.title}» von {attachment.user.shortname}
        </Text>
      </Text>
    </Box>
  );
};

function getAttachmentPreview(
  attachment: AttachmentFieldsFragment
): React.ReactElement {
  const type = attachment.type.split("/")[0];
  const url = `/api/uploaded/${attachment.file}`;
  switch (type) {
    case "image":
      return (
        <Image
          src={url}
          alt={attachment.title}
          sx={{ cursor: "pointer" }}
          onClick={() => window.open(url, "_blank")}
        />
      );
    case "video":
      return <Video url={url} width="100%" height="100%" />;
    default:
      return (
        <Box
          sx={{ border: "4px solid gray", borderRadius: 5, cursor: "pointer" }}
          bg="lightgray"
          py={4}
          onClick={() => window.open(url, "_blank")}
        >
          <Text textAlign="center" fontWeight="bold" color="gray">
            Dokument herunterladen
          </Text>
        </Box>
      );
  }
}

export async function doUploadFiles(
  files: FileList,
  fields: Record<string, string>
): Promise<Record<string, any>> {
  const data = new FormData();
  for (let i = 0; i < files.length; ++i) {
    data.append(`file_${i}`, files[i]);
  }
  Object.keys(fields).forEach((key) => data.append(key, fields[key]));

  const result = await fetch("/api/upload", {
    method: "POST",
    body: data,
    headers: authHeaders(),
  });
  return (await result.json()) as Promise<Record<string, any>>;
}

export async function doDeleteFile(id: string): Promise<Record<string, any>> {
  const result = await fetch("/api/delete", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: authHeaders(),
  });
  return (await result.json()) as Promise<Record<string, any>>;
}
