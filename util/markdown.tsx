import ReactMarkdown from "react-markdown";
import { Image } from "rebass";
import gfm from "remark-gfm";
import remarkImage from "remark-images";

export const Markdown: React.FC<{ children?: string }> = ({ children }) => (
  <ReactMarkdown
    plugins={[gfm, remarkImage]}
    renderers={{
      // eslint-disable-next-line react/display-name
      image: ({ src, alt }: { src: string; alt: string }) => (
        <Image
          maxHeight="300px"
          maxWidth="100%"
          sx={{ border: "10px solid white", borderRadius: 10 }}
          src={src}
          alt={alt}
          display="block"
        />
      ),
    }}
  >
    {String(children)}
  </ReactMarkdown>
);

// This is left for posteriority. it uses dangerouslySetInnerHTML...

export const MarkdownJoke: React.FC = ({ children }) => (
  <div
    dangerouslySetInnerHTML={parseMarkdownInner(String(children))}
    style={{ textAlign: "left" }}
  />
);
// TODO: this is a joke markdown parser after being frustrated with mdx-js
// what out, it has one feature, which we need to preserve, once we replace this
// image urls such as https://voty.ch/content/aristoteles.jpg will automatically
// be converted to an image for convenience.
function parseMarkdown(str: string): string {
  str = str.replace(/^\s*#\s+(.*?)$/gm, "<h1>$1</h1>");
  str = str.replace(/^\s*##\s+(.*?)$/gm, "<h2>$1</h2>");
  str = str.replace(/^\s*###\s+(.*?)$/gm, "<h3>$1</h3>");
  str = str.replace(/^\s*####\s+(.*?)$/gm, "<h4>$1</h4>");
  str = str.replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>");
  str = str.replace(/\*\*(.*?)\*\*/gm, "<b>$1</b>");
  str = str.replace(/\*(.*?)\*/gm, "<i>$1</i>");
  str = str.replace(/\n/g, "<br/>");
  str = str.replace(
    /!\[(.*?)\]\(([^\s]*?)\)/g,
    "<img src='$2' alt='$1' class='markdownImage'/>"
  );
  str = str.replace(/(<\/h\d>)<br\/>\s*/g, "$1");
  str = str.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2'>$1</a>");
  // direct image urls:
  str = str.replace(
    /(https?:\/\/.*?(?:jpe?g|png|gif))/gim,
    "<img src='$1' class='markdownImage'/>"
  );
  return str;
}

function parseMarkdownInner(str: string): { __html: string } {
  return { __html: parseMarkdown(str) };
}
