import { siteDescription, siteName, siteTitle } from "./site";

export default function manifest() {
  return {
    name: siteTitle,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en",
    icons: [
      {
        src: "/favicon.webp",
        type: "image/webp",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
