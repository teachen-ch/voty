import Head from "next/head";
import { ReactElement } from "react";
import { isBrowser } from "util/isBrowser";
import { initStats } from "util/stats";

export function Header(): ReactElement {
  if (isBrowser()) {
    initStats();
  }
  return (
    <Head>
      <html lang={"de"} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d9000d" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#d9000d" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="Voty bringt Demokratie an die Schule und fördert das De­mo­kra­tie­ver­ständ­nis der Jugend nachhaltig mit drei Modulen: Demokratie verstehen + testen + leben."
      />
    </Head>
  );
}
