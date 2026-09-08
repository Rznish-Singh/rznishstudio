import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

const withMDX = createMDX({ extension: /\.mdx?$/ });
const config = withMDX(nextConfig);

// Sentry wraps the build for source-map upload + tunneling.
// Skipped automatically in local dev when SENTRY_AUTH_TOKEN is unset.
export default withSentryConfig(
  config,
  { silent: true, org: process.env.SENTRY_ORG, project: process.env.SENTRY_PROJECT },
  {
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);
