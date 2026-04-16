import { FAQ } from "../components/FAQ";
import { Page } from "components/Page";
import { ReactElement } from "react";

export default function FaqPage(): ReactElement {
  return (
    <Page heading="Fragen und Antworten zu voty.ch">
      <FAQ />
    </Page>
  );
}
