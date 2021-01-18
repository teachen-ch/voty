import { MDXProvider } from "@mdx-js/react";
import { Heading, Link, Text } from "rebass";
import Glossar from "pages/content/glossar.mdx";
import React, { ReactElement, ReactNode, useState } from "react";

const glossary = parseGlossary();

export const Glossary: React.FC = () => (
  <MDXProvider
    components={{
      h2: GlossaryTerm,
      p: GlossaryText,
    }}
  >
    <Glossar />
  </MDXProvider>
);

/**
 * glossaryReplace replaces glossary terms with <GlossaryLinks/>
 * It either matches @terms or @terms(with display text)
 */
export const glossaryReplace = (
  str: string,
  bg?: string,
  color?: string
): ReactNode => {
  // can't use \w, as it does not catch umlauts: [\u00C0-\u017FA-Za-z]
  const searchTerm = RegExp(/\B@([\u00C0-\u017FA-Za-z]+)(?:\((.*?)\))?/);
  if (!searchTerm.exec(str)) {
    return str;
  }
  const children = [];
  let match: RegExpMatchArray | null;
  while ((match = searchTerm.exec(str))) {
    // push everything before match as a string
    children.push(str.substr(0, match.index));
    // push a generated link with the match
    children.push(
      <GlossaryLink
        bg={bg}
        color={color}
        term={match[1]}
        text={match[2] || match[1]}
      />
    );
    // continue with rest of the string after match
    str = str.substr(Number(match.index) + match[0].length);
  }
  children.push(str);
  return children;
};

export const GlossaryReplace: React.FC<{ bg?: string; color?: string }> = ({
  bg,
  color,
  children,
}) => {
  const deepReplace = (children: ReactNode): ReactNode =>
    React.Children.map(
      children,
      (child): ReactNode => {
        if (!child || typeof child === "number") return child;
        if (typeof child === "string") return glossaryReplace(child, bg, color);
        if (typeof child === "object" && "props" in child) {
          if (child.props.children) {
            const children = deepReplace(child.props.children);
            return React.cloneElement(child, { children });
          }
          if (typeof child.type === "function") {
            // TODO: this does not work yet, e.g. with MDX files
            // do we have to evalute the function?
            return child;
          }
        }
        return child;
      }
    );
  return <>{deepReplace(children)}</>;
};

export const GlossaryLink: React.FC<{
  term: string;
  text?: string;
  bg?: string;
  color?: string;
}> = ({ term, text, bg = "lightgray", color = "black" }) => {
  const [show, setShow] = useState(false);
  function toggle() {
    setShow(!show);
  }
  return (
    <Text
      as="span"
      sx={{ position: ["initial", "initial"] }}
      display="inline-block"
    >
      <Link
        onClick={toggle}
        onMouseOver={toggle}
        onMouseOut={() => setShow(false)}
        sx={{
          borderBottom: "1px dotted",
          textDecoration: "none !important",
          ":hover": {
            borderBottom: "5px dotted",
          },
        }}
      >
        {text || term}
      </Link>
      <Text
        as="span"
        mx={[3, 3, 4]}
        display={show ? "block" : "none"}
        sx={{ position: "absolute", zIndex: 10, left: [0, 0] }}
        bg={bg}
        color={color}
        mt={1}
        p={3}
        fontSize={1}
        width={["calc(100% - 32px)", "calc(100% - 32px)", "calc(100% - 64px)"]}
      >
        <b>{term}: </b>
        {getGlossary(term)}
      </Text>
    </Text>
  );
};

export const GlossaryEntry: React.FC<{ term: string }> = ({ term }) => (
  <>
    <GlossaryTerm>{term}</GlossaryTerm>
    <GlossaryText>{getGlossary(term)}</GlossaryText>
  </>
);

export const GlossaryTerm: React.FC = (props) => (
  <Heading mt={4} mb={2} fontSize={2} id={String(props.children)}>
    {props.children}
  </Heading>
);

export const GlossaryText: React.FC = (props) => (
  <Text fontSize={1} ml={0} pl={3} sx={{ borderLeft: "4px solid gray" }}>
    {props.children}
  </Text>
);

function getGlossary(term: string) {
  return glossary[term];
}

function parseGlossary() {
  const glossary: Record<string, string> = {};
  let term = "";
  const elements = Glossar({}).props.children as ReactElement[];
  elements.map((el: ReactElement) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { mdxType: type, children: text } = el.props;
    if (type === "h2") {
      term = text as string;
      if (text) {
        glossary[term] = "";
      }
    }
    if (type === "p") {
      if (term) {
        glossary[term] = text as string;
      }
    }
  });
  return glossary;
}
