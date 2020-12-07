declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export const meta: Record<string, any>;
  export default MDXComponent;
}
