import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Gift } from "lucide-react";
import heroImg from "@/assets/hero-namjun.jpg";

const WEDDING_DATE = new Date("2026-10-18T17:00:00+09:00");

function useCountdown(target: Date) {
  // Start at 0 on SSR/first paint to avoid hydration mismatch; then tick.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target.getTime() - now);
  return {
    ready: now !== null,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function WeddingInvitation() {
  return (
    <main className="bg-obsidian text-white overflow-x-hidden">
      <Hero />
      <Timeline />
      <DressCode />
      <RSVP />
      <Footer />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const letters = "Nam-jun  &  Ji-yeon".split("");

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_85%)]" />
      </motion.div>

      {/* Thin gold frame */}
      <div className="pointer-events-none absolute inset-6 border border-gold-deep/40" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="flex items-center gap-4 text-gold"
        >
          <span className="h-px w-10 bg-gold/60" />
          <span className="font-sans text-[0.62rem] tracking-[0.55em] uppercase">Joseon · Seoul · MMXXVI</span>
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>

        <h1 className="mt-10 flex flex-wrap justify-center font-serif text-white">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.05 }}
              className={`inline-block leading-none ${
                ch === "&" ? "text-gold italic mx-2 text-4xl md:text-6xl" : "text-5xl md:text-8xl"
              } ${ch === " " ? "w-2 md:w-3" : ""}`}
              style={{ fontWeight: 300 }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="mt-10 font-serif italic text-lg md:text-xl text-white/75 tracking-wide"
        >
          Two Eras. One Eternity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-12 flex items-center gap-5 font-sans text-[0.6rem] md:text-xs tracking-[0.5em] uppercase text-gold/80"
        >
          <span>18 · 10 · 2026</span>
          <span className="h-px w-8 bg-gold/40" />
          <span>The Shilla, Seoul</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gold/80"
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
          style={{ filter: "drop-shadow(0 0 8px rgba(212,175,90,0.6))" }}
        >
          <span className="font-sans text-[0.6rem] tracking-[0.45em] uppercase">Scroll to Enter</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- TIMELINE + COUNTDOWN ---------------- */
function Timeline() {
  const { days, hours, minutes, seconds, ready } = useCountdown(WEDDING_DATE);
  const events = [
    { day: "Friday · Oct 16", title: "The Rehearsal", korean: "예행 연습", time: "7:00 PM", place: "Garden Pavilion, The Shilla" },
    { day: "Saturday · Oct 17", title: "Tea Ceremony", korean: "다례", time: "11:00 AM", place: "Private Salon" },
    { day: "Sunday · Oct 18", title: "The Grand Ceremony", korean: "본 예식", time: "5:00 PM", place: "The Shilla, Yeong Bin Gwan" },
    { day: "Sunday · Oct 18", title: "The Afterparty", korean: "애프터파티", time: "10:00 PM", place: "Rooftop, Seoul Skyline" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-12 bg-obsidian">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>The Fate Timeline</SectionLabel>
        <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white max-w-3xl" style={{ fontWeight: 300 }}>
          A weekend written in <span className="italic text-gold">gold</span>.
        </h2>

        {/* Countdown — neon glow */}
        <div className="mt-16 rounded-sm border border-gold-deep/30 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,90,0.08),transparent_60%)]" />
          <p className="font-sans text-[0.6rem] tracking-[0.5em] uppercase text-gold/80">Until We Begin</p>
          <div className="mt-8 grid grid-cols-4 gap-3 md:gap-10 tabular-nums">
            {[
              { v: days, l: "Days" },
              { v: hours, l: "Hours" },
              { v: minutes, l: "Minutes" },
              { v: seconds, l: "Seconds" },
            ].map((u) => (
              <div key={u.l} className="flex flex-col">
                <span
                  className="font-serif text-5xl md:text-8xl text-white leading-none"
                  style={{ fontWeight: 300, textShadow: ready ? "0 0 24px rgba(212,175,90,0.35)" : "none" }}
                >
                  {ready ? String(u.v).padStart(2, "0") : "00"}
                </span>
                <span className="mt-4 font-sans text-[0.55rem] md:text-[0.65rem] tracking-[0.45em] uppercase text-white/50">
                  {u.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical timeline */}
        <div ref={ref} className="relative mt-28 pl-10 md:pl-0">
          {/* base line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gold-deep/20 md:-translate-x-1/2" />
          {/* animated fill */}
          <motion.div
            style={{ height: lineH }}
            className="absolute left-3 md:left-1/2 top-0 w-px bg-gradient-to-b from-gold to-gold-deep md:-translate-x-1/2"
          />

          <div className="space-y-20 md:space-y-32">
            {events.map((e, i) => (
              <TimelineRow key={e.title} event={e} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ event: e, index }: { event: { day: string; title: string; korean: string; time: string; place: string }; index: number }) {
  const left = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16 items-center"
    >
      {/* node */}
      <div className="absolute left-3 md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-6 md:top-1/2">
        <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_16px_rgba(212,175,90,0.8)]" />
      </div>

      <div className={`pl-8 md:pl-0 ${left ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"}`}>
        <p className="font-sans text-[0.6rem] tracking-[0.45em] uppercase text-gold/80">{e.day}</p>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl text-white" style={{ fontWeight: 300 }}>{e.title}</h3>
        <p className="mt-2 font-korean text-base text-white/40">{e.korean}</p>
        <div className={`mt-5 h-px w-12 bg-gold-deep/60 ${left ? "md:ml-auto" : ""}`} />
        <p className="mt-5 font-sans text-sm text-white/60">{e.time} · {e.place}</p>
      </div>
    </motion.div>
  );
}

/* ---------------- DRESS CODE ---------------- */
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

    // Obsidian gradient base
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#0b0b10");
    grad.addColorStop(0.5, "#1a1410");
    grad.addColorStop(1, "#0b0b10");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle noise
    for (let i = 0; i < 2500; i++) {
      ctx.fillStyle = `rgba(212,175,90,${Math.random() * 0.06})`;
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
    }

    // Gold border inside card
    ctx.strokeStyle = "rgba(212,175,90,0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, rect.width - 28, rect.height - 28);

    // Gold foil typography
    const goldGrad = ctx.createLinearGradient(0, rect.height / 2 - 20, 0, rect.height / 2 + 20);
    goldGrad.addColorStop(0, "#f5d97a");
    goldGrad.addColorStop(0.5, "#d4af5a");
    goldGrad.addColorStop(1, "#8a6a2a");
    ctx.fillStyle = goldGrad;
    ctx.textAlign = "center";
    ctx.font = "300 italic 30px 'Cormorant Garamond', serif";
    ctx.fillText("Reveal the Dress Code", rect.width / 2, rect.height / 2 - 8);

    ctx.fillStyle = "rgba(212,175,90,0.55)";
    ctx.font = "300 9px 'Inter', sans-serif";
    ctx.fillText("◆  S C R A T C H   T O   R E V E A L  ◆", rect.width / 2, rect.height / 2 + 24);
  }, []);

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    let sampled = 0;
    for (let i = 3; i < data.data.length; i += 60) {
      sampled++;
      if (data.data[i] === 0) cleared++;
    }
    if (cleared / sampled > 0.5) setRevealed(true);
  }

  function pos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const p = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    return { x: p.clientX - rect.left, y: p.clientY - rect.top };
  }

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-12 bg-black">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Attire</SectionLabel>
        <h2 className="mt-6 font-serif text-4xl md:text-5xl text-white" style={{ fontWeight: 300 }}>
          A code, <span className="italic text-gold">sealed in gold</span>.
        </h2>
        <p className="mt-4 font-sans text-sm tracking-wide text-white/50 max-w-md mx-auto">
          Drag across the card to reveal what to wear.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative mx-auto mt-14 aspect-[1.6/1] max-w-lg rounded-sm border border-gold-deep/40 bg-[#0a0a0d] shadow-[0_50px_120px_-30px_rgba(212,175,90,0.25)]"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          {/* VIP card decorative corners */}
          <span className="absolute top-3 left-3 font-sans text-[0.55rem] tracking-[0.4em] text-gold/60">VIP · 001</span>
          <span className="absolute top-3 right-3 font-sans text-[0.55rem] tracking-[0.4em] text-gold/60">N · J</span>

          {/* Bottom layer: revealed content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <p className="font-sans text-[0.55rem] tracking-[0.5em] uppercase text-gold/70">The Dress Code</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl italic text-white" style={{ fontWeight: 300 }}>
              Black Tie<span className="text-gold"> · </span>or Hanbok
            </h3>
            <p className="mt-2 font-korean text-sm text-white/40">정장 또는 한복</p>
            <div className="mt-6 h-px w-16 bg-gold-deep/60" />
            <p className="mt-6 font-sans text-sm text-white/65 leading-relaxed max-w-xs">
              Palette: Obsidian, Gold, and Deep Crimson.
            </p>
            <div className="mt-5 flex gap-3">
              {["#0a0a0a", "#d4af5a", "#6e1a1a", "#1a1a24"].map((c) => (
                <span key={c} className="h-5 w-5 rounded-full border border-gold-deep/40" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full rounded-sm cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onMouseDown={(e) => { drawing.current = true; const p = pos(e); scratch(p.x, p.y); }}
            onMouseMove={(e) => { if (!drawing.current) return; const p = pos(e); scratch(p.x, p.y); }}
            onMouseUp={() => (drawing.current = false)}
            onMouseLeave={() => (drawing.current = false)}
            onTouchStart={(e) => { drawing.current = true; const p = pos(e); scratch(p.x, p.y); }}
            onTouchMove={(e) => { if (!drawing.current) return; const p = pos(e); scratch(p.x, p.y); }}
            onTouchEnd={() => (drawing.current = false)}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- RSVP ---------------- */
function MagneticButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setP({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
      }}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 140, damping: 14, mass: 0.4 }}
      className="group relative inline-flex flex-col items-center justify-center rounded-full border border-gold px-16 py-7 text-white overflow-hidden"
      style={{ background: "radial-gradient(circle at center, rgba(212,175,90,0.15), transparent 70%)" }}
    >
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gold/10" />
      <span className="relative font-serif italic text-3xl md:text-4xl text-gold" style={{ fontWeight: 300, textShadow: "0 0 24px rgba(212,175,90,0.5)" }}>
        {children}
      </span>
      <span className="relative mt-2 font-sans text-[0.55rem] tracking-[0.5em] uppercase text-white/60">
        Respond by Sept 1
      </span>
    </motion.button>
  );
}

