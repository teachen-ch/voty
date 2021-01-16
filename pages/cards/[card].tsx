import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Card, getCardMeta } from "components/Cards";
import { HideFeature } from "components/HideFeature";
import { ErrorPage, Loading, Page } from "components/Page";
import { useQueryParam } from "util/hooks";
import { Text } from "rebass";

export default function CardPagePublic(): React.ReactElement {
  const key = useQueryParam("card");

  if (!key) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }

  const meta = getCardMeta(key);
  if (!meta) return <ErrorPage>Lerninhalt nicht gefunden: {key}</ErrorPage>;

  return (
    <Page heading={String(meta.title)}>
      <Breadcrumb>
        <A href="/cards">Lerninhalte</A>
        <Here>{meta.title}</Here>
      </Breadcrumb>
      <Card id={key} />

      <HideFeature id="discussions">
        {meta.discussion !== false && (
          <Text fontSize={1} fontStyle="italic">
            Diskussionen können nur in Klassen geführt werden.
          </Text>
        )}
      </HideFeature>
    </Page>
  );
}
