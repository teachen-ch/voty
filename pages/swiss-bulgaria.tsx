import { AppPage, H1 } from "components/Page";
import { Heading, Button, Text, Card, Link as A, Flex } from "rebass";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Center } from "components/Learning";
import { HideFeature } from "components/HideFeature";
import { Team } from "components/Team";
import { useTr } from "util/translate";
import { LearnMore, TeaserImage, TeaserText } from "pages";
import { Teaser } from "pages";

export default function Projekt(): React.ReactElement {
  const router = useRouter();
  return (
    <AppPage
      heading="Projekt GLAS – Civic Education in Bulgarien"
      image="/images/header_m2.svg"
    >
      <Card fontSize={2}>
        <Text fontWeight="semi">
          Mit Unterstützung des{" "}
          <a href="https://www.eda.admin.ch/countries/bulgaria/en/home/schweizer-beitrag/second-swiss-contribution.html">
            EDA
          </a>{" "}
          bringt voty.ch seine Erfahrungen im Bereich Civic Education aus der
          Schweiz nach Bulgarien. Im Projekt GLAS («Gражданско лидерство и
          активно сътрудничество») arbeiten lokale NGOs mit Lehrpersonen und
          lokalen Organisationen gemeinsam daran, politische Bildung aus dem
          Klassenzimmer in den Alltag zu holen – in Gemeinden abseits der
          grossen Städte. voty.ch ist Teil eines Konsortiums bulgarischer
          Partnerorganisationen.
          <br />
          <br />
          <br />
        </Text>
        <Heading as="h2">Vorstellung der bulgarischen Partner</Heading>
        <Flex
          mt={-80}
          width={["100%", "100%", "80%", "100%"]}
          maxWidth="1160px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Teaser>
            <TeaserImage
              src="/images/illu-teach-for-bulgaria.svg"
              width={571}
              height={539}
              top={-40}
            />
            <TeaserText title="TEACH FOR BULGARIA" fontSize={[1, 1, 1, 1]}>
              We believe that investing in people is the most sustainable way to
              improve the education system. That is why we train and support
              teachers and schools across the country to provide students with a
              high-quality education and prepare them for successful lives in
              the 21st century <LearnMore href="https://zaednovchas.bg/glas/" />
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="SOFIA PLATFORM" fontSize={[1, 1, 1, 1]}>
              In many European societies, including Bulgaria, democratic life is
              marked by low trust, weak participation, and unresolved engagement
              with the recent past. Sofia Platform Foundation works within this
              context, focusing on civic education, historical memory, and
              practical forms of participation that strengthen democratic
              culture over time.{" "}
              <LearnMore href="https://www.sofiaplatform.org/bg/projects/GLAS" />
            </TeaserText>{" "}
            <TeaserImage
              src="/images/illu-sofia-platform.svg"
              width={571}
              height={539}
              top={-20}
            />
          </Teaser>

          <Teaser>
            <TeaserImage
              src="/images/illu-amalipe.svg"
              width={571}
              height={539}
              top={-20}
            />
            <TeaserText title="AMALIPE" fontSize={[1, 1, 1, 1]}>
              Our mission is to stimulate the modernization and empowerment of
              the Roma community in Bulgaria for its active participation and
              equal access to resources and development processes, with a
              priority focus on access to quality education, quality health care
              and social services. This process is impossible without the
              modernization and emancipation of Romani women.{" "}
              <LearnMore href="https://amalipe.bg/portfolio/glas-bg/" />
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="BCAUSE" fontSize={[1, 1, 1, 1]}>
              BCause Foundation is an expert organisation, a recognized leader
              with 30 years experience at national and international level
              (since 1995). We encourage people, organizations and communities
              to transform their lives, by developing the giving culture and
              social investment. <LearnMore href="https://bcause.bg" />
            </TeaserText>{" "}
            <TeaserImage
              src="/images/illu-bcause.svg"
              width={571}
              height={539}
              top={-40}
            />
          </Teaser>
        </Flex>
        <Heading>Kontakt</Heading>
        <Text>voty.ch, Effingerstrasse 10, 3011 Bern, hello@voty.ch</Text>
      </Card>
    </AppPage>
  );
}

export const Tag: React.FC<{ bg?: string }> = ({ children, bg }) => (
  <Text
    fontSize={1}
    bg={bg || "rgb(187, 187, 187)"}
    sx={{ borderRadius: 0, display: "inline" }}
    color="#fff"
    px={2}
    py={"2px"}
  >
    {children}
  </Text>
);

export const Detail: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const tr = useTr();
  return (
    <Text sx={{ display: "inline" }}>
      &nbsp;{" "}
      <A onClick={() => setOpen(!open)} variant="underline">
        {open ? tr("Misc.DetailOpen") : tr("Misc.DetailClosed")}
      </A>
      {open && children}
    </Text>
  );
};
