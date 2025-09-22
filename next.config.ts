import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withPlaiceholder(nextConfig));
