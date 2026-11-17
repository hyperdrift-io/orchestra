const BASE_URL = "https://hyperdrift.io";

type RobotsOutput = {
  rules:
    | {
        userAgent: string;
        allow?: string[];
        disallow?: string[];
      }
    | Array<{
        userAgent: string;
        allow?: string[];
        disallow?: string[];
      }>;
  sitemap: string;
  host: string;
};

export default function robots(): RobotsOutput {
  if (process.env.MIGRATION_PREVIEW === 'true') return {rules:{userAgent:"*",disallow:["/"]},sitemap:`${BASE_URL}/sitemap.xml`,host:BASE_URL};
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/api", "/traction/invitation/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}