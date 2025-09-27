import { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withNextIntl(withPlaiceholder(withMDX(nextConfig)));
