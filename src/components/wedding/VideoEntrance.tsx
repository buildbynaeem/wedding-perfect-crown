
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface VideoEntranceProps {
  onVideoEnd: () => void;
}

export function VideoEntrance({ onVideoEnd }: VideoEntranceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (!isPlaying && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch((err) => console.error("Error playing video:", err));
    }
  };

  const handleVideoEnd = () => {
    onVideoEnd();
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black cursor-pointer"
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src="/Envelope.webm"
        playsInline
        muted
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
      />
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isPlaying ? 0 : [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2, 
          repeat: isPlaying ? 0 : Infinity, 
          ease: "easeInOut" 
        }}
      >
        <span
          className="font-sans text-[0.8rem] tracking-[0.5em] uppercase"
          style={{
            color: "#d4af5a",
            textShadow: "0 0 10px rgba(212,175,90,0.6)"
          }}
        >
          Tap to Open
        </span>
      </motion.div>
    </div>
  );
}
