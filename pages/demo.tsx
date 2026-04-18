import { Box, Button, Text } from "components/ui";
import { HideFeature } from "components/HideFeature";
import { Page } from "components/Page";
import { ReactElement } from "react";

export default function DemoPage(): ReactElement {
  return (
    <Page heading="demo.voty.ch - Demo-Version">
      <HideFeature id="demo">
        <Text>
          Möchten sie die Funktionalitäten von voty.ch ausprobieren bevor sie
          eine eigene Klasse einrichten? Kein Problem, melden sie sich auf
          unserem Demo-Server an.
        </Text>

        <Text className="text-sm">
          <b>Achtung:</b> sämtliche Inhalte werden jede Nacht gelöscht und der
          Demo-Server kann gelegentlich nicht verfügbar oder instabil sein.
        </Text>

        <Box className="bg-[darkgray] p-4 leading-[1.5] mt-8">
          <Text>
            Email:{" "}
            <Text as="span" className="ml-4 inline-block font-mono">
              teacher@teachen.ch
            </Text>
          </Text>
          <Text>
            Passwort:{" "}
            <Text as="span" className="ml-4 inline-block font-mono">
              teachen
            </Text>
          </Text>
          <Button
            className="mt-8 w-full"
            onClick={() =>
              (document.location.href =
                "https://demo.voty.ch/user/login?email=teacher@teachen.ch")
            }
          >
            Als Lehrperson anmelden
          </Button>
        </Box>

        <Text className="mt-8">
          Mit folgendem Konto erfolgt eine Anmeldung als Schüler*in:
        </Text>

        <Box className="bg-[darkgray] p-4 leading-[1.5]">
          <Text>
            Email:{" "}
            <Text as="span" className="ml-4 inline-block font-mono">
              student@teachen.ch
            </Text>
          </Text>
          <Text>
            Passwort:{" "}
            <Text as="span" className="ml-4 inline-block font-mono">
              teachen
            </Text>
          </Text>
          <Button
            className="mt-8 w-full"
            onClick={() =>
              (document.location.href =
                "https://demo.voty.ch/user/login?email=student@teachen.ch")
            }
          >
            Als Schüler*in anmelden
          </Button>
        </Box>
      </HideFeature>
    </Page>
  );
}
