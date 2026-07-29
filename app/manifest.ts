import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STONE'S TRIPS",
    short_name: "STONE'S TRIPS",
    description: "Amsterdam & Belgium Travel Guide",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1eb",
    theme_color: "#18324f",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}