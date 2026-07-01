import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Crown, Music } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function WeddingInvitation({ hasEntered }: { hasEntered: boolean }) {
  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      <Hero hasEntered={hasEntered} />
      <SecretReveal />
      <Schedule />
      <Gallery />
      <RoyalDecree />
      <Footer />
      <MusicToggle hasEntered={hasEntered} />
      <LanguageSelector />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ hasEntered }: { hasEntered: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();

  const text = {
    EN: "OCTOBER 18, 2026 | JUJAK PALACE, KOREA",
    KO: "2026년 10월 18일 | 조작궁전, 대한민국",
    FR: "18 OCTOBRE 2026 | PALAIS JUJAK, CORÉE",
    ES: "18 DE OCTUBRE DE 2026 | PALACIO JUJAK, COREA",
    JA: "2026年10月18日 | ジュジャク宮殿、韓国",
    VI: "18 THÁNG 10 NĂM 2026 | CUNG ĐIỆN JUJAK, HÀN QUỐC"
  };

  useEffect(() => {
    if (hasEntered && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [hasEntered]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      <video
        ref={videoRef}
        src="/hero.webm"
        muted={true}
        loop={false}
        playsInline={true}
        controls={false}
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-slate-950/60 z-0"></div>

      {/* Centered Text */}
      <div className="flex flex-col items-center justify-center mt-24 z-10">
        <div className="flex flex-col items-center justify-center">
          <span className="block text-white text-4xl md:text-6xl font-serif text-center drop-shadow-lg leading-tight">
            Grand Prince Ian
          </span>
          <span className="block text-amber-500 text-3xl md:text-5xl font-serif italic text-center py-2 drop-shadow-lg">
            &
          </span>
          <span className="block text-white text-4xl md:text-6xl font-serif text-center drop-shadow-lg leading-tight">
            Seong Hui-ju
          </span>
        </div>
        <span className="mt-8 text-amber-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold">
          {text[language]}
        </span>
      </div>

      {/* The Scroll Indicator (Outside the box) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <ChevronDown className="text-amber-500 animate-bounce w-5 h-5" />
      </div>
    </section>
  );
}

/* ---------------- SECRET REVEAL ---------------- */
function SecretReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);
  const { language } = useLanguage();

  const text = {
    EN: {
      subtitle: "THE AFTER-PARTY",
      title: "Scratch to Reveal the Secret Location",
      location: "The Imperial Vault | Midnight"
    },
    KO: {
      subtitle: "애프터 파티",
      title: "글씨를 긁어서 비밀 장소를 확인하세요",
      location: "황실 금고 | 자정"
    },
    FR: {
      subtitle: "L'AFTER-PARTY",
      title: "Grattez pour découvrir l'emplacement secret",
      location: "La Voûte Impériale | Minuit"
    },
    ES: {
      subtitle: "LA AFTER-PARTY",
      title: "Rasca para descubrir la ubicación secreta",
      location: "La Bóveda Imperial | Medianoche"
    },
    JA: {
      subtitle: "アフターパーティー",
      title: "スクラッチして秘密の場所を発見",
      location: "インペリアル・ボールト | 深夜"
    },
    VI: {
      subtitle: "SAU TIỆC",
      title: "Cạo để tiết lộ vị trí bí mật",
      location: "Kho Báu Hoàng Gia | Nửa Đêm"
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawFoil(ctx, rect.width, rect.height);
    };

    // Draw the gold/amber gradient foil
    const drawFoil = (context: CanvasRenderingContext2D, width: number, height: number) => {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#D4AF37');
      gradient.addColorStop(0.5, '#FFD700');
      gradient.addColorStop(1, '#996515');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw scratch lines
    const draw = (x: number, y: number) => {
      if (!lastPosition.current) return;
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      ctx.moveTo(lastPosition.current.x, lastPosition.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      lastPosition.current = { x, y };
    };

    // Mouse handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      lastPosition.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      const rect = canvas.getBoundingClientRect();
      draw(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
      lastPosition.current = null;
    };

    const handleMouseLeave = () => {
      isDrawing.current = false;
      lastPosition.current = null;
    };

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      isDrawing.current = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      lastPosition.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      draw(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleTouchEnd = () => {
      isDrawing.current = false;
      lastPosition.current = null;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className="w-full py-32 flex flex-col items-center justify-center px-4 relative z-10">
      <p className="text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4 text-center">{text[language].subtitle}</p>
      <h2 className="text-white text-3xl md:text-5xl font-serif mb-12 text-center tracking-wide">{text[language].title}</h2>

      <div 
        className="relative w-72 h-72 md:w-80 md:h-80 mx-auto overflow-hidden shadow-2xl"
        style={{
          WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\"/></svg>')",
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\"/></svg>')",
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center"
        }}
      >
        {/* Hidden content layer */}
        <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-8 text-center">
          <p className="text-amber-500 text-lg md:text-2xl font-serif">{text[language].location}</p>
        </div>

        {/* Scratch-off canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
        />
      </div>
    </section>
  );
}

/* ---------------- MUSIC TOGGLE & LANGUAGE SELECTOR ---------------- */
function MusicToggle({ hasEntered }: { hasEntered: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (hasEntered) {
      setIsPlaying(true);
    }
  }, [hasEntered]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full backdrop-blur-md bg-slate-950/40 border border-amber-500/40 shadow-lg cursor-pointer transition-all hover:bg-slate-950/60 hover:scale-105 flex items-center justify-center group"
    >
      <Music
        className={`text-amber-500 w-5 h-5 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''} group-hover:[animation-play-state:paused]`}
      />
    </button>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "EN", name: "English" },
    { code: "KO", name: "Korean" },
    { code: "FR", name: "French" },
    { code: "ES", name: "Spanish" },
    { code: "JA", name: "Japanese" },
    { code: "VI", name: "Vietnamese" }
  ];

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as any);
    setIsLangOpen(false);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Drop-up menu */}
      <div className={`absolute bottom-full left-0 mb-2 w-full flex flex-col gap-1 p-2 rounded-xl backdrop-blur-md bg-slate-950/60 border border-white/20 shadow-xl transition-all duration-300 ${isLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-[10px]'}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full text-left px-3 py-2 rounded-lg text-[10px] tracking-[0.2em] transition-colors ${
              language === lang.code 
                ? "text-amber-500 bg-amber-500/20" 
                : "text-white/70 hover:bg-amber-500/20 hover:text-amber-400"
            }`}
          >
            {lang.code}
          </button>
        ))}
      </div>

      {/* Main button */}
      <button 
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md bg-slate-950/40 border border-amber-500/40 shadow-lg cursor-pointer transition-all hover:bg-slate-950/60 hover:scale-105 flex items-center justify-center"
      >
        <span className="text-amber-500 text-[11px] md:text-xs font-medium tracking-widest">
          {language}
        </span>
      </button>
    </div>
  );
}

/* ---------------- SCHEDULE ---------------- */
function Schedule() {
  const { language } = useLanguage();

  const text = {
    EN: {
      sectionLabel: "SCHEDULE OF EVENTS",
      events: [
        { name: "Welcome Dinner", date: "FRIDAY, OCT 16 | 7:00 PM", imgSrc: "/EVENTS/Welcome Dinner.png" },
        { name: "The Ceremony", date: "SATURDAY, OCT 17 | 4:00 PM", imgSrc: "/EVENTS/The Ceremony.png" },
        { name: "Royal Banquet", date: "SATURDAY, OCT 17 | 6:30 PM", imgSrc: "/EVENTS/Royal Banquet.png" },
        { name: "Farewell Brunch", date: "SUNDAY, OCT 18 | 10:30 AM", imgSrc: "/EVENTS/Farewell Brunch.png" }
      ]
    },
    KO: {
      sectionLabel: "이벤트 일정",
      events: [
        { name: "웰컴 디너", date: "10월 16일 금요일 | 오후 7시", imgSrc: "/EVENTS/Welcome Dinner.png" },
        { name: "결혼식", date: "10월 17일 토요일 | 오후 4시", imgSrc: "/EVENTS/The Ceremony.png" },
        { name: "왕실 연회", date: "10월 17일 토요일 | 오후 6시 30분", imgSrc: "/EVENTS/Royal Banquet.png" },
        { name: "송별 브런치", date: "10월 18일 일요일 | 오전 10시 30분", imgSrc: "/EVENTS/Farewell Brunch.png" }
      ]
    },
    FR: {
      sectionLabel: "CALENDRIER DES ÉVÉNEMENTS",
      events: [
        { name: "Dîner de bienvenue", date: "VENDREDI 16 OCT | 19H00", imgSrc: "/EVENTS/Welcome Dinner.png" },
        { name: "La cérémonie", date: "SAMEDI 17 OCT | 16H00", imgSrc: "/EVENTS/The Ceremony.png" },
        { name: "Banquet royal", date: "SAMEDI 17 OCT | 18H30", imgSrc: "/EVENTS/Royal Banquet.png" },
        { name: "Brunch d'adieu", date: "DIMANCHE 18 OCT | 10H30", imgSrc: "/EVENTS/Farewell Brunch.png" }
      ]
    },
    ES: {
      sectionLabel: "PROGRAMA DE EVENTOS",
      events: [
        { name: "Cena de bienvenida", date: "VIERNES 16 DE OCT | 19:00", imgSrc: "/EVENTS/Welcome Dinner.png" },
        { name: "La ceremonia", date: "SÁBADO 17 DE OCT | 16:00", imgSrc: "/EVENTS/The Ceremony.png" },
        { name: "Banquete real", date: "SÁBADO 17 DE OCT | 18:30", imgSrc: "/EVENTS/Royal Banquet.png" },
        { name: "Brunch de despedida", date: "DOMINGO 18 DE OCT | 10:30", imgSrc: "/EVENTS/Farewell Brunch.png" }
      ]
    },
    JA: {
      sectionLabel: "イベントスケジュール",
      events: [
        { name: "ウェルカムディナー", date: "10月16日（金） | 19:00", imgSrc: "/EVENTS/Welcome Dinner.png" },
        { name: "セレモニー", date: "10月17日（土） | 16:00", imgSrc: "/EVENTS/The Ceremony.png" },
        { name: "ロイヤルバンケット", date: "10月17日（土） | 18:30", imgSrc: "/EVENTS/Royal Banquet.png" },
        { name: "フェアウェルブランチ", date: "10月18日（日） | 10:30", imgSrc: "/EVENTS/Farewell Brunch.png" }
      ]
    },
    VI: {
      sectionLabel: "LỊCH SỰ KIỆN",
      events: [
        { name: "Tiệc Chào Mừng", date: "THỨ 6, 16 THÁNG 10 | 19:00", imgSrc: "/EVENTS/Welcome Dinner.png" },
        { name: "Lễ Thành Hôn", date: "THỨ 7, 17 THÁNG 10 | 16:00", imgSrc: "/EVENTS/The Ceremony.png" },
        { name: "Tiệc Hoàng Gia", date: "THỨ 7, 17 THÁNG 10 | 18:30", imgSrc: "/EVENTS/Royal Banquet.png" },
        { name: "Brunch Tạm Biệt", date: "CHỦ NHẬT, 18 THÁNG 10 | 10:30", imgSrc: "/EVENTS/Farewell Brunch.png" }
      ]
    }
  };

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-12 bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{text[language].sectionLabel}</SectionLabel>

        <div className="mt-12 overflow-x-auto pb-8">
          <div className="flex gap-6 min-w-max">
            {text[language].events.map((event, index) => (
              <ItineraryCard key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ItineraryCard({ event, index }: { event: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="relative w-64 md:w-72 aspect-[3/4] rounded-sm overflow-hidden group cursor-pointer"
    >
      <img
        src={event.imgSrc}
        alt={event.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-xl md:text-2xl text-white mb-1">
          {event.name}
        </h3>
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-amber-500/80">
          {event.date}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const { language } = useLanguage();

  const text = {
    EN: { sectionLabel: "MEMORIES" },
    KO: { sectionLabel: "추억" },
    FR: { sectionLabel: "SOUVENIRS" },
    ES: { sectionLabel: "RECUERDOS" },
    JA: { sectionLabel: "思い出" },
    VI: { sectionLabel: "NHỚ NHỮNG" }
  };

  const images = [
    { src: "/card/1.png", alt: "Wedding memory 1" },
    { src: "/card/2.png", alt: "Wedding memory 2" },
    { src: "/card/3.png", alt: "Wedding memory 3" },
    { src: "/card/4.png", alt: "Wedding memory 4" },
    { src: "/card/5.png", alt: "Wedding memory 5" },
    { src: "/card/6.png", alt: "Wedding memory 6" },
    { src: "/card/7.png", alt: "Wedding memory 7" },
    { src: "/card/8.png", alt: "Wedding memory 8" }
  ];

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-12 bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{text[language].sectionLabel}</SectionLabel>

        <div className="mt-12 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <ParallaxImage src={img.src} alt={img.alt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className="relative h-80 rounded-sm overflow-hidden border border-amber-500/10">
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/* ---------------- RSVP FORM ---------------- */
function RoyalDecree() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    attendance: "",
    guestCount: "1",
    dietary: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="w-full min-h-screen py-32 flex flex-col items-center justify-center px-4 relative z-10 bg-slate-950">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,90,0.18),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-amber-500 text-xs md:text-sm uppercase tracking-[0.3em] font-semibold mb-4 text-center">
          KINDLY REPLY
        </p>
        <h2 className="text-white text-4xl md:text-5xl font-serif mb-12 text-center drop-shadow-lg">
          Will You Join Us?
        </h2>

        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl flex flex-col gap-8 p-8 md:p-14 rounded-2xl backdrop-blur-md bg-slate-950/40 border border-amber-500/30 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 pb-3 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-0 focus:border-amber-500 transition-colors font-serif"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 pb-3 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-0 focus:border-amber-500 transition-colors font-serif"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-0 border-b-2 border-white/20 pb-3 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-0 focus:border-amber-500 transition-colors font-serif"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormState(prev => ({ ...prev, attendance: "accepts" }))}
                className={`w-full py-4 rounded-lg border text-sm tracking-widest uppercase transition-all cursor-pointer text-center ${formState.attendance === "accepts" ? "border-amber-500 text-amber-400 bg-amber-500/10" : "border-white/20 text-white/60"}`}
              >
                Joyfully Accepts
              </button>
              <button
                type="button"
                onClick={() => setFormState(prev => ({ ...prev, attendance: "declines" }))}
                className={`w-full py-4 rounded-lg border text-sm tracking-widest uppercase transition-all cursor-pointer text-center ${formState.attendance === "declines" ? "border-amber-500 text-amber-400 bg-amber-500/10" : "border-white/20 text-white/60"}`}
              >
                Regretfully Declines
              </button>
            </div>

            {formState.attendance === "accepts" && (
              <>
                <div>
                  <select
                    name="guestCount"
                    value={formState.guestCount}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-0 border-b-2 border-white/20 pb-3 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-0 focus:border-amber-500 transition-colors font-serif cursor-pointer"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="dietary"
                    value={formState.dietary}
                    onChange={handleInputChange}
                    placeholder="Dietary Restrictions (Optional)"
                    rows={3}
                    className="w-full bg-transparent border-0 border-b-2 border-white/20 pb-3 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-0 focus:border-amber-500 transition-colors font-serif resize-none"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-5 mt-4 border border-amber-500 text-amber-500 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-amber-500 hover:text-black transition-all duration-300 rounded-sm"
            >
              Send Reply
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl flex flex-col items-center justify-center p-8 md:p-14 rounded-2xl backdrop-blur-md bg-slate-950/40 border border-amber-500/30 shadow-2xl"
          >
            <Sparkles className="mx-auto h-10 w-10 text-amber-500" strokeWidth={1} />
            <h3 className="mt-6 font-serif text-2xl text-white text-center">
              Thank You for Your Reply!
            </h3>
            <p className="mt-3 font-sans text-sm text-white/60 text-center">
              We look forward to celebrating with you.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const { language, setLanguage } = useLanguage();

  const text = {
    EN: {
      plot: "The Plot",
      cast: "The Cast",
      gallery: "The Gallery",
      copyright: "© 2026 Perfect Crown Universe | Developed by Zylo Solution"
    },
    KO: {
      plot: "줄거리",
      cast: "출연진",
      gallery: "갤러리",
      copyright: "© 2026 퍼펙트 크라운 유니버스 | Zylo Solution 개발"
    },
    FR: {
      plot: "L'Intrigue",
      cast: "Le Casting",
      gallery: "La Galerie",
      copyright: "© 2026 Perfect Crown Universe | Développé par Zylo Solution"
    },
    ES: {
      plot: "La Trama",
      cast: "El Reparto",
      gallery: "La Galería",
      copyright: "© 2026 Perfect Crown Universe | Desarrollado por Zylo Solution"
    },
    JA: {
      plot: "プロット",
      cast: "キャスト",
      gallery: "ギャラリー",
      copyright: "© 2026 Perfect Crown Universe | Zylo Solutionが開発"
    },
    VI: {
      plot: "Cốt Truyện",
      cast: "Diễn Viên",
      gallery: "Thư Viện Ảnh",
      copyright: "© 2026 Perfect Crown Universe | Phát triển bởi Zylo Solution"
    }
  };

  return (
    <footer className="py-20 px-6 md:px-12 bg-slate-950 border-t border-amber-500/20">
      <div className="mx-auto max-w-6xl text-center">
        <Crown className="mx-auto h-10 w-10 text-amber-500" strokeWidth={1} />

        <div className="mt-8 flex flex-wrap justify-center gap-8">
          <a href="#" className="font-sans text-xs tracking-[0.3em] uppercase text-white/60 hover:text-amber-500 transition-colors">
            {text[language].plot}
          </a>
          <a href="#" className="font-sans text-xs tracking-[0.3em] uppercase text-white/60 hover:text-amber-500 transition-colors">
            {text[language].cast}
          </a>
          <a href="#" className="font-sans text-xs tracking-[0.3em] uppercase text-white/60 hover:text-amber-500 transition-colors">
            {text[language].gallery}
          </a>
        </div>

        <p className="mt-8 font-sans text-xs text-white/40 tracking-wide">
          {text[language].copyright}
        </p>
      </div>
    </footer>
  );
}

/* ---------------- UTILITIES ---------------- */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-amber-500">
      <span className="h-px w-8 bg-amber-500/50" />
      <span className="font-sans text-[0.6rem] tracking-[0.55em] uppercase">{children}</span>
      <span className="h-px w-8 bg-amber-500/50" />
    </div>
  );
}
