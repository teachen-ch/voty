// TODO: this is a joke markdown parser after being frustrated with mdx-js
export function parseMarkdown(str: string): string {
  str = str.replace(/^\s*#\s+(.*?)$/gm, "<h1>$1</h1>");
  str = str.replace(/^\s*##\s+(.*?)$/gm, "<h2>$1</h2>");
  str = str.replace(/^\s*###\s+(.*?)$/gm, "<h3>$1</h3>");
  str = str.replace(/^\s*####\s+(.*?)$/gm, "<h4>$1</h4>");
  str = str.replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>");
  str = str.replace(/\n/g, "<br/>");
  str = str.replace(/(<\/h\d>)<br\/>\s*/g, "$1");
  str = str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return str;
}

export function parseMarkdownInner(str: string): { __html: string } {
  return { __html: parseMarkdown(str) };
}
