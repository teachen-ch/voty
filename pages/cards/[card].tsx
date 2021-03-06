import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Card, getCardMeta } from "components/Cards";
import { ErrorPage, Loading, Page } from "components/Page";
import { useQueryParam } from "util/hooks";
import { FeedbackText } from "components/Feedback";

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
  if (!meta)
    return <ErrorPage>Dieser Lerninhalt wurde nicht gefunden: {key}</ErrorPage>;

  return (
    <Page heading={String(meta.title)}>
      <Breadcrumb>
        <A href="/cards">Lerninhalte</A>
        <Here>{meta.title}</Here>
      </Breadcrumb>
      <Card id={key} />
      <FeedbackText card={key} />
    </Page>
  );
}
