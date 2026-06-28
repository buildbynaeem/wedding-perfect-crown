import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hannah & Garrett — Lake Como, 24.09.2026" },
      { name: "description", content: "An invitation to the wedding of Hannah & Garrett on the shores of Lake Como, September 24, 2026." },
      { property: "og:title", content: "Hannah & Garrett — Lake Como, 24.09.2026" },
      { property: "og:description", content: "An invitation to the wedding of Hannah & Garrett on the shores of Lake Como, September 24, 2026." },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvitation />;
}
