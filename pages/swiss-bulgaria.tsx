import { AppPage } from "components/Page";
import { Heading, Text, Card, Flex, Link, Box } from "rebass";
import React from "react";
import { useRouter } from "next/router";
import { TeaserImage } from "pages";

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
          mt={80}
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
              top={-30}
            />
            <TeaserText title="TEACH FOR BULGARIA">
              We believe that investing in people is the most sustainable way to
              improve the education system. That is why we train and support
              teachers and schools across the country to provide students with a
              high-quality education and prepare them for successful lives in
              the 21st century <LearnMore href="https://zaednovchas.bg/glas/" />
            </TeaserText>
          </Teaser>
          <Teaser reverse>
            <TeaserText title="SOFIA PLATFORM">
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
            <TeaserText title="AMALIPE">
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
            <TeaserText title="BCAUSE">
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
              top={-20}
            />
          </Teaser>
        </Flex>
        <Heading>Kontakt</Heading>
        <Text>voty.ch, Effingerstrasse 10, 3011 Bern, hello@voty.ch</Text>
      </Card>
    </AppPage>
  );
}

const LearnMore: React.FC<{ href: string }> = ({ href }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <Text fontWeight="semi" color="primary" variant="link">
      Learn more »»
    </Text>
  </Link>
);

const TeaserText: React.FC<{ title: string; fontSize?: number[] }> = ({
  title,
  children,
}) => (
  <Box width={["100%", "100%", "100%", "100%"]} px={[0, 0, 3]}>
    <Text fontSize={[1, 1, 1, 1]} lineHeight="1.45em">
      <Text color="primary" fontWeight="semi" fontSize={[2, 2, 4, 4]} mb={1}>
        {title}
      </Text>
      {children}
    </Text>
  </Box>
);

const Teaser: React.FC<{ reverse?: boolean }> = ({ reverse, children }) => (
  <Flex
    mt={[2, 2, 2, 2]}
    flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
    flexDirection={
      reverse
        ? ["column-reverse", "column-reverse", "column-reverse", "row"]
        : undefined
    }
  >
    {reverse && <Box width={[0, 0, 0, 0]} />}
    {children}
    {!reverse && <Box width={[0, 0, 0, 0]} />}
  </Flex>
);
