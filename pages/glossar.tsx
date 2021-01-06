import { Glossary } from "components/Glossary";
import { Text } from "rebass";
import { Page } from "components/Page";

export default function GlossaryPage(): React.ReactElement {
  return (
    <Page heading="Begriffe der Demokratie">
      <Text textAlign="left">
        <Glossary />
      </Text>
    </Page>
  );
}
