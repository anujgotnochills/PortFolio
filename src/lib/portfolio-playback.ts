export type PlaybackSelection = {
  activeSectionId: string | null;
  activeVideoIds: string[];
  preloadedSectionId: string | null;
  preloadedVideoIds: string[];
};

const emptySelection: PlaybackSelection = {
  activeSectionId: null, activeVideoIds: [], preloadedSectionId: null, preloadedVideoIds: [],
};
const preloadDistance = 1000;
const reverseScrollGrace = 1200;
const sameIds = (a: string[], b: string[]) => a.length === b.length && a.every((id, i) => id === b[i]);

/** A two-section working set: the playing category and one paused adjacent category. */
export function observePortfolioPlayback(gallery: HTMLElement, onChange: (selection: PlaybackSelection) => void) {
  const sections = Array.from(gallery.querySelectorAll<HTMLElement>('[data-video-section]')).map(element => ({
    element,
    id: element.dataset.videoSection!,
    videoIds: Array.from(element.querySelectorAll<HTMLElement>('[data-video-id]')).map(card => card.dataset.videoId!),
  }));
  const dismissed = new Set<string>();
  let selection = emptySelection;
  let retentionTimer: ReturnType<typeof setTimeout> | undefined;
  let scrollFrame: number | undefined;
  let lastScrollY = window.scrollY;
  let direction = 1;
  let recentSectionId: string | null = null;
  let retainUntil = 0;
  let disposed = false;

  const publish = (next: PlaybackSelection) => {
    if (disposed || (selection.activeSectionId === next.activeSectionId
      && selection.preloadedSectionId === next.preloadedSectionId
      && sameIds(selection.activeVideoIds, next.activeVideoIds)
      && sameIds(selection.preloadedVideoIds, next.preloadedVideoIds))) return;
    selection = next;
    onChange(next);
  };
  const measure = () => sections.map(section => {
    const rect = section.element.getBoundingClientRect();
    const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    if (!visible) section.videoIds.forEach(id => dismissed.delete(id));
    return { ...section, rect, visible };
  });

  const reconcile = (preferredSectionId?: string) => {
    if (disposed) return;
    clearTimeout(retentionTimer);
    if (document.hidden) { publish(emptySelection); return; }
    if (Math.abs(window.scrollY - lastScrollY) > 4) {
      direction = window.scrollY > lastScrollY ? 1 : -1;
      lastScrollY = window.scrollY;
    }
    const measured = measure();
    const visible = measured.filter(section => section.visible > 0);
    let current = visible.reduce<typeof measured[number] | undefined>((best, section) => !best || section.visible > best.visible ? section : best, undefined);
    const previous = visible.find(section => section.id === selection.activeSectionId);
    if (previous && current && previous.visible + 80 >= current.visible) current = previous;
    current = visible.find(section => section.id === preferredSectionId) ?? current;

    if (selection.activeSectionId && selection.activeSectionId !== current?.id) {
      recentSectionId = selection.activeSectionId;
      retainUntil = Date.now() + reverseScrollGrace;
    }
    const nearby = (section: typeof measured[number]) => section.rect.top <= window.innerHeight + preloadDistance
      && section.rect.bottom >= -preloadDistance;
    const recent = measured.find(section => section.id === recentSectionId && section.id !== current?.id && nearby(section));
    const index = current ? measured.indexOf(current) : -1;
    const predicted = current ? measured[index + direction] : (direction > 0 ? measured : [...measured].reverse()).find(section => nearby(section)
      && (direction > 0 ? section.rect.top >= window.innerHeight : section.rect.bottom <= 0));
    // Keep the just-left players paused briefly. Reversing reuses their buffer and position.
    const keepingRecent = recent && Date.now() < retainUntil;
    const standby = keepingRecent ? recent : predicted && nearby(predicted) ? predicted : recent;
    publish({
      activeSectionId: current?.id ?? null,
      activeVideoIds: current?.videoIds.filter(id => !dismissed.has(id)) ?? [],
      preloadedSectionId: standby?.id ?? null,
      preloadedVideoIds: standby?.videoIds.filter(id => !dismissed.has(id)) ?? [],
    });
    if (keepingRecent) retentionTimer = setTimeout(() => reconcile(), Math.max(1, retainUntil - Date.now()));
  };
  const update = () => reconcile();
  const onScroll = () => {
    if (scrollFrame !== undefined || document.hidden) return;
    // Runs only in response to scrolling, coalescing events without delaying activation.
    scrollFrame = window.requestAnimationFrame(() => { scrollFrame = undefined; reconcile(); });
  };
  const observer = new IntersectionObserver(update, { threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] });
  const preloadObserver = new IntersectionObserver(update, { rootMargin: `${preloadDistance}px 0px`, threshold: 0 });
  sections.forEach(section => { observer.observe(section.element); preloadObserver.observe(section.element); });
  const release = () => {
    clearTimeout(retentionTimer);
    if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
    scrollFrame = undefined;
    recentSectionId = null;
    retainUntil = 0;
    publish(emptySelection);
  };
  const onVisibility = () => { if (document.hidden) release(); else reconcile(); };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('pagehide', release);
  window.addEventListener('pageshow', update);
  reconcile();

  return {
    selectVideo(id: string) {
      if (document.hidden) return;
      const section = measure().find(section => section.visible > 0 && section.videoIds.includes(id));
      if (!section) return;
      dismissed.delete(id);
      reconcile(section.id);
    },
    dismissVideo(id: string) { dismissed.add(id); reconcile(); },
    destroy() {
      release();
      disposed = true;
      observer.disconnect();
      preloadObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      window.removeEventListener('pagehide', release);
      window.removeEventListener('pageshow', update);
    },
  };
}
