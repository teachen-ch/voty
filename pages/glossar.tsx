import { Glossary, GlossaryReplace } from "components/Glossary";
import { Box, Text } from "rebass";
import { Page } from "components/Page";

export default function GlossaryPage(): React.ReactElement {
  return (
    <Page heading="Begriffe der Demokratie">
      <Text textAlign="left">
        <GlossaryReplace>
          Einmal <b>war</b> es so, dass die @Bundesversammlung(Schweizer
          Bundesversammlung) sage, dass lkasd fnlasdfk aslk @Parlament{" "}
          <b>sdflkj</b> asdlfkj asdlfkj laksdjf @Abgeordnete(Abgeordneter)
          lkasdkfjksajdf lksdk alLKK lkasdk alk Klkasdkf LKlsdkfksdl LK sdf.ls
          lLK sdfl
          <Box>hello world @Parlament</Box>
        </GlossaryReplace>
        <Glossary />
      </Text>
    </Page>
  );
}
