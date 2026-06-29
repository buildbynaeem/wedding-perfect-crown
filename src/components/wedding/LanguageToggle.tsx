
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <div className="flex items-center p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 relative cursor-pointer w-[90px] h-[40px]">
        <motion.div
          className="absolute inset-y-1 w-[40px] bg-white rounded-full z-0"
          animate={{ x: language === "EN" ? 4 : 46 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
        <div className="flex-1 flex items-center justify-center text-sm font-bold z-10 relative transition-colors duration-300">
          <span className={language === "EN" ? "text-black" : "text-white/60"}>
            EN
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-sm font-bold z-10 relative transition-colors duration-300">
          <span className={language === "KO" ? "text-black" : "text-white/60"}>
            KO
          </span>
        </div>
      </div>
    </button>
  );
}
