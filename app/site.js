export const siteName = "Zevel & Co.";
export const siteTitle = "Zevel & Co. — Premium Jewelry for the Modern World";
export const siteDescription =
  "Zevel & Co. crafts premium gold and diamond jewelry for the modern world, including necklaces, pendants, bracelets, and rings. Official store coming soon.";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const ogImage = {
  url: "/images/yellow-gold-box-chain-round-diamond-pendant-necklace.webp",
  width: 1200,
  height: 1200,
  alt: "Zevel & Co. yellow gold box chain necklace with a round diamond pendant",
};
