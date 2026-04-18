import { MDXProvider } from "@mdx-js/react";
import { Heading, Link, Text } from "components/ui";
import Glossar from "pages/content/glossar.mdx";
import glossarSource from "pages/content/glossar.mdx?raw";
import React, { ReactNode, useState } from "react";

const glossary = parseGlossary();

export const Glossary: React.FC<React.PropsWithChildren<unknown>> = () => (
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
  const searchTerm = RegExp(/\B@([\u00C0-\u017FA-Za-z]+)(?:\((.*?)\))?/);
  if (!searchTerm.exec(str)) {
    return str;
  }
  const children = [];
  let match: RegExpMatchArray | null;
  while ((match = searchTerm.exec(str))) {
    children.push(str.substr(0, match.index));
    children.push(
      <GlossaryLink
        bg={bg}
        color={color}
        term={match[1]}
        text={match[2] || match[1]}
      />
    );
    str = str.substr(Number(match.index) + match[0].length);
  }
  children.push(str);
  return children;
};

export const GlossaryReplace: React.FC<React.PropsWithChildren<{ bg?: string; color?: string }>> = ({
  bg = "#444",
  color = "#fff",
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
            return child;
          }
        }
        return child;
      }
    );
  return <>{deepReplace(children)}</>;
};

export const GlossaryLink: React.FC<React.PropsWithChildren<{
  term: string;
  text?: string;
  bg?: string;
  color?: string;
}>> = ({ term, text, bg = "lightgray", color = "black", children }) => {
  const [show, setShow] = useState(false);
  function toggle() {
    setShow(!show);
  }

  return (
    <span className="inline-block">
      <Link
        onClick={toggle}
        onMouseOver={toggle}
        onMouseOut={() => setShow(false)}
        className="border-b border-dotted no-underline! hover:border-b hover:border-solid"
        style={{ borderBottomColor: show ? bg : undefined }}
      >
        {text || term}
      </Link>
      <span
        className={`mx-4 sm:mx-8 ${show ? "block" : "hidden"} absolute z-10 left-0 mt-1 p-4 text-sm w-[calc(100%-32px)] sm:w-[calc(100%-64px)]`}
        style={{ backgroundColor: bg, color }}
      >
        <b>{term}: </b>
        {children || getGlossary(term)}
      </span>
    </span>
  );
};

export const GlossaryEntry: React.FC<React.PropsWithChildren<{ term: string }>> = ({ term }) => (
  <>
    <GlossaryTerm>{term}</GlossaryTerm>
    <GlossaryText>{getGlossary(term)}</GlossaryText>
  </>
);

export const GlossaryTerm: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <Heading className="mt-8 mb-2 text-base" id={String(props.children)}>
    {props.children}
  </Heading>
);

export const GlossaryText: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <Text className="text-sm ml-0 pl-4 border-l-4 border-l-gray-400">
    {props.children}
  </Text>
);

function getGlossary(term: string) {
  const missing =
    "Dieser Eintrag wurde im Glossar noch nicht erfasst. Magst du den Begriff in 1-2 Sätzen erklären 👉 glossar@voty.ch";
  return glossary[term] || missing;
}

function parseGlossary() {
  const glossary: Record<string, string> = {};
  let term = "";
  for (const line of glossarSource.split("\n")) {
    const match = line.match(/^##\s+(.*)$/);
    if (match) {
      term = match[1].trim();
      glossary[term] = "";
    } else if (term && line.trim()) {
      glossary[term] = glossary[term]
        ? `${glossary[term]} ${line.trim()}`
        : line.trim();
    }
  }
  return glossary;
}
