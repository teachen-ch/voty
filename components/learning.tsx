import Info from "components/Info";
import Link from "next/link";
import Video from "components/Video";
import { Box, Card, Heading, Flex, Button } from "rebass";
import { useState } from "react";
import { MDXProvider } from "@mdx-js/react";

export { Info, Link, Video };

export const Ref = (props) => (
  <Card border={10}>
    <Show if={props.title}>
      <Heading>{props.title}</Heading>
    </Show>
    <Show if={props.href}>
      <strong>Link: </strong>
      <a href={props.href}>{props.href}</a>
      <br />
    </Show>

    <Show if={props.level}>
      <strong>Schwierigkeit:</strong> {props.level}
      <br />
    </Show>
    <Show if={props.time}>
      <strong>Dauer:</strong> {props.time}
      <br />
    </Show>
    <hr />
    {props.children}
    <Box textAlign="right" fontSize={1}>
      ↪ Quelle: <Source href={props.href} />
    </Box>
  </Card>
);

export const Source = (props) => {
  const domain = props.href.replace(/^https?\:\/\/(?:www\.)?(.*?)\/.*$/, "$1");
  const start = props.href.replace(/^(https?\:\/\/(?:www\.)?).*/, "$1");
  return <a href={`${start}${domain}`}>{domain}</a>;
};

export const Show = (props) => {
  if (props.if) return props.children;
  else return null;
};

export const Center = (props) => (
  <Flex justifyContent="center">{props.children}</Flex>
);

export const Toggle = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        <small>{open ? "Schliessen" : "Anzeigen"}</small>
      </Button>
      <div style={{ display: open ? "block" : "none " }}>{props.children}</div>
    </>
  );
};

export const Include = (props) => {
  const Wrapper = props.toggle ? Toggle : () => <div />;
  return (
    <Wrapper>
      <MDXProvider
        components={{
          h1: Heading,
          wrapper: (props: any) => (
            <Box my={2} p={3} bg="lightgray">
              {props.children}
            </Box>
          ),
        }}
      >
        <div>{props.children}</div>
      </MDXProvider>
    </Wrapper>
  );
};
