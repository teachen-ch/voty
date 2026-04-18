import { AppPage } from "components/Page";
import { Heading, Text, Box, Flex, Link, Image, Card } from "components/ui";
import NextImage from "next/image";
import { Grid } from "components/ui";
import { ReactElement } from "react";
import { ReadMore } from "components/ReadMore";
import IconCheckWhite from "../public/images/icon_yes.svg";
import { TDIcon } from "components/Table";
import { CircleBullet } from "components/Misc";
import { FAQ } from "../components/FAQ";
import { InlineSignup } from "./user/signup";

export default function Abstimmung(): ReactElement {
  return (
    <AppPage
      heading="Jugendliche stimmen ab – jetzt Klasse anmelden"
      image="/images/header_m2.svg"
    >
      <Text className="mt-8 text-base sm:text-lg">
        Im Vergleich zu älteren Generationen gehen junge Menschen (18-30) in der
        Schweiz halb so oft abstimmen. Dabei wäre gerade ihre Meinung wichtig!
        Wir wollen Jugendliche ermutigen und befähigen, ihr Stimmrecht aktiv
        wahrzunehmen – das will geübt sein und damit fangen wir am besten
        bereits in der Schulzeit an
      </Text>
      <Flex className="my-8 items-center flex-col text-base sm:text-lg">
        <Flex className="my-2 text-black">
          <TDIcon className="mt-4 mr-4">
            <NextImage src={IconCheckWhite} height={25} alt="" />
          </TDIcon>
          <Text className="max-w-[700px]">
            Ja, ich unterrichte politische Bildung in meiner Klasse und nehme
            auch Bezug auf aktuelle Themen und Abstimmungen
          </Text>
        </Flex>
        <Flex className="my-2">
          <TDIcon className="mt-4 mr-4">
            <NextImage src={IconCheckWhite} height={25} alt="" />
          </TDIcon>
          <Text className="max-w-[700px]">
            Ich nehme mir Zeit, um die Vorlagen mit den Schüler*innen zu
            diskutieren (z. B. mit Material von{" "}
            <Link
              href="https://www.easyvote.ch/de/school/"
              rel="noreferrer"
              className="underline"
            >
              easyvote.ch
            </Link>{" "}
            )
          </Text>
        </Flex>
        <Flex className="my-2">
          <TDIcon className="mt-4 mr-4">
            <NextImage src={IconCheckWhite} height={25} alt="" />
          </TDIcon>
          <Text className="max-w-[700px]">
            Ich führe die Abstimmung mit meiner Klasse online durch und
            bespreche im Nachgang das Resultat
          </Text>
        </Flex>
      </Flex>

      <Box className="my-16" />

      <InlineSignup />

      <Box className="mt-16" />

      <Explainer title="Anleitung Klassenabstimmung">
        <Step n={1}>
          Erstelle ein Konto auf voty.ch und eröffne eine Klasse:
          <Image src="/screens/screen_t1.png" className="mt-2" />
        </Step>
        <Step n={2}>
          Wähle die Abstimmungen für deine Klasse aus:
          <Image src="/screens/screen_t2.png" className="mt-2" />
        </Step>
        <Step n={3}>
          Lade Schüler*innen per Email oder mit Einladungslink ein:
          <Image src="/screens/screen_t3.png" className="mt-2" />
        </Step>
      </Explainer>

      <Box className="mt-4" />
      <Explainer title="Anleitung Schüler*innen">
        <Step n="1">
          SuS erhält Einladungs-Email. Ein Klick auf den Link eröffnet Konto:
          <Image src="/screens/screen_s1.png" className="mt-2" />
        </Step>
        <Step n="2">
          Auswahl der Abstimmungen:
          <Image src="/screens/screen_s2.png" className="mt-2" />
        </Step>
        <Step n="3">
          SuS Informieren sich auf voty.ch mit Materialien von easyvote:
          <Image src="/screens/screen_s3.png" className="mt-2" />
        </Step>
        <Step n="4">
          Anonyme Abstimmung wird durchgeführt:
          <Image src="/screens/screen_s4.jpg" className="mt-2" />
        </Step>
      </Explainer>
      <Box className="mt-4" />

      <ReadMore title="Fragen und Antworten">
        <FAQ />
      </ReadMore>
      <Box className="my-16" />
    </AppPage>
  );
}

export const Explainer: React.FC<
  React.PropsWithChildren<{ title: string }>
> = ({ title, children }) => (
  <ReadMore title={title}>
    <Card className="text-sm xs:text-base sm:text-lg">{children}</Card>
  </ReadMore>
);

export const Step: React.FC<
  React.PropsWithChildren<{
    n: string | number;
    mb?: number;
    bg?: string;
  }>
> = ({ n, mb = 4, children, bg = "gray" }) => (
  <Flex className="mb-8">
    <CircleBullet value={n} bg={bg} color="#fff" />
    <Box className="ml-2 pt-[3px]">{children}</Box>
  </Flex>
);

export const Stats: React.FC<React.PropsWithChildren<unknown>> = () => (
  <Box className="text-base">
    <Heading className="mt-0">Aktueller Stand</Heading>
    <Grid columns="160px auto">
      <label>Anzahl Klassen:</label>
      <ClassBar classes={12} total={50} />

      <label>Diversität Kantone:</label>
      <CantonsBar cantons="BE, BS, LU, SG, ZH, " diversity={25} />

      <label>Verteilung Typus:</label>
      <TypeBar
        types={{ Berufsschulen: 0.2, "Sekundarstufe I": 0.56, Gymnasien: 0.24 }}
      />
    </Grid>
  </Box>
);

const ClassBar: React.FC<
  React.PropsWithChildren<{ classes: number; total: number }>
> = ({ classes, total }) => (
  <Flex className="h-[30px] w-full">
    <Box
      style={{ width: `${(classes / total) * 100}%` }}
      className="rounded-tl-[20px] rounded-bl-[20px] text-center leading-[1.4] bg-danger text-white"
    >
      {classes}
    </Box>
    <Box
      style={{ width: `${((total - classes) / total) * 100}%` }}
      className="bg-white text-gray rounded-tr-[20px] rounded-br-[20px] leading-[1.4]"
    >
      &nbsp; mindestens {total} Klassen
    </Box>
  </Flex>
);

const CantonsBar: React.FC<
  React.PropsWithChildren<{
    cantons: string;
    diversity: number;
  }>
> = ({ cantons, diversity }) => (
  <Box
    className="h-[30px] text-gray pl-4 rounded-[20px] leading-[1.4]"
    style={{
      backgroundImage: `linear-gradient(133deg, rgba(36,185,7,0.5) 0%, rgba(255,255,255,1) ${diversity}%)`,
    }}
  >
    {cantons}
  </Box>
);

const TypeBar: React.FC<
  React.PropsWithChildren<{ types: Record<string, number> }>
> = ({ types }) => (
  <Box className="h-[30px] pl-4 bg-white text-sm rounded-[20px]">
    <Flex>
      {Object.keys(types).map((name, ix) => (
        <Box
          key={name}
          style={{
            width: `${types[name] * 100}%`,
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: 1.9,
            borderRight: ix < 2 ? "3px solid lightgray" : "",
          }}
          className="text-gray"
        >
          {name}
        </Box>
      ))}
    </Flex>
    <Text className="my-1"></Text>
  </Box>
);
