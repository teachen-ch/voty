import { gql } from "@apollo/client";
import {
  Role,
  useAttachmentsQuery,
  AttachmentFieldsFragment,
  UserWhereUniqueInput,
} from "graphql/types";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { Box, Flex, Text, Image } from "components/ui";
import { Button } from "components/ui";
import { useUser } from "state/user";
import { authHeaders } from "util/apollo";
import { useTr } from "util/translate";
import { CircleBullet } from "./Misc";
import { Center } from "./Learning";
import { Err, Loading } from "./Page";
import Video from "./Video";
import { Authors, usePostWork, WorkCard, WorkItem, Works } from "./Works";
import { Info } from "./Info";
import { Input, Label } from "components/ui";
import { CardContext } from "./Cards";

export const UploadWork: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & { prompt: string }
  >
> = (props) => {
  const { card } = useContext(CardContext);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<UserWhereUniqueInput[]>();
  const [trigger, setTrigger] = useState(0);
  const [attachments, setAttachments] = useState<
    Record<string, AttachmentFieldsFragment>
  >({});
  const [doPostWork, state] = usePostWork({
    card,
    title,
    data: { attachments },
    users,
    setTrigger,
  });

  if (!card)
    return <Err msg="<UploadWork/> needs to be placed in a CardContext." />;

  const success = state.called && !state.error;
  return (
    <Box {...props}>
      {success ? (
        <Info>Erfolgreich gespeichert!</Info>
      ) : (
        <>
          <UploadArea
            card={card}
            prompt={props.prompt}
            resultCallback={setAttachments}
          />

          <Label className="mt-4 mb-2">Titel:</Label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label className="mt-4">Erarbeitet durch:</Label>
          <Authors setUsers={setUsers} />
          <Button
            className="mt-4 w-full"
            onClick={doPostWork}
            disabled={!Object.keys(attachments).length}
          >
            Abschicken
          </Button>
          <Err msg={state.error?.message} />
        </>
      )}
      <Works card={card} mt={6} items={UploadItem} trigger={trigger} />
    </Box>
  );
};

const UploadItem: WorkItem = ({ work }) => {
  const attachments = work.data?.attachments as Record<
    string,
    AttachmentFieldsFragment
  >;
  return (
    <WorkCard>
      <Flex className="-mx-2 flex-wrap mt-2">
        {Object.keys(attachments).map((key) => (
          <Attachment key={key} attachment={attachments[key]} hideUser />
        ))}
      </Flex>
    </WorkCard>
  );
};

export const UploadArea: React.FC<
  React.PropsWithChildren<{
    prompt: string;
    width?: string;
    card?: string;
    discussion?: string;
    resultCallback?: (
      attachments: Record<string, AttachmentFieldsFragment>
    ) => void;
  }>
> = ({ prompt, width = "100%", card, discussion, resultCallback }) => {
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<Record<string, File>>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const tr = useTr();
  const team = String(router.query.team);
  const fields: Record<string, string> = { team };
  if (card) fields.card = card;
  if (discussion) fields.discussion = discussion;

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
        setFiles(result.files);
        if (resultCallback) resultCallback(result.attachments);
        setUploading(false);
        setDrag(false);
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
      className={`h-[80px] justify-center items-center cursor-pointer ${
        drag ? "bg-danger" : "bg-primary"
      }`}
      style={{ width }}
    >
      <input
        type="file"
        ref={fileInput}
        onChange={onChange}
        style={{ display: "none" }}
      />
      <Center>
        <Text className="font-semibold text-xl text-white text-center">
          {uploading ? <Loading /> : null}
          {files && Object.keys(files).length ? (
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

const Preview: React.FC<
  React.PropsWithChildren<{
    files: Record<string, File>;
    doDelete: (id: string) => void;
  }>
> = ({ files, doDelete }) => {
  return (
    <Flex>
      {Object.keys(files).map((id) => (
        <PreviewFile key={id} id={id} file={files[id]} doDelete={doDelete} />
      ))}
    </Flex>
  );
};

const PreviewFile: React.FC<
  React.PropsWithChildren<{
    id: string;
    file: File;
    doDelete: (id: string) => void;
  }>
> = ({ id, file, doDelete }) => {
  return (
    <Flex className="bg-white text-black h-[50px] items-center px-4 mx-4 rounded-[8px]">
      <Text className="text-sm">
        {file.name}{" "}
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            doDelete(id);
          }}
        >
          <CircleBullet value="x" bg="lightgray" />
        </span>
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

export const Uploaded: React.FC<React.PropsWithChildren<{ card: string }>> = ({
  card,
}) => {
  const attachmentsQuery = useAttachmentsQuery({
    variables: { where: { card: { equals: card } } },
  });
  const attachments = attachmentsQuery.data?.attachments;
  if (attachmentsQuery.loading) return <Loading />;

  return (
    <Flex className="-mx-2 flex-wrap mt-2">
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

export const Attachment: React.FC<
  React.PropsWithChildren<{
    attachment: AttachmentFieldsFragment;
    hideUser?: boolean;
    refetch?: () => void;
  }>
> = ({ attachment, refetch, hideUser }) => {
  const user = useUser();
  const tr = useTr();
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
      if (refetch) {
        refetch();
      }
    }
  }
  return (
    <Box className="bg-white p-2 m-2 w-[calc(33.3333%-16px)]">
      <Text className="text-sm text-black relative">
        {canDelete() && !hideUser && (
          <Box className="absolute right-[-2px] p-2">
            <CircleBullet
              onClick={doDelete}
              value="x"
              bg="lightgray"
              color="white"
            />
          </Box>
        )}
        {getAttachmentPreview(attachment)}
        <Text className="overflow-hidden text-ellipsis">
          «{attachment.title}»{!hideUser && `von ${attachment.user.shortname}`}
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
          className="cursor-pointer"
          onClick={() => window.open(url, "_blank")}
        />
      );
    case "video":
      return <Video url={url} width="100%" height="100%" />;
    default:
      return (
        <Box
          className="border-4 border-gray-400 rounded-card cursor-pointer bg-highlight py-8"
          onClick={() => window.open(url, "_blank")}
        >
          <Text className="text-center font-semibold text-gray-600">
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
  if (result.status == 413) {
    alert(
      "Diese Datei ist leider grösser als 30 Megabytes, das ist mir zu gross, sorry!"
    );
  }
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
