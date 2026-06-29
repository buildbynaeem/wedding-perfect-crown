import { useState } from "react";
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";
import { VideoEntrance } from "@/components/wedding/VideoEntrance";
import { LanguageProvider } from "@/lib/language-context";
import { LanguageToggle } from "@/components/wedding/LanguageToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nam-jun & Ji-yeon — 18.10.2026" },
      { name: "description", content: "Two Eras. One Eternity. The wedding of Heo Nam-jun and Lim Ji-yeon, October 18, 2026 — Seoul." },
      { property: "og:title", content: "Nam-jun & Ji-yeon — 18.10.2026" },
      { property: "og:description", content: "Two Eras. One Eternity. The wedding of Heo Nam-jun and Lim Ji-yeon, October 18, 2026 — Seoul." },
    ],
  }),
  component: Index,
});

function Index() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <LanguageProvider>
      {!isOpened && <VideoEntrance onVideoEnd={() => setIsOpened(true)} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpened ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <WeddingInvitation />
      </motion.div>
      <LanguageToggle />
    </LanguageProvider>
  );
}
