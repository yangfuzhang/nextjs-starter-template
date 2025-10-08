import { MDXRemote } from "next-mdx-remote-client/rsc";
import { customComponents } from "@/mdx-components";

export function Content({ content }: { content: string }) {
  return <MDXRemote source={content} components={customComponents} />;
}
