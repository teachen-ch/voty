import { A, Breadcrumb } from "components/Breadcrumb";
import { Card, getCardMeta } from "components/Cards";
import { ErrorPage, Loading, Page } from "components/Page";
import { useQueryParam } from "util/hooks";

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
        <A href="/">Start</A>
        <A href="/cards">Lerninhalte</A>
        <b>{meta.title}</b>
      </Breadcrumb>
      <Card id={key} />
    </Page>
  );
}
