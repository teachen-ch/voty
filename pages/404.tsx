import { Text } from "components/ui";
import Link from "next/link";
import { Page } from "components/Page";
import { ReactElement } from "react";

export default function NotFound(): ReactElement {
  return (
    <Page heading="Seite nicht gefunden">
      <Text>Oh je, das ist wohl etwas schief gelaufen.</Text>
      <Text
        className="text-[200px] my-[-30px] text-center"
        style={{
          transition: "0.4s ease-out",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "rotate(-360deg)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "")}
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
