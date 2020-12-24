import { gql } from "@apollo/client";
import { useWorksQuery, Work, WorkWhereInput } from "graphql/types";
import { AttachmentFields } from "components/Uploader";
import { Box, Flex } from "rebass";

export const WORKS = gql`
  query works($where: WorkWhereInput) {
    works(where: $where) {
      id
      card
      title
      text
      data
      users {
        id
        name
        shortname
      }
      attachments {
        ...AttachmentFields
      }
    }
  }
  ${AttachmentFields}
`;

export const Works: React.FC<{ where?: WorkWhereInput }> = ({ where }) => {
  const worksQuery = useWorksQuery({ variables: { where } });
  const works = worksQuery.data?.works;

  return (
    <Flex>
      {works?.map((work) => (
        <Flex key={work.id}>
          {work.id} {work.title} {JSON.stringify(work.data)}
        </Flex>
      ))}
    </Flex>
  );
};

export const PostWork: React.FC<{
  card: string;
  teamId: string;
  title?: string;
  data?: any;
}> = (props) => {
  return <Box></Box>;
};
