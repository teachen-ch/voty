import { Page, Loading, ErrorPage } from "components/Page";
import { Card, getCardMeta } from "components/Cards";
import { useRouter } from "next/router";
import { Text } from "rebass";

export default function CardPage(): React.ReactElement {
  const router = useRouter();
  const key = String(router.query.key);

  if (!key) return <Loading />;

  const meta = getCardMeta(key);
  if (!meta) {
    return <ErrorPage>Lerninhalt nicht gefunden: {key}</ErrorPage>;
  }
  return (
    <Page heading={String(meta.title)}>
      <Text textAlign="left">
        <Card id={key} />
      </Text>
    </Page>
  );
}
