'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic2, Sparkles, Building2, Layers, PartyPopper, MonitorPlay, ShoppingBag, Users, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

type Video = { title: string; description: string; videoId: string; startSeconds?: number };

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
  { title: "Real Estate 4", videoId: "OxGUXO9xMWw", description: "Property showcase" },
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

const influencerVideos: Video[] = [
  { title: "exploremanishaa", videoId: "XVviRlANE0c", description: "Influencer video" },
  { title: "Zeo", videoId: "Gs8yK0uYFYQ", description: "Influencer short" },
];

const longFormVideos = [
  { title: "Sarah", videoId: "6TScpy8ZP5k", startSeconds: 21, description: "Long form edit" },
  { title: "Mary Cooper", videoId: "LyOD81yxsI8", description: "Long form edit" },
  { title: "Long Form Content 1", videoId: "hSUk6SpPLZg", description: "Detailed documentary style" },
  { title: "Long Form Content 2", videoId: "YEBMWBDgmgM", description: "Comprehensive edit" },
];


const categories = [
  { id: 'motion-graphics', label: 'Motion Graphics', icon: Layers, videos: motionGraphics },
  { id: 'podcast-reels', label: 'Podcast Reels', icon: Mic2, videos: podcastReels },
  { id: 'real-estate', label: 'Real Estate', icon: Building2, videos: realEstateVideos },
  { id: 'ai-videos', label: 'AI Videos', icon: Sparkles, videos: aiVideos },
  { id: 'events-weddings', label: 'Events & Weddings', icon: PartyPopper, videos: eventWeddingReels },
  { id: 'brand-reels', label: 'Brand & Apparel', icon: ShoppingBag, videos: brandReels },
  { id: 'influencer', label: 'Influencer', icon: Users, videos: influencerVideos },
  { id: 'long-form', label: 'Long Form', icon: MonitorPlay, videos: longFormVideos, isLongForm: true },
];

function VideoPlayer({ video, isLongForm }: { video: Video; isLongForm?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setIsMuted(true);
    }, { rootMargin: '200px 0px' });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function toggleMute() {
    const send = (func: string, args: number[] = []) => iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), 'https://www.youtube.com');
    send(isMuted ? 'unMute' : 'mute');
    if (isMuted) send('setVolume', [100]);
    setIsMuted(!isMuted);
  }

  return <div className="project-player" ref={containerRef}>
    {isVisible ? <>
      <iframe ref={iframeRef} title={video.title} src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&enablejsapi=1&controls=1&rel=0&playsinline=1&start=${video.startSeconds ?? 0}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
      <button className="mute-button" type="button" onClick={toggleMute} aria-label={`${isMuted ? 'Unmute' : 'Mute'} ${video.title}`} aria-pressed={!isMuted}>{isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}{isMuted ? 'Unmute' : 'Mute'}</button>
    </> : <div className={`video-poster ${isLongForm ? '' : 'is-short'}`}><img src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`} alt={`${video.title} video thumbnail`} loading="lazy" /></div>}
  </div>;
}

export function Projects() {
  return <section id="projects" className="editorial-section projects-section">
    <div className="section-heading"><div><p className="eyebrow">01 / A few things I've put my heart into</p><h2 className="display section-title">THE GOOD STUFF.</h2></div><p>Big stories. Little moments.<br />Every frame, a little more feeling.</p></div>
    <nav className="project-index" aria-label="Video categories">{categories.map(category => <a key={category.id} href={`#${category.id}`}>{category.label}</a>)}</nav>
    {categories.map(({ id, label, icon: Icon, videos, isLongForm }, i) => <section key={id} id={id} className="project-category" aria-labelledby={`${id}-title`}>
      <div className="category-header"><span className="category-number">{String(i+1).padStart(2,'0')}</span><span className="category-icon"><Icon size={18} strokeWidth={1.5} /></span><h3 id={`${id}-title`}>{label}</h3><span className="category-count">{String(videos.length).padStart(2,'0')} VIDEOS</span></div>
      <div className={`project-grid ${isLongForm ? 'long-form-grid' : ''}`}>{videos.map(video => <article className="project-card" key={video.videoId}>
        <div className="project-media"><VideoPlayer video={video} isLongForm={isLongForm} /></div>
        <div className="project-card-footer"><h4>{video.title}</h4><p>{video.description}</p></div>
      </article>)}</div>
    </section>)}
    <div className="work-outro"><a href="#contact" className="handwritten">The next one could be yours. <ArrowUpRight size={22} className="inline-block" /></a></div>
  </section>;
}
