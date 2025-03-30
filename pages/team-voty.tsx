import { Button, Text } from "rebass";
import { Team } from "components/Team";
import { AppPage } from "components/Page";
import { useRouter } from "next/router";

export default function TeamPage(): React.ReactElement {
  const router = useRouter();
  return (
    <AppPage heading="&Uuml;ber das Team voty.ch">
      <Text>
        <Text>
          voty.ch ist ein Projekt des Non-Profit Vereins «voty.ch», das initial
          durch de prototypefund.opendata.ch und mercactor-schweiz.ch gefördert
          wurde.
        </Text>
      </Text>
      <Team />
      <Text my={4} textAlign="center">
        <Button onClick={() => router.push("/kontakt")}>
          Team kontaktieren
        </Button>
      </Text>
    </AppPage>
  );
}
