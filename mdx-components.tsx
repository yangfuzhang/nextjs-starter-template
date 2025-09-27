import type { MDXComponents } from "mdx/types";

export const customComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 style={{ margin: "24px 0", fontSize: "36px" }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ margin: "20px 0", fontSize: "24px" }}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ margin: "16px 0", fontSize: "16px" }}>{children}</h3>
  ),
  p: ({ children }) => <p style={{ margin: "16px 0" }}>{children}</p>,
  ul: ({ children }) => (
    <ul style={{ margin: "16px 0", paddingLeft: "20px" }}>{children}</ul>
  ),
  a: ({ children, href }) => (
    <a
      style={{
        color: "oklch(0.6559 0.2118 354.308)",
        textDecoration: "underline",
      }}
      href={href}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong
      style={{ fontWeight: "bold", color: "oklch(0.6559 0.2118 354.308)" }}
    >
      {children}
    </strong>
  ),
  blockquote: ({ children }) => <blockquote style={{}}>{children}</blockquote>,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
