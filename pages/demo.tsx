import { Box, Button, Text } from "rebass";
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

        <Text fontSize={1}>
          <b>Achtung:</b> sämtliche Inhalte werden jede Nacht gelöscht und der
          Demo-Server kann gelegentlich nicht verfügbar oder instabil sein.
        </Text>

        <Box bg="darkgray" padding={3} lineHeight={1.5} mt={4}>
          <Text>
            Email:{" "}
            <Text ml={3} variant="inline" fontFamily="monospace">
              teacher@teachen.ch
            </Text>
          </Text>
          <Text>
            Passwort:{" "}
            <Text ml={3} variant="inline" fontFamily="monospace">
              teachen
            </Text>
          </Text>
          <Button
            mt={4}
            width="100%"
            onClick={() =>
              (document.location.href =
                "https://demo.voty.ch/user/login?email=teacher@teachen.ch")
            }
          >
            Als Lehrperson anmelden
          </Button>
        </Box>

        <Text mt={4}>
          Mit folgendem Konto erfolgt eine Anmeldung als Schüler*in:
        </Text>

        <Box bg="darkgray" padding={3} lineHeight={1.5}>
          <Text>
            Email:{" "}
            <Text ml={3} variant="inline" fontFamily="monospace">
              student@teachen.ch
            </Text>
          </Text>
          <Text>
            Passwort:{" "}
            <Text ml={3} variant="inline" fontFamily="monospace">
              teachen
            </Text>
          </Text>
          <Button
            mt={4}
            width="100%"
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
