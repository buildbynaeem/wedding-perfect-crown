import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Heart, Wine, Flower2, Sun } from "lucide-react";
import heroImg from "@/assets/hero-como.jpg";

const WEDDING_DATE = new Date("2026-09-24T16:00:00+02:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function WeddingInvitation() {
  return (
    <main className="bg-cream text-ink overflow-x-hidden">
      <Hero />
      <Itinerary />
      <DressCode />
      <RSVP />
      <Footer />
    </main>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = ["Hannah", "&", "Garrett"];
  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 120]) }} className="absolute inset-0">
        <img src={heroImg} alt="Lake Como villa at golden hour" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-sans text-[0.7rem] tracking-[0.5em] uppercase text-white/80"
        >
          Together with their families
        </motion.p>

        <h1 className="mt-8 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 font-serif text-white">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.25 }}
              className={w === "&" ? "italic text-[2.5rem] md:text-[4rem] text-champagne font-normal" : "text-[3.5rem] md:text-[7rem] leading-none font-medium"}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 flex items-center gap-6 font-sans text-[0.65rem] md:text-xs tracking-[0.45em] uppercase text-white/85"
        >
          <span>24 · 09 · 2026</span>
          <span className="h-px w-10 bg-white/50" />
          <span>Lake Como · Italy</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase">Scroll to discover</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Itinerary() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const events = [
    { day: "Friday · Sept 25", title: "Welcome Drinks", time: "7:00 PM", place: "Villa Terrace", icon: Wine },
    { day: "Saturday · Sept 26", title: "The Ceremony", time: "4:30 PM", place: "Lakeside Gardens", icon: Heart },
    { day: "Saturday · Sept 26", title: "Dinner & Dancing", time: "8:00 PM", place: "Grand Pavilion", icon: Sparkles },
    { day: "Sunday · Sept 27", title: "Farewell Brunch", time: "11:00 AM", place: "Boathouse", icon: Sun },
  ];

  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>The Weekend</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl text-ink max-w-3xl">
          Three days on the lake, written for you.
        </h2>

        {/* Countdown */}
        <div className="mt-16 rounded-2xl border border-gray-200 bg-white/40 backdrop-blur-md p-8 md:p-10">
          <p className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-ink/60">Counting down</p>
          <div className="mt-6 grid grid-cols-4 gap-4 md:gap-10">
            {[
              { v: days, l: "Days" },
              { v: hours, l: "Hours" },
              { v: minutes, l: "Minutes" },
              { v: seconds, l: "Seconds" },
            ].map((u) => (
              <div key={u.l} className="flex flex-col items-start">
                <span className="font-serif text-4xl md:text-7xl tabular-nums text-ink leading-none">
                  {String(u.v).padStart(2, "0")}
                </span>
                <span className="mt-3 font-sans text-[0.6rem] md:text-xs tracking-[0.35em] uppercase text-ink/60">
                  {u.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: (i % 2) * 0.1 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:mt-20" : ""}`}
            >
              <div className="flex items-center gap-3 text-forest">
                <e.icon className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-sans text-[0.65rem] tracking-[0.4em] uppercase">{e.day}</span>
              </div>
              <h3 className="mt-4 font-serif text-3xl md:text-4xl text-ink">{e.title}</h3>
              <div className="mt-4 h-px w-16 bg-ink/20" />
              <p className="mt-4 font-sans text-sm text-ink/70">{e.time} · {e.place}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DressCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Gradient top layer
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#cbb98a");
    grad.addColorStop(0.5, "#e7dcc1");
    grad.addColorStop(1, "#9aa78a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle texture noise
    for (let i = 0; i < 1500; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
    }

    ctx.fillStyle = "rgba(40, 40, 35, 0.75)";
    ctx.font = "italic 500 28px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.fillText("Discover the Dress Code", rect.width / 2, rect.height / 2 - 6);
    ctx.font = "300 10px 'Inter', sans-serif";
    ctx.fillStyle = "rgba(40, 40, 35, 0.55)";
    ctx.fillText("✦  SCRATCH TO REVEAL  ✦", rect.width / 2, rect.height / 2 + 22);
  }, []);

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Check reveal threshold
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 40) {
      if (imageData.data[i] === 0) cleared++;
    }
    if (cleared / (imageData.data.length / 40) > 0.5) {
      setRevealed(true);
    }
  }

  function getPos(e: MouseEvent | TouchEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : (e as MouseEvent);
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  return (
    <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-cream to-[#f0ece2]">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Attire</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">A whisper of formality.</h2>
        <p className="mt-4 font-sans text-sm text-ink/60 max-w-xl mx-auto">
          Use your finger or cursor to uncover what to wear.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto mt-12 aspect-[4/3] max-w-xl rounded-lg border border-gray-200 bg-white shadow-[0_30px_80px_-30px_rgba(60,55,40,0.35)]"
          style={{ transform: "rotate(-1.2deg)" }}
        >
          {/* Bottom layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <p className="font-sans text-[0.6rem] tracking-[0.45em] uppercase text-ink/50">The Dress Code</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl italic">Black Tie Elegance</h3>
            <div className="mt-6 h-px w-16 bg-ink/20" />
            <p className="mt-6 font-sans text-sm text-ink/70 leading-relaxed">
              A palette of Lake Como blues, olive greens, and warm champagne.
            </p>
            <div className="mt-6 flex gap-3">
              {["#3b556e", "#6b7a4d", "#d9c79a", "#1f2a33"].map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full rounded-lg cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onMouseDown={(e) => { drawing.current = true; const p = getPos(e); scratch(p.x, p.y); }}
            onMouseMove={(e) => { if (!drawing.current) return; const p = getPos(e); scratch(p.x, p.y); }}
            onMouseUp={() => (drawing.current = false)}
            onMouseLeave={() => (drawing.current = false)}
            onTouchStart={(e) => { drawing.current = true; const p = getPos(e); scratch(p.x, p.y); }}
            onTouchMove={(e) => { if (!drawing.current) return; const p = getPos(e); scratch(p.x, p.y); }}
            onTouchEnd={() => (drawing.current = false)}
          />
        </motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  }
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.4 }}
      className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-ink px-14 py-6 text-white"
    >
      <span className="font-serif italic text-2xl md:text-3xl">RSVP</span>
      <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase opacity-70">Respond by July 1</span>
    </motion.button>
  );
}

function RSVP() {
  const [stage, setStage] = useState<"idle" | "form" | "done">("idle");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    setStage("done");
  }

  return (
    <section className="relative py-40 px-6 md:px-12 bg-forest text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(217,199,154,0.35),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,85,110,0.4),transparent_50%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionLabel className="text-champagne">Your Presence</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl md:text-6xl">Will you join us?</h2>

        <div className="mt-16 flex justify-center">
          <AnimatePresence mode="wait">
            {stage === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
                <MagneticButton onClick={() => setStage("form")}>RSVP</MagneticButton>
              </motion.div>
            )}

            {stage === "form" && (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-lg rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 md:p-10 text-left"
              >
                <Field label="Your name">
                  <input required className="w-full bg-transparent border-b border-white/30 py-2 font-sans text-base focus:outline-none focus:border-champagne transition-colors" />
                </Field>

                <Field label="Attending?">
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {([
                      { v: "yes", l: "Joyfully Accept" },
                      { v: "no", l: "Regretfully Decline" },
                    ] as const).map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => setAttending(o.v)}
                        className={`rounded-full border px-4 py-3 font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 ${attending === o.v ? "bg-champagne text-ink border-champagne" : "border-white/30 text-white/80 hover:border-white"}`}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Dietary restrictions">
                  <input className="w-full bg-transparent border-b border-white/30 py-2 font-sans text-base focus:outline-none focus:border-champagne transition-colors" placeholder="None" />
                </Field>

                <Field label="A song that will get you on the dance floor">
                  <input className="w-full bg-transparent border-b border-white/30 py-2 font-sans text-base focus:outline-none focus:border-champagne transition-colors" placeholder="Artist — Title" />
                </Field>

                <button
                  type="submit"
                  disabled={!attending}
                  className="mt-10 w-full rounded-full bg-champagne text-ink py-4 font-sans text-xs tracking-[0.35em] uppercase disabled:opacity-40 transition-all duration-500 hover:bg-white"
                >
                  Send Reply
                </button>
              </motion.form>
            )}

            {stage === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-12 text-center overflow-hidden"
              >
                <Sparkle delay={0} x="15%" y="25%" />
                <Sparkle delay={0.3} x="80%" y="35%" />
                <Sparkle delay={0.6} x="25%" y="75%" />
                <Sparkle delay={0.9} x="70%" y="70%" />
                <Flower2 className="mx-auto h-10 w-10 text-champagne" strokeWidth={1} />
                <h3 className="mt-6 font-serif text-3xl md:text-4xl italic">Thank you.</h3>
                <p className="mt-4 font-sans text-sm text-white/70 leading-relaxed">
                  Your reply has been received. We can't wait to share the lake with you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Sparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, repeatDelay: 1.5 }}
      className="absolute"
      style={{ left: x, top: y }}
    >
      <Sparkles className="h-4 w-4 text-champagne" />
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-6 block first:mt-0">
      <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-white/60">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-sans text-[0.65rem] tracking-[0.45em] uppercase text-forest ${className}`}>
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer className="py-16 text-center bg-cream">
      <p className="font-serif italic text-2xl text-ink/80">H &middot; G</p>
      <p className="mt-3 font-sans text-[0.6rem] tracking-[0.45em] uppercase text-ink/50">
        Lake Como · 24 September 2026
      </p>
    </footer>
  );
}