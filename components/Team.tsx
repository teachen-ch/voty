import { Text, Flex, Image } from "rebass";
import { A } from "./Breadcrumb";

export const Team: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Text fontSize={2}>
      <Flex mx={-3} flexWrap="wrap">
        <Person
          name="Stefan Niederhauser"
          href="https://linkedin.com/in/sniederhauser"
          role="Projektleitung und techn. Umsetzung"
          org="LinkedIn"
          image="/people/sn.jpg"
        >
          Stefan hat 25 Jahre Erfahrung mit IT-Projekten aus Startups und
          Corporates und will diese im Bereich der digitalen Bildung und der
          Demokratie einsetzen als Fullstack-Engineer, Entrepreneur, Organisator
          und Weltverbesserer.
        </Person>
        <Person
          name="Roger Wiezel"
          href="http://atelier-w.ch"
          role="Grafische Gestaltung und User Experience"
          org="atelier-w.ch"
          image="/people/rw.jpg"
        >
          Roger gestaltet schon sein Leben lang und seit über zwanzig Jahren
          auch digital. Dabei interessiert ihn vor allem die Schnittstelle
          zwischen Mensch und Maschine. Wie denkt der Mensch? Wie wird die
          Maschine verständlich? Und wie verwandeln wir Komplexität in
          Schönheit?
        </Person>
        <Person
          name="Urs Wildeisen"
          href="https://phbern.ch"
          role="Pädagogische Begleitung"
          org="PH Bern"
          image="/people/uw.jpg"
        >
          Urs ist ein Meister der Didaktik. Wobei er findet, das Kinder nach dem
          ersten Schuljahr meist bereits genügend Bücher gelesen haben. Deshalb
          setzt er seinen Fokus in der Arbeit mit Kindern und PH-Studenten
          lieber auf Robotik, Programmierung, 3D-Druck oder Projektarbeit.
        </Person>
        <Person
          name="Barbara Reichen"
          href="https://barbarareichen.com"
          role="Pädagogische Begleitung"
          org="barbarareichen.com"
          image="/people/br.jpg"
        >
          Barbara ist Künstlerin, Kindergärtnerin und Mutter zweier Teenager.
          Sie weiss, dass wir die Welt schleunigst verändern müssen und nimmt
          das auch in die Hand. Mit Kunst. Mit Kindern. Und nun mit Demokratie
          als Mittel zum Zweck!
        </Person>
      </Flex>
    </Text>
  );
};

export const Person: React.FC<React.PropsWithChildren<{
  href: string;
  name: string;
  role: string;
  org: string;
  image: string;
}>> = (props) => (
  <Flex
    flexDirection="column"
    m={3}
    justifyContent="flex-start"
    alignItems="center"
    width={["39%", "39%", "20.5%"]}
  >
    <Image
      src={props.image}
      mb={3}
      sx={{
        borderRadius: 100,
        transition: "transform .6s ease-in-out",
        ":hover": {
          transform: "rotate(360deg)",
        },
      }}
      alt="Portrait"
    />
    <Text fontSize={1} textAlign="center">
      <Text>
        <strong>{props.name}</strong>
      </Text>
      <Text>
        (
        <A href={props.href} target="_blank" variant="underline">
          {props.org}
        </A>
        )
      </Text>
      <Text>{props.role}</Text>
      <hr />
      <Text textAlign="left" fontSize={"13px"}>
        {props.children}
      </Text>
    </Text>
  </Flex>
);