function RSVP() {
  const [stage, setStage] = useState<"idle" | "form" | "done">("idle");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [gift, setGift] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    setStage("done");
  }

  return (
    <section className="relative py-40 px-6 md:px-12 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,90,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(110,26,26,0.25),transparent_55%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionLabel>Your Presence</SectionLabel>
        <h2 className="mt-6 font-serif text-4xl md:text-6xl text-white" style={{ fontWeight: 300 }}>
          Will you stand with us?
        </h2>
        <p className="mt-4 font-korean text-base text-white/50">함께 해주시겠습니까</p>

        <div className="mt-16 flex justify-center min-h-[420px] items-center">
          <AnimatePresence mode="wait">
            {stage === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.7 }}>
                <MagneticButton onClick={() => setStage("form")}>RSVP</MagneticButton>
              </motion.div>
            )}

            {stage === "form" && (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-lg rounded-sm border border-gold-deep/40 bg-white/[0.03] backdrop-blur-md p-8 md:p-10 text-left"
              >
                <Field label="Your Name">
                  <input required className="w-full bg-transparent border-b border-gold-deep/40 py-2 font-sans text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors duration-700" />
                </Field>

                <Field label="Attending?">
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {([
                      { v: "yes", l: "Accept" },
                      { v: "no", l: "Decline" },
                    ] as const).map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => setAttending(o.v)}
                        className={`rounded-full border px-4 py-3 font-sans text-[0.6rem] tracking-[0.4em] uppercase transition-all duration-700 ${
                          attending === o.v
                            ? "bg-gold text-black border-gold shadow-[0_0_24px_rgba(212,175,90,0.4)]"
                            : "border-gold-deep/40 text-white/70 hover:border-gold hover:text-gold"
                        }`}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Dietary Restrictions">
                  <input className="w-full bg-transparent border-b border-gold-deep/40 py-2 font-sans text-base text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors duration-700" placeholder="None" />
                </Field>

                <Field label="Preferred Welcome Gift">
                  <div className="relative">
                    <select
                      value={gift}
                      onChange={(e) => setGift(e.target.value)}
                      className="w-full appearance-none bg-transparent border-b border-gold-deep/40 py-2 pr-8 font-sans text-base text-white focus:outline-none focus:border-gold transition-colors duration-700"
                    >
                      <option value="" className="bg-obsidian">Select a gift</option>
                      <option value="tea" className="bg-obsidian">Heirloom Tea Set</option>
                      <option value="silk" className="bg-obsidian">Hand-woven Silk Scarf</option>
                      <option value="perfume" className="bg-obsidian">Custom Hanbang Perfume</option>
                      <option value="celadon" className="bg-obsidian">Celadon Keepsake</option>
                    </select>
                    <Gift className="absolute right-1 top-3 h-4 w-4 text-gold/70 pointer-events-none" strokeWidth={1.2} />
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={!attending}
                  className="mt-10 w-full rounded-full border border-gold bg-gold/10 text-gold py-4 font-sans text-[0.6rem] tracking-[0.45em] uppercase disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-700 hover:bg-gold hover:text-black"
                >
                  Send Reply
                </button>
              </motion.form>
            )}

            {stage === "done" && <ThankYou />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ThankYou() {
  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full max-w-lg rounded-sm border border-gold-deep/50 bg-white/[0.03] backdrop-blur-md p-12 text-center overflow-hidden"
    >
      {/* Gold particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
      <Sparkles className="mx-auto h-8 w-8 text-gold" strokeWidth={1} />
      <h3 className="relative mt-6 font-serif text-4xl italic text-white" style={{ fontWeight: 300 }}>Thank you.</h3>
      <p className="relative mt-3 font-korean text-base text-gold/80">감사합니다</p>
      <p className="relative mt-6 font-sans text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
        Your reply has been received. We will see you in Seoul.
      </p>
    </motion.div>
  );
}

function Particle({ index }: { index: number }) {
  const left = (index * 37) % 100;
  const delay = (index % 7) * 0.4;
  const size = 2 + (index % 3);
  return (
    <motion.span
      className="absolute rounded-full bg-gold"
      style={{ left: `${left}%`, bottom: 0, width: size, height: size, boxShadow: "0 0 8px rgba(212,175,90,0.8)" }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -260, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 5 + (index % 4), delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-7 block first:mt-0">
      <span className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-gold/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-gold">
      <span className="h-px w-8 bg-gold/50" />
      <span className="font-sans text-[0.6rem] tracking-[0.55em] uppercase">{children}</span>
      <span className="h-px w-8 bg-gold/50" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-20 text-center bg-black border-t border-gold-deep/20">
      <p className="font-serif italic text-3xl text-gold" style={{ fontWeight: 300, textShadow: "0 0 18px rgba(212,175,90,0.4)" }}>
        N &middot; J
      </p>
      <p className="mt-4 font-korean text-sm text-white/40">남준 · 지연</p>
      <p className="mt-3 font-sans text-[0.55rem] tracking-[0.5em] uppercase text-white/40">
        Seoul · 18 October 2026
      </p>
    </footer>
  );
}