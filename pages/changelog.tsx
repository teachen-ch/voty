import { AppPage } from "components/Page";
import { promises as fs } from "fs";
import { Markdown } from "util/markdown";

export default function ChangeLog({
  changelog,
}: {
  changelog: string;
}): React.ReactElement {
  return (
    <AppPage heading="voty.ch Changelog">
      <Markdown>{changelog}</Markdown>
    </AppPage>
  );
}

export async function getStaticProps(): Promise<{
  props: { changelog: string };
}> {
  // Call an external API endpoint to get posts
  const buffer = await fs.readFile("docs/CHANGELOG.md");
  const changelog = buffer.toString();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      changelog,
    },
  };
}
