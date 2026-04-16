import { Text } from "rebass";
import Link from "next/link";
import { Page } from "components/Page";
import { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <Page heading="Seite nicht gefunden">
      <Text>Oh je, das ist wohl etwas schief gelaufen.</Text>
      <Text
        fontSize="200px"
        my={"-30px"}
        textAlign="center"
        sx={{
          transition: "0.4s ease-out",
          ":hover": { transform: "rotate(-360deg)" },
        }}
      >
        🤷‍♂️
      </Text>
      <Text>
        Du könntest von hier aus zurück zur letzten Seite oder auf unsere{" "}
        <Link href="/" style={{ textDecoration: "underline" }}>
          Startseite
        </Link>
        .
      </Text>
    </Page>
  );
}
