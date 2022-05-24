import { A, Breadcrumb, Here } from "components/Breadcrumb";
import { Card, getCardMeta } from "components/Cards";
import { AppPage, ErrorPage, Loading, Page } from "components/Page";
import { useQueryParam, useTheme } from "util/hooks";
import { FeedbackText } from "components/Feedback";

export default function CardPagePublic(): React.ReactElement {
  const key = useQueryParam("card");
  const aula = useTheme("aula");

  if (!key) {
    return (
      <AppPage image={aula ? "/images/aula_header_m1.svg" : undefined}>
        <Loading />
      </AppPage>
    );
  }

  const meta = getCardMeta(key);
  if (!meta)
    return <ErrorPage>Dieser Lerninhalt wurde nicht gefunden: {key}</ErrorPage>;

  return (
    <AppPage
      heading={String(meta.title)}
      image={aula ? "/images/aula_header_m1.svg" : undefined}
    >
      <Breadcrumb>
        <A href={aula ? "/aula" : "/cards"}>Lerninhalte</A>
        <Here>{meta.title}</Here>
      </Breadcrumb>
      <Card id={key} />
      <FeedbackText card={key} />
    </AppPage>
  );
}
