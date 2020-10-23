import Info from "components/Info";
import Link from "next/link";
import Video from "components/Video";
import { Box, Heading, Flex, Button } from "rebass";
import { useState } from "react";
import { MDXProvider } from "@mdx-js/react";

export { Info, Link, Video };

type RefProps = {
  title?: string;
  href?: string;
  level?: string;
  time?: string;
};

export const Ref: React.FC<RefProps> = (props) => (
  <Box>
    <Show if={props.title}>
      <Heading mt={0}>{props.title}</Heading>
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
    {props.href && (
      <Box sx={{ textAlign: "right" }} fontSize={1}>
        ↪ Quelle: <Source href={props.href} />
      </Box>
    )}
  </Box>
);

export const Source: React.FC<{ href: string }> = (props) => {
  const domain = props.href.replace(/^https?:\/\/(?:www\.)?(.*?)\/.*$/, "$1");
  const start = props.href.replace(/^(https?:\/\/(?:www\.)?).*/, "$1");
  return <a href={`${start}${domain}`}>{domain}</a>;
};

export const Show: React.FC<{ if: boolean | string | number | undefined }> = (
  props
) => {
  if (props.if) return <>{props.children}</>;
  else return null;
};

export const Center: React.FC = (props) => (
  <Flex justifyContent="center">{props.children}</Flex>
);

export const Toggle: React.FC = (props) => {
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

export const Include: React.FC<{ toggle: boolean }> = (props) => {
  const Wrapper = props.toggle ? Toggle : () => <div />;
  return (
    <Wrapper>
      <MDXProvider
        components={{
          // eslint-disable-next-line react/display-name
          h1: (props) => <Heading mt={2}>{props.children}</Heading>,
          // eslint-disable-next-line react/display-name
          wrapper: (props) => (
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
