import { AppPage } from "components/Page";
import { Heading, Text, Card, Flex, Box } from "components/ui";
import { A } from "components/Breadcrumb";
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
      <Card className="text-base">
        <Text className="font-semibold">
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
        <Heading as="h2" className="text-xl">
          Vorstellung der bulgarischen Partner
        </Heading>
        <Flex className="mt-20 flex-col items-center justify-center">
          <Teaser>
            <TeaserImage
              src="/images/illu-teach-for-bulgaria.svg"
              width={571}
              height={539}
              top={-20}
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
              top={10}
            />
          </Teaser>

          <Teaser>
            <TeaserImage
              src="/images/illu-amalipe.svg"
              width={571}
              height={539}
              top={20}
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

const LearnMore: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  href,
}) => (
  <A
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-primary underline  whitespace-nowrap"
  >
    Learn more »»
  </A>
);

const TeaserText: React.FC<
  React.PropsWithChildren<{ title: string; fontSize?: number[] }>
> = ({ title, children }) => (
  <Box className="w-full px-0 sm:px-4 text-sm leading-[1.45em]">
    <p className="text-primary font-semibold text-base sm:text-xl mb-1">
      {title}
    </p>
    {children}
  </Box>
);

const Teaser: React.FC<React.PropsWithChildren<{ reverse?: boolean }>> = ({
  reverse,
  children,
}) => (
  <Flex className="flex flex-col md:flex-row mt-2 flex-wrap md:flex-nowrap">
    {reverse && <Box className="w-0" />}
    {children}
    {!reverse && <Box className="w-0" />}
  </Flex>
);
