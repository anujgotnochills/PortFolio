'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic2, Sparkles, Building2, Layers, PartyPopper, MonitorPlay, Play, ShoppingBag } from 'lucide-react';

// ─── Category definitions ───────────────────────────────────────────────────

const motionGraphics = [
  { title: "Motion Graphics 1", videoId: "Ri9zFMqUcdE", description: "Creative motion graphics" },
  { title: "Motion Graphics 2", videoId: "qJJ60OzZ-Mo", description: "Dynamic animation" },
  { title: "Motion Graphics 3", videoId: "EzNwoOqxxm0", description: "Visual effects" },
  { title: "Motion Graphics 4", videoId: "TTAIMgm2O9A", description: "Engaging visuals" },
];

const podcastReels = [
  { title: "Podcast Reel 1", videoId: "VyESTnMBSMI", description: "Engaging podcast short" },
  { title: "Podcast Reel 2", videoId: "zQ7X5okqVPc", description: "Highlight podcast moment" },
];

const realEstateVideos = [
  { title: "Real Estate 1", videoId: "KnYYFEknvKY", description: "Premium property showcase" },
  { title: "Real Estate 2", videoId: "o1WdFTRqPZI", description: "Luxury home tour" },
  { title: "Real Estate 3", videoId: "zsQ9OBWwJu4", description: "Interior walkthrough" },
];

const aiVideos = [
  { title: "AI Video 1", videoId: "a1ryWwkCa3Y", description: "AI generated visuals" },
  { title: "AI Video 2", videoId: "uFDujcrWh48", description: "AI powered editing" },
  { title: "AI Video 3", videoId: "R8TTWejAm88", description: "Creative AI concepts" },
];

const eventWeddingReels = [
  { title: "Event Highlight", videoId: "JQJsodJL4Sk", description: "Cinematic event recap" },
  { title: "Wedding Moments", videoId: "FUMNpjAgReQ", description: "Beautiful wedding edit" },
  { title: "Celebration Reel", videoId: "Pvyk8liaZ-o", description: "Special occasions" },
];

const brandReels = [
  { title: "Brand Reel / Apparel Campaign Edit", videoId: "PKi3C7QpxGE", description: "Engaging brand campaign" },
];

const longFormVideos = [
  { title: "Long Form Content 1", videoId: "hSUk6SpPLZg", description: "Detailed documentary style" },
  { title: "Long Form Content 2", videoId: "YEBMWBDgmgM", description: "Comprehensive edit" },
];

// ─── Reusable category section ────────────────────────────────────────────────

interface Video {
  title: string;
  videoId: string;
  description: string;
}

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  badge: string;
  videos: Video[];
  sectionRef: React.RefObject<any>;
  isLongForm?: boolean;
}

