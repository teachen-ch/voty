import { Info } from "components/Info";
import Link from "next/link";
import Video from "components/Video";
import {
  Box,
  Text,
  Heading,
  Flex,
  Button,
  Image as RImage,
  ImageProps,
  FlexProps,
} from "rebass";
import { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ReadMore } from "components/ReadMore";
import { CircleBullet } from "components/Misc";
import { useUser } from "state/user";

export { Info, Link, Video, ReadMore, CircleBullet };

type RefProps = {
  title?: string;
  href?: string;
  source?: string;
  level?: string;
  duration?: string;
};

export const Ref: React.FC<React.PropsWithChildren<RefProps>> = (props) => (
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
    <Show if={props.duration}>
      <strong>Dauer:</strong> {props.duration}
      <br />
    </Show>
    {props.children}
    {props.source && (
      <Box sx={{ textAlign: "right" }} fontSize={1}>
        ↪ Quelle: <Source href={props.source} />
      </Box>
    )}
  </Box>
);

export const Source: React.FC<React.PropsWithChildren<{ href: string }>> = (props) => {
  const domain = props.href.replace(/^https?:\/\/(?:www\.)?(.*?)\/.*$/, "$1");
  const start = props.href.replace(/^(https?:\/\/(?:www\.)?).*/, "$1");
  return <a href={`${start}${domain}`}>{domain}</a>;
};

export const Show: React.FC<React.PropsWithChildren<{ if: boolean | string | number | undefined }>> = (
  props
) => {
  if (props.if) return <>{props.children}</>;
  else return null;
};

export const Center: React.FC<React.PropsWithChildren<FlexProps>> = (props) => (
  <Flex justifyContent="center" {...props}>
    {props.children}
  </Flex>
);

export const Toggle: React.FC<React.PropsWithChildren<unknown>> = (props) => {
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

export const Include: React.FC<React.PropsWithChildren<{ toggle: boolean }>> = (props) => {
  const Wrapper = props.toggle ? Toggle : () => <div />;
  return (
    <Wrapper>
      <MDXProvider
        components={{
          // eslint-disable-next-line react/display-name
          h1: (props) => <Heading mt={2}>{props.children}</Heading>,
          // eslint-disable-next-line react/display-name
          wrapper: (props) => (
            <Box my={2} p={3} bg="white" color="black">
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

export const Image: React.FC<React.PropsWithChildren<ImageProps & { desc: string }>> = (props) => (
  <Box>
    {/* @ts-ignore */}
    <RImage {...props} alt={props.alt || props.desc} />
    {props.desc && (
      <Text fontSize={1} width="100%" textAlign="right">
        {props.desc}
      </Text>
    )}
  </Box>
);

export const WarningGuest: React.FC<React.PropsWithChildren<{ text: string }>> = ({ text }) => {
  const user = useUser();
  if (!user) {
    return (
      <Info type="important">
        <Text>{text}</Text>
      </Info>
    );
  } else return null;
};
