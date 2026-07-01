import { useState } from "react";
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/wedding/WeddingInvitation";
import { VideoEntrance } from "@/components/wedding/VideoEntrance";
import { LanguageProvider } from "@/lib/language-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Prince Ian & Seong Hui-ju — Wedding Invitation" },
      { name: "description", content: "Join us for the wedding of Grand Prince Ian and Seong Hui-ju at Jujak Palace, Korea on October 18, 2026." },
      { property: "og:title", content: "Grand Prince Ian & Seong Hui-ju — Wedding Invitation" },
      { property: "og:description", content: "Join us for the wedding of Grand Prince Ian and Seong Hui-ju at Jujak Palace, Korea on October 18, 2026." },
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
        <WeddingInvitation hasEntered={isOpened} />
      </motion.div>
    </LanguageProvider>
  );
}
