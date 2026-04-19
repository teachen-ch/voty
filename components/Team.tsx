import { Box, Flex, Image, Text } from "components/ui";
import { A } from "./A";

export const Team: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Box className="text-base">
      <Flex className="flex-wrap -mx-4">
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
    </Box>
  );
};

export const Person: React.FC<
  React.PropsWithChildren<{
    href: string;
    name: string;
    role: string;
    org: string;
    image: string;
  }>
> = (props) => (
  <Flex className="flex-col m-4 justify-start items-center w-[39%] sm:w-[20.5%]">
    <Image
      src={props.image}
      className="mb-4 rounded-full transition-transform duration-600 ease-in-out hover:rotate-360"
      alt="Portrait"
    />
    <Box className="text-sm text-center">
      <p>
        <strong>{props.name}</strong>
      </p>
      <p>
        (
        <A href={props.href} target="_blank" className="underline">
          {props.org}
        </A>
        )
      </p>
      <p>{props.role}</p>
      <hr className="my-3 bg-gray-300" />
      <p className="text-left text-[13px]">{props.children}</p>
    </Box>
  </Flex>
);