function VideoPlayer({ videoId, isLongForm }: { videoId: string; isLongForm?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted]     = useState(true);
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle iframe on/off as the card enters/leaves the viewport.
  // rootMargin keeps the iframe alive 300px beyond the visible edges
  // so it doesn't flicker during normal scrolling.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '300px 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset mute when video goes off-screen (iframe will be destroyed,
  // and a fresh one always starts muted anyway).
  useEffect(() => {
    if (!isVisible) setIsMuted(true);
  }, [isVisible]);

  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&controls=1&rel=0&playsinline=1`;

  const sendCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    );
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand('unMute');
      sendCommand('setVolume', [100]);
    } else {
      sendCommand('mute');
    }
    setIsMuted(prev => !prev);
  };

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-zinc-900 overflow-hidden">
      {isVisible ? (
        <>
          <iframe
            ref={iframeRef}
            src={embedSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
            style={{ border: 0 }}
          />
          {/* Mute / Unmute overlay button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                       bg-black/70 text-white border border-white/20 backdrop-blur-sm
                       hover:bg-primary/80 hover:border-primary transition-all duration-200 select-none"
          >
            {isMuted ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
                Unmute
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                Mute
              </>
            )}
          </button>
        </>
      ) : (
        /* Thumbnail shown while the video is off-screen */
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            loading="lazy"
            className={`w-full h-full object-cover opacity-80 ${isLongForm ? '' : 'scale-[1.35]'}`}
          />
        </div>
      )}
    </div>
  );
}

function CategorySection({ title, icon, badge, videos, sectionRef, isLongForm }: CategorySectionProps) {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Section header */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/15 text-primary">
            {icon}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] tracking-tight">
            {title}
          </h3>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
          {badge}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-border via-primary/30 to-transparent" />
      </div>

      {/* Video grid */}
      <div
        ref={sectionRef}
        className={`grid ${isLongForm ? 'grid-cols-1 md:grid-cols-2 max-w-5xl' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl'} gap-3 sm:gap-4 md:gap-6 mx-auto`}
      >
        {videos.map((video, i) => (
          <div
            key={i}
            className="group bg-card border border-border rounded-2xl overflow-hidden
                       hover:border-primary hover:shadow-2xl hover:shadow-primary/20
                       transition-all duration-300"
          >
            {/* Thumbnail / embed */}
            <div className={`${isLongForm ? 'aspect-video' : 'aspect-[9/16]'} relative bg-black overflow-hidden`}>
              <VideoPlayer videoId={video.videoId} isLongForm={isLongForm} />
            </div>

            {/* Card footer */}
            <div className="p-4 bg-card">
              <h4 className="text-base font-bold group-hover:text-primary transition-colors mb-1 truncate">
                {video.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const podcastRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const longFormRef = useRef<HTMLDivElement>(null);

  const categories = [
    { ref: motionRef, label: 'Motion Graphics', icon: <Layers size={20} />, badge: `${motionGraphics.length} pieces`, videos: motionGraphics },
    { ref: podcastRef, label: 'Podcast Reel', icon: <Mic2 size={20} />, badge: `${podcastReels.length} reels`, videos: podcastReels },
    { ref: realRef, label: 'Real Estate', icon: <Building2 size={20} />, badge: `${realEstateVideos.length} listings`, videos: realEstateVideos },
    { ref: aiRef, label: 'AI Videos', icon: <Sparkles size={20} />, badge: `${aiVideos.length} edits`, videos: aiVideos },
    { ref: eventRef, label: 'Event Reels & Wedding Highlights', icon: <PartyPopper size={20} />, badge: `${eventWeddingReels.length} edits`, videos: eventWeddingReels },
    { ref: brandRef, label: 'Brand Reel / Apparel Campaign Edit', icon: <ShoppingBag size={20} />, badge: `${brandReels.length} reels`, videos: brandReels },
    { ref: longFormRef, label: 'Long Form', icon: <MonitorPlay size={20} />, badge: `${longFormVideos.length} videos`, videos: longFormVideos, isLongForm: true },
  ];

  useEffect(() => {
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        categories.forEach(({ ref }) => {
          if (!ref.current) return;
          gsap.from(ref.current.children, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              gsap.set(ref.current?.children || [], { clearProps: 'all' });
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-6 sm:py-8 bg-background scroll-mt-20 md:scroll-mt-24">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
      <div className="container px-4 sm:px-6 md:px-8">

        {/* Page heading */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">My Projects</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            A curated showcase of my editing work — from podcast reels to AI-driven videos,
            real-estate walkthroughs, and motion graphics.
          </p>
        </div>

        {/* Category sections */}
        {categories.map(({ ref, label, icon, badge, videos, isLongForm }) => (
          <CategorySection
            key={label}
            title={label}
            icon={icon}
            badge={badge}
            videos={videos}
            sectionRef={ref}
            isLongForm={isLongForm}
          />
        ))}

        {/* CTA */}
        <div className="mt-4 text-center px-4">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary animate-pulse drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
            Next Maybe Yours
          </p>
        </div>

      </div>
    </section>
  );
}
