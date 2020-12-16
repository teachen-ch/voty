declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export const meta: Record<string, any>;
  export default MDXComponent;
}

declare module "@mdx-js/react" {
  import * as React from "react";
  type ComponentType =
    | "a"
    | "blockquote"
    | "code"
    | "del"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "hr"
    | "img"
    | "inlineCode"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "strong"
    | "sup"
    | "table"
    | "td"
    | "thematicBreak"
    | "tr"
    | "wrapper"
    | "ul";
  export type Components = {
    [key in ComponentType]?: React.ComponentType<any>;
  };
  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}

declare module "@mdx-js/runtime" {
  export interface MDXProps {
    children: React.ReactNode;
    components?: Components;
    scope?: Record<string, any>;
  }
  export default class MDX extends React.Component<MDXProps> {}
}
