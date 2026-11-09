'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Mic2, Sparkles, Building2, Layers, PartyPopper, MonitorPlay, ShoppingBag, Users, X, ArrowUpRight } from 'lucide-react';
import { observePortfolioPlayback, type PlaybackSelection } from '@/lib/portfolio-playback';
import { loadYouTubeAPI, type YouTubePlayer } from '@/lib/youtube-player';

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
  { title: "One Piece Lore Explained", videoId: "cJrEZT03iDU", description: "Anime Hater reaction / long form edit" },
  { title: "All 11 Devil Fruit Types Explained", videoId: "GpkuXGjASH0", description: "One Piece reaction / long form edit" },
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

const AUTO_STOP_SECONDS = 10;

function VideoPlayer({ video, isLongForm, isActive, shouldLoad, onPlay, onStop, registerPlayer, canPlay }: {
  video: Video;
  isLongForm?: boolean;
  isActive: boolean;
  shouldLoad: boolean;
  onPlay: () => void;
  onStop: () => void;
  registerPlayer: (id: string, player: YouTubePlayer | null) => void;
  canPlay: (id: string) => boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(isActive);
  const readyPlayer = useRef<YouTubePlayer | null>(null);
  const resumePosition = useRef(video.startSeconds ?? 0);
  const hasPlayed = useRef(false);
  const bufferRequested = useRef(false);
  const autoStopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const rememberPosition = useCallback((player: YouTubePlayer) => {
    if (!hasPlayed.current) return;
    const seconds = player.getCurrentTime();
    if (Number.isFinite(seconds) && seconds >= 0) resumePosition.current = seconds;
  }, []);

  const preparePausedBuffer = useCallback((player: YouTubePlayer) => {
    // Seeking from CUED starts playback. Only request data after PAUSED is confirmed.
    if (bufferRequested.current || hasPlayed.current || canPlay(video.videoId) || player.getPlayerState() !== 2) return;
    bufferRequested.current = true;
    player.seekTo(resumePosition.current, true);
  }, [canPlay, video.videoId]);

  // Auto-stop after AUTO_STOP_SECONDS when video becomes active
  useEffect(() => {
    clearTimeout(autoStopTimer.current);
    if (isActive && canPlay(video.videoId)) {
      autoStopTimer.current = setTimeout(() => {
        onStop();
      }, AUTO_STOP_SECONDS * 1000);
    }
    return () => clearTimeout(autoStopTimer.current);
  }, [isActive, canPlay, video.videoId, onStop]);

  useLayoutEffect(() => {
    activeRef.current = isActive;
    const player = readyPlayer.current;
    if (!player) return;
    const iframe = player.getIframe();
    iframe.tabIndex = isActive ? 0 : -1;
    if (isActive && canPlay(video.videoId)) {
      player.mute();
      player.playVideo();
    } else {
      rememberPosition(player);
      player.pauseVideo();
      preparePausedBuffer(player);
    }
  }, [isActive, ready, canPlay, video.videoId, rememberPosition, preparePausedBuffer]);

  useEffect(() => {
    const host = hostRef.current;
    if (!shouldLoad || !host) {
      setReady(false);
      setStarted(false);
      return;
    }
    let disposed = false;
    let player: YouTubePlayer | undefined;
    setReady(false);
    setStarted(false);
    setFailed(false);
    setNeedsPlay(false);
    setBuffering(false);
    bufferRequested.current = false;
    hasPlayed.current = false;

    loadYouTubeAPI().then(api => {
      if (disposed) return;
      // YouTube replaces this child, keeping React's host node intact.
      const mount = document.createElement('div');
      host.appendChild(mount);
      player = new api.Player(mount, {
        videoId: video.videoId,
        playerVars: { autoplay: activeRef.current && canPlay(video.videoId) ? 1 : 0, mute: 1, controls: 1, rel: 0, playsinline: 1, start: Math.floor(resumePosition.current), origin: window.location.origin },
        events: {
          onReady({ target }) {
            if (disposed) return;
            readyPlayer.current = target;
            registerPlayer(video.videoId, target);
            target.getIframe().title = video.title;
            target.getIframe().tabIndex = activeRef.current ? 0 : -1;
            target.getIframe().allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            target.getIframe().allowFullscreen = true;
            target.mute();
            setReady(true);
            // The ready render commits visibility before the layout effect plays.
            if (!activeRef.current || !canPlay(video.videoId)) {
              target.pauseVideo();
              preparePausedBuffer(target);
            }
          },
          onStateChange({ target, data }) {
            if (disposed) return;
            // YouTube's state events replace native loadeddata/canplay/waiting events.
            setBuffering(data === 3);
            if (data === 1) {
              if (!activeRef.current || !canPlay(video.videoId)) target.pauseVideo();
              else { hasPlayed.current = true; setStarted(true); setNeedsPlay(false); }
            } else if (data === 2) {
              rememberPosition(target);
              preparePausedBuffer(target);
            } else if (data === 5 && !canPlay(video.videoId)) {
              target.pauseVideo();
              preparePausedBuffer(target);
            } else if (data === 0) {
              resumePosition.current = video.startSeconds ?? 0;
              hasPlayed.current = false;
            }
            // Expose observed readiness for diagnostics; never delay visible playback on it.
            host.dataset.bufferedFraction = String(target.getVideoLoadedFraction());
          },
          onError() {
            if (!disposed) { readyPlayer.current?.pauseVideo(); setFailed(true); }
          },
          onAutoplayBlocked() { if (!disposed) setNeedsPlay(true); },
        },
      });
    }).catch(() => { if (!disposed) setFailed(true); });

    return () => {
      disposed = true;
      if (readyPlayer.current) rememberPosition(readyPlayer.current);
      readyPlayer.current?.pauseVideo();
      readyPlayer.current = null;
      registerPlayer(video.videoId, null);
      player?.destroy();
      host.replaceChildren();
    };
  }, [shouldLoad, video.videoId, video.startSeconds, video.title, registerPlayer, canPlay, rememberPosition, preparePausedBuffer]);

  const play = () => {
    clearTimeout(autoStopTimer.current);
    autoStopTimer.current = setTimeout(() => { onStop(); }, AUTO_STOP_SECONDS * 1000);
    onPlay();
    if (readyPlayer.current && canPlay(video.videoId)) {
      readyPlayer.current.mute();
      readyPlayer.current.playVideo();
      setNeedsPlay(false);
    }
  };

  return <div className="project-player" data-video-id={video.videoId} aria-busy={isActive && (!ready || buffering)}>
    <div ref={hostRef} className={`youtube-player-host ${isActive && !failed ? '' : 'is-preloading'}`} aria-hidden={!isActive} />
    {(!isActive || !ready || !started || failed || needsPlay) && <button type="button" className={`video-poster ${isLongForm ? '' : 'is-short'}`} onClick={play} aria-label={`Play ${video.title}`}>
      <img src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`} alt="" width="480" height="360" loading="lazy" decoding="async" />
    </button>}
    {isActive && failed && <a className="video-fallback" href={`https://www.youtube.com/watch?v=${video.videoId}&t=${video.startSeconds ?? 0}s`} target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight size={14} /></a>}
    {isActive && <button className="stop-video-button" type="button" onClick={onStop} aria-label={`Close ${video.title}`}><X size={16} /></button>}
  </div>;
}

export function Projects() {
  const [selection, setSelection] = useState<PlaybackSelection>({ activeSectionId: null, activeVideoIds: [], preloadedSectionId: null, preloadedVideoIds: [] });
  const galleryRef = useRef<HTMLElement>(null);
  const controllerRef = useRef<ReturnType<typeof observePortfolioPlayback> | null>(null);
  const playersRef = useRef(new Map<string, YouTubePlayer>());
  const playbackOwnersRef = useRef(new Set<string>());
  const canPlay = useCallback((id: string) => !document.hidden && playbackOwnersRef.current.has(id), []);
  const registerPlayer = useCallback((id: string, player: YouTubePlayer | null) => {
    if (player) playersRef.current.set(id, player);
    else playersRef.current.delete(id);
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const controller = observePortfolioPlayback(gallery, next => {
      playbackOwnersRef.current = new Set(next.activeVideoIds);
      // Pause the previous section before React starts the new section's players.
      playersRef.current.forEach((player, id) => { if (!playbackOwnersRef.current.has(id)) player.pauseVideo(); });
      setSelection(next);
    });
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, []);

  return <section id="projects" className="editorial-section projects-section" ref={galleryRef}>
    <div className="section-heading"><div><p className="eyebrow">01 / A few things I've put my heart into</p><h2 className="display section-title">THE GOOD STUFF.</h2></div><p>Big stories. Little moments.<br />Every frame, a little more feeling.</p></div>
    <nav className="project-index" aria-label="Video categories">{categories.map(category => <a key={category.id} href={`#${category.id}`}>{category.label}</a>)}</nav>
    {categories.map(({ id, label, icon: Icon, videos, isLongForm }, i) => <section key={id} id={id} className="project-category" data-video-section={id} aria-labelledby={`${id}-title`}>
      <div className="category-header"><span className="category-number">{String(i+1).padStart(2,'0')}</span><span className="category-icon"><Icon size={18} strokeWidth={1.5} /></span><h3 id={`${id}-title`}>{label}</h3><span className="category-count">{String(videos.length).padStart(2,'0')} VIDEOS</span></div>
      <div className={`project-grid ${isLongForm ? 'long-form-grid' : ''}`}>{videos.map(video => <article className="project-card" key={video.videoId}>
        <div className="project-media"><VideoPlayer video={video} isLongForm={isLongForm} isActive={selection.activeVideoIds.includes(video.videoId)} shouldLoad={selection.activeVideoIds.includes(video.videoId) || selection.preloadedVideoIds.includes(video.videoId)} onPlay={() => controllerRef.current?.selectVideo(video.videoId)} onStop={() => controllerRef.current?.dismissVideo(video.videoId)} registerPlayer={registerPlayer} canPlay={canPlay} /></div>
        <div className="project-card-footer"><h4>{video.title}</h4><p>{video.description}</p></div>
      </article>)}</div>
    </section>)}
    <div className="work-outro"><a href="#contact" className="handwritten">The next one could be yours. <ArrowUpRight size={22} className="inline-block" /></a></div>
  </section>;
}
