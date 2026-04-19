import Head from "next/head";
import { Flex, Heading, Box, Text, Button, Image } from "components/ui";
import { Background, Container, H1 } from "components/Page";
import { Footer } from "components/Footer";
import { TopBar } from "components/TopBar";
import { useRouter } from "next/router";
import NextImage from "next/image";
import Link from "next/link";
import TweetClaude from "../public/images/tweet_claude_longchamp.png";
import { A } from "components/A";
import { useTheme } from "util/hooks";

export default function Home(): React.ReactElement {
  const router = useRouter();
  const aula = useTheme("aula");
  const aulaPrefix = aula ? "aula_" : "";

  return (
    <>
      <Head>
        <title>voty.ch – Demokratie an die Schule!</title>
      </Head>

      <Background bgImages={[]} />
      <TopBar home />
      <Container>
        <H1 className="mt-6 text-center text-[10vw] sm:text-[50px] md:text-[60px] lg:text-[76px]">
          <span className="block leading-none font-black text-[15vw] sm:text-[90px] md:text-[100px] lg:text-[126px]">
            Demokratie
          </span>
          an die Schule!
        </H1>
        <Box className="mt-0 sm:-mt-5 md:-mt-7.5 lg:-mt-12.5 md:max-w-[80%]">
          <NextImage
            src="/images/start_intro.svg"
            width={934}
            height={513}
            alt="voty.ch – Online Demokratie Lehrnmittel"
          />
        </Box>
        <Box className="max-w-200 w-full text-center">
          <Button
            onClick={() => router.push("/user/signup")}
            className="mt-2 sm:mt-4 md:mt-8 px-8 py-2 rounded-full w-150 max-w-[80%] leading-none"
          >
            Jetzt Klasse anmelden!
          </Button>

          <Heading
            as="h2"
            className="text-[30px] sm:text-[40px] mt-8 sm:mt-16 text-primary"
          >
            Jugendliche stimmen ab
          </Heading>
          <Flex className="mb-8 sm:mb-16 justify-around">
            <Text className="leading-[1.5em] text-base sm:text-lg">
              Die Demokratie ist eines der wohl wichtigsten Güter der Schweiz.
              Aber wie ge­lingt es uns, die Ju­gendlichen für die Demo­kratie zu
              begeis­tern?
            </Text>
          </Flex>

          <Flex className="justify-between flex-wrap">
            <Button
              className="mb-2 w-full sm:w-[calc(50%-8px)]"
              onClick={() => router.push("/projekt")}
            >
              Weitere Infos zum Projekt
            </Button>
            <Button
              className="mb-2 w-full sm:w-[calc(50%-8px)]"
              onClick={() => router.push("/newsletter")}
            >
              Newsletter abonnieren
            </Button>
          </Flex>
        </Box>
        <Flex className="flex-col items-center justify-center max-w-290 w-full sm:w-[80%] md:w-full">
          <H1 className="mt-16 sm:mt-32 w-full text-center">
            Modul 1 – Demokratie verstehen
          </H1>
          <Teaser>
            <TeaserImage
              src="/images/start_teaser_m1a.svg"
              width={571}
              height={539}
              className="md:-mt-30"
            />
            <TeaserText title="Ein Grundverständnis für Demokratie schaffen">
              Wir glauben, dass ein demokratisches Verständnis nur durch
              demokratische Praxis erreicht werden kann. Deshalb möchten wir mit
              voty.ch bereits in der Schule eine Basis für das
              Demokratieverständnis schaffen, dieses mit den Schüler*Innen
              anwenden und so die Fähigkeiten fördern, welche für eine
              demokratische Partizipation wichtig sind.
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="Eine Online-Werkzeugkiste für politische Bildung">
              voty.ch stellt ein wachsendes Angebot an digitalen Lerninhalten
              für die politischen Bildung zur Verfügung. Neben einer
              Aus&shy;wahl an Videos von SRF mySchool und dem Bot «Chaty», der
              Grundbegriffe der Demo&shy;kratie erklärt, stehen vor allem
              interaktive Tools (Einzel- oder Gruppen&shy;arbeiten) im
              Vordergrund. <LearnMore href="/lernen" />
            </TeaserText>
            <TeaserImage
              src={`/images/${aulaPrefix}start_teaser_m1b.svg`}
              width={629}
              height={535}
              className="md:-mt-24"
            />
          </Teaser>

          <H1 className="mt-16 sm:mt-32 w-full text-center">
            Modul 2 – Demokratie testen
          </H1>
          <Teaser>
            <TeaserImage
              src={`/images/${aulaPrefix}start_teaser_m2a.svg`}
              width={609}
              height={536}
              className="md:-mt-24"
            />
            <TeaserText title="Auch die Jugend hat eine Meinung">
              Im Vergleich zu älteren Generationen stimmen junge Menschen halb
              so oft ab. Dabei wäre gerade ihre Meinung wichtig! Wir wollen
              Jugendliche ermutigen und befähigen, ihr Stimmrecht aktiv
              wahrzunehmen – das will geübt sein und damit fangen wir am besten
              bereits in der Schule an! <LearnMore href="/abstimmung" />
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="Jetzt Klasse anmelden!">
              Zu den vierteljährlichen eidgenössischen Abstimmungen führen wir
              in Zusammenarbeit mit easyvote.ch anonyme
              Online-Klassenabstimmungen durch. Melde jetzt deine Klasse für die
              Abstimmung an. <LearnMore href="/abstimmung" />
            </TeaserText>
            <TeaserImage
              src="/images/start_teaser_m2b.svg"
              width={597}
              height={529}
              className="md:-mt-20"
            />
          </Teaser>

          <H1 className="mt-16 sm:mt-32 w-full text-center">
            Modul 3 – Demokratie leben
          </H1>

          <Teaser reverse>
            <TeaserImage
              src={`/images/${aulaPrefix}start_teaser_m3.svg`}
              width={636}
              height={589}
            />
            <TeaserText title="Wer entscheidet an euer Schule?">
              Wer fällt die Entscheidungen an eurem Schulhaus? Dürfen
              Schülerinnen und Schüler mitreden und Vorschläge einbringen? Wir
              möchten gemeinsam testen, wie wir partizipative Prozesse und mehr
              Demokratie in Schulhäuser bringen können.{" "}
              <LearnMore href="/leben" />
              <Box className="mb-8" />
            </TeaserText>
          </Teaser>
        </Flex>
        <Box
          className="mt-24 p-0 w-70 sm:w-103.5"
          style={{
            border: "6px solid #C5CFD6",
            borderRadius: "20px",
            backgroundColor: "#C5CFD6",
          }}
        >
          <Flex
            className="h-12.5 pt-3.75"
            style={{ backgroundColor: "#C5CFD6" }}
          >
            <Box
              className="w-5 h-5 ml-3.75"
              style={{ backgroundColor: "#98AAB2", borderRadius: "10px" }}
            />
            <Box
              className="w-5 h-5 ml-3.75"
              style={{ backgroundColor: "#98AAB2", borderRadius: "10px" }}
            />
            <Box
              className="w-5 h-5 ml-3.75"
              style={{ backgroundColor: "#98AAB2", borderRadius: "10px" }}
            />
          </Flex>
          <Flex className="justify-center">
            <A
              href="https://twitter.com/claudelongchamp/status/1360190735212032001?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1360190735212032001%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fdev.voty.ch%2F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NextImage
                src={TweetClaude}
                width={400}
                height={278}
                alt="Tweet Claude Longchamp – Tolle Möglichkeit, nutzen!"
              />
            </A>
          </Flex>
        </Box>

        <H1 className="mt-24 -mb-5 text-center">Laufende Projekte</H1>

        <Flex className="justify-center mt-0">
          <Teaser>
            <TeaserImage
              src="/images/illu-glas.svg"
              width={371}
              height={239}
              className="md:-mt-16"
            />
            <TeaserText title="Projekt GLAS - Schweiz + Bulgarien">
              Voty.ch arbeitet von 2025-2028 als Schweizer Partnerorganisation
              im Projekt «GLAS» zusammen mit lokale NGOs in Bulgarien.
              <br />
              <LearnMore href="/swiss-bulgaria" />
              <Link
                href="/swiss-bulgaria"
                className="block mt-8 p-2"
                style={{
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "15px",
                }}
              >
                <Image
                  src="/images/logo-ch-bul.png"
                  className="w-full h-auto"
                  alt="Projekt GLAS - Schweiz + Bulgarien"
                />
              </Link>
            </TeaserText>
          </Teaser>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}

export const Teaser: React.FC<
  React.PropsWithChildren<{ reverse?: boolean }>
> = ({ reverse, children }) => (
  <Flex className="flex flex-row mt-8 md:mt-24 mx-auto flex-wrap md:flex-nowrap">
    {reverse && <Box className="w-0 md:w-[10%]" />}
    {children}
    {!reverse && <Box className="w-0 md:w-[10%]" />}
  </Flex>
);

export const TeaserText: React.FC<
  React.PropsWithChildren<{ title: string; fontSize?: number[] }>
> = ({ title, children }) => (
  <Box className="w-full md:w-[40%] px-0 sm:px-4 text-base sm:text-lg leading-[1.45em]">
    <Text
      as="span"
      className="block text-primary font-semibold text-base sm:text-xl"
    >
      {title}
    </Text>
    {children}
  </Box>
);

export const TeaserImage: React.FC<
  React.PropsWithChildren<{
    src: string;
    width: number;
    height: number;
    className?: string;
    top?: number;
  }>
> = ({ src, width, height, className, top }) => (
  <Box
    className={`w-[90%] sm:w-[70%] md:w-[50%] mx-auto flex flex-col md:flex-row ${
      className ?? ""
    }`}
    style={top !== undefined ? { position: "relative", top: `${top}px` } : undefined}
  >
    <Box className="mx-0 sm:mx-2 mb-8">
      <NextImage src={src} width={width} height={height} alt="Teaser-Bild" />
    </Box>
  </Box>
);

export const LearnMore: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  href,
}) => (
  <Link
    href={href}
    className="font-semibold text-primary underline whitespace-nowrap"
  >
    Mehr erfahren »»
  </Link>
);
