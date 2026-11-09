const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadModule(relative, globals = {}, overrides = {}) {
  const filename = path.join(__dirname, '..', relative);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  const context = vm.createContext({
    exports, module: { exports },
    require: name => Object.hasOwn(overrides, name) ? overrides[name] : require(name),
    ...globals,
  });
  vm.runInContext(source, context, { filename });
  return { exports, context };
}

function environment() {
  let timerId = 0;
  let now = 0;
  const timers = new Map();
  const frames = new Map();
  const windowListeners = new Map();
  const documentListeners = new Map();
  const observers = [];
  const window = {
    innerHeight: 800, scrollY: 0, location: { origin: 'https://portfolio.example' },
    addEventListener: (name, fn) => windowListeners.set(name, fn),
    removeEventListener: name => windowListeners.delete(name),
    setTimeout(fn, delay = 0) { timers.set(++timerId, { fn, at: now + delay }); return timerId; },
    requestAnimationFrame(fn) { frames.set(++timerId, fn); return timerId; },
    cancelAnimationFrame(id) { frames.delete(id); },
  };
  const document = {
    hidden: false,
    addEventListener: (name, fn) => documentListeners.set(name, fn),
    removeEventListener: name => documentListeners.delete(name),
  };
  const globals = {
    window, document,
    Date: { now: () => now },
    setTimeout: window.setTimeout,
    clearTimeout: id => timers.delete(id),
    IntersectionObserver: class {
      constructor(callback, options) { this.callback = callback; this.options = options; this.targets = []; observers.push(this); }
      observe(element) { this.targets.push(element); }
      disconnect() { this.disconnected = true; }
    },
  };
  const advance = (ms) => {
    now += ms;
    const pending = [...timers].filter(([, timer]) => timer.at <= now);
    pending.forEach(([id, timer]) => { timers.delete(id); timer.fn(); });
  };
  const flushFrames = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn()); };
  return { globals, window, document, timers, frames, observers, windowListeners, documentListeners, advance, flushFrames };
}

function galleryFixture(start = 1000, videosPerSection = 1) {
  const env = environment();
  const element = (top, height, id) => ({
    dataset: { videoId: id },
    getBoundingClientRect: () => ({ top: top - env.window.scrollY, bottom: top + height - env.window.scrollY, height }),
  });
  const spacing = videosPerSection === 1 ? 700 : 1200;
  const sections = [start, start + spacing, start + spacing * 2].map((top, i) => {
    const section = element(top, videosPerSection === 1 ? 600 : 1100);
    section.dataset.videoSection = `section-${i + 1}`;
    section.cards = Array.from({ length: videosPerSection }, (_, card) => element(top + 50 + Math.floor(card / 2) * 500, 450, videosPerSection === 1 ? `video-${i + 1}` : `video-${i + 1}-${card + 1}`));
    section.querySelectorAll = () => section.cards;
    return section;
  });
  const gallery = { querySelectorAll: () => sections };
  const { observePortfolioPlayback } = loadModule('src/lib/portfolio-playback.ts', env.globals).exports;
  let selection = { activeSectionId: null, activeVideoIds: [], preloadedSectionId: null, preloadedVideoIds: [] };
  const changes = [];
  const controller = observePortfolioPlayback(gallery, next => {
    selection = JSON.parse(JSON.stringify(next));
    changes.push(selection);
    assert(!next.activeVideoIds.some(id => next.preloadedVideoIds.includes(id)));
    assert(new Set([...next.activeVideoIds, ...next.preloadedVideoIds].map(id => id.split('-')[1])).size <= 2, 'no more than two categories loaded');
  });
  const scroll = (y) => {
    env.window.scrollY = y;
    env.observers[0].callback();
  };
  return { ...env, controller, sections, scroll, changes, get selection() { return selection; } };
}

test('predictive observer warms the entire next category before any of it is visible', () => {
  const f = galleryFixture(2400, 4);
  assert.deepEqual(f.selection.activeVideoIds, []);
  assert.deepEqual(f.selection.preloadedVideoIds, []);
  f.scroll(700);
  assert.equal(f.selection.activeSectionId, null);
  assert.equal(f.selection.preloadedSectionId, 'section-1');
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-1-1', 'video-1-2', 'video-1-3', 'video-1-4']);
  assert.equal(f.observers[1].options.rootMargin, '1000px 0px');
  f.controller.destroy();
});

test('activation is immediate and the just-left category is retained briefly before loading forward', () => {
  const f = galleryFixture();
  f.scroll(600);
  assert.deepEqual(f.selection.activeVideoIds, ['video-1']);
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-2']);
  f.scroll(1400);
  assert.deepEqual(f.selection.activeVideoIds, ['video-2'], 'no activation timeout');
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-1'], 'old iframe stays paused for quick reversal');
  f.advance(1199);
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-1']);
  f.advance(1);
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-3']);
  f.controller.destroy();
});

test('a quick reversal reuses the previous category without loading a third category', () => {
  const f = galleryFixture();
  f.scroll(600);
  f.scroll(1400);
  f.advance(300);
  f.scroll(1000);
  assert.deepEqual(f.selection.activeVideoIds, ['video-1']);
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-2']);
  assert(!f.changes.some(change => change.activeVideoIds.includes('video-3')));
  f.controller.destroy();
});

test('direction changes update prediction even when IntersectionObserver thresholds do not change', () => {
  const f = galleryFixture();
  f.scroll(2200);
  f.window.scrollY = 2100;
  f.windowListeners.get('scroll')();
  f.windowListeners.get('scroll')();
  assert.equal(f.frames.size, 1, 'scroll events coalesce into one frame');
  f.flushFrames();
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-2']);
  f.controller.destroy();
});

test('large scroll jumps release distant categories and cancel their retention', () => {
  const f = galleryFixture();
  f.scroll(600);
  f.scroll(4000);
  assert.deepEqual(f.selection.activeVideoIds, []);
  assert.deepEqual(f.selection.preloadedVideoIds, []);
  assert.equal(f.timers.size, 0);
  f.controller.destroy();
});

test('hidden tabs release all players and resume the visible category on return', () => {
  const f = galleryFixture();
  f.scroll(600);
  f.document.hidden = true;
  f.documentListeners.get('visibilitychange')();
  assert.deepEqual(f.selection.activeVideoIds, []);
  assert.deepEqual(f.selection.preloadedVideoIds, []);
  assert.equal(f.timers.size, 0);
  f.document.hidden = false;
  f.documentListeners.get('visibilitychange')();
  assert.deepEqual(f.selection.activeVideoIds, ['video-1']);
  f.windowListeners.get('pagehide')();
  assert.deepEqual(f.selection.activeVideoIds, []);
  f.windowListeners.get('pageshow')();
  assert.deepEqual(f.selection.activeVideoIds, ['video-1']);
  f.controller.destroy();
});

test('all category videos autoplay together; closing one does not pause its siblings', () => {
  const f = galleryFixture(1000, 4);
  f.scroll(600);
  assert.deepEqual(f.selection.activeVideoIds, ['video-1-1', 'video-1-2', 'video-1-3', 'video-1-4']);
  assert.deepEqual(f.selection.preloadedVideoIds, ['video-2-1', 'video-2-2', 'video-2-3', 'video-2-4']);
  f.controller.dismissVideo('video-1-1');
  assert.deepEqual(f.selection.activeVideoIds, ['video-1-2', 'video-1-3', 'video-1-4']);
  f.controller.selectVideo('video-1-1');
  assert.equal(f.selection.activeVideoIds.length, 4);
  f.controller.selectVideo('video-3-1');
  assert.equal(f.selection.activeSectionId, 'section-1', 'distant category cannot activate');
  f.scroll(2300);
  assert.deepEqual(f.selection.activeVideoIds, ['video-2-1', 'video-2-2', 'video-2-3', 'video-2-4']);
  f.controller.destroy();
});

test('cleanup cancels retention, pending scroll frames, observers, and event listeners', () => {
  const f = galleryFixture();
  f.scroll(600);
  f.scroll(1400);
  f.windowListeners.get('scroll')();
  f.controller.destroy();
  assert.equal(f.timers.size, 0);
  assert.equal(f.frames.size, 0);
  assert(f.observers.every(observer => observer.disconnected));
  assert.equal(f.windowListeners.size, 0);
  assert.equal(f.documentListeners.size, 0);
});

test('YouTube API is requested once, shared, and recoverable after network failure', async () => {
  const env = environment();
  const scripts = [];
  env.document.createElement = () => ({ remove() { this.removed = true; } });
  env.document.head = { appendChild(script) { scripts.push(script); } };
  const { loadYouTubeAPI } = loadModule('src/lib/youtube-player.ts', env.globals).exports;
  const first = loadYouTubeAPI();
  const second = loadYouTubeAPI();
  assert.equal(first, second);
  assert.equal(scripts.length, 1);
  const rejected = assert.rejects(first, /could not load/);
  scripts[0].onerror();
  await rejected;
  assert(scripts[0].removed);
  const retry = loadYouTubeAPI();
  assert.equal(scripts.length, 2);
  const api = { Player: function Player() {} };
  env.window.YT = api;
  env.window.onYouTubeIframeAPIReady();
  assert.equal(await retry, api);
  assert.equal(await loadYouTubeAPI(), api);
  assert.equal(env.timers.size, 0);
});

function playerFixture(apiDelay) {
  const env = environment();
  const slots = [];
  const layouts = [];
  const effects = [];
  const instances = [];
  const registered = new Map();
  let cursor = 0;
  const hook = queue => (fn, deps) => {
    const i = cursor++;
    const previous = slots[i];
    if (!previous || deps.some((value, index) => value !== previous.deps[index])) {
      const next = { deps, cleanup: undefined };
      slots[i] = next;
      queue.push(() => { previous?.cleanup?.(); next.cleanup = fn(); });
    }
  };
  const react = {
    useState(initial) {
      const i = cursor++;
      if (!(i in slots)) slots[i] = initial;
      return [slots[i], value => { slots[i] = typeof value === 'function' ? value(slots[i]) : value; }];
    },
    useRef(initial) { const i = cursor++; return slots[i] ??= { current: initial }; },
    useCallback(fn, deps) {
      const i = cursor++;
      if (!slots[i] || deps.some((value, index) => value !== slots[i].deps[index])) slots[i] = { fn, deps };
      return slots[i].fn;
    },
    useLayoutEffect: hook(layouts),
    useEffect: hook(effects),
  };
  const host = { dataset: {}, children: [], appendChild(child) { this.children.push(child); }, replaceChildren() { this.children = []; } };
  env.document.createElement = () => ({});
  const api = {
    Player: class {
      constructor(element, options) { this.options = options; this.calls = []; this.iframe = {}; instances.push(this); }
      playVideo() { this.calls.push('play'); }
      pauseVideo() { this.calls.push('pause'); }
      mute() { this.calls.push('mute'); }
      destroy() { this.calls.push('destroy'); }
      getIframe() { return this.iframe; }
      getCurrentTime() { return this.currentTime ?? this.options.playerVars.start; }
      getPlayerState() { return this.state ?? 5; }
      getVideoLoadedFraction() { return this.loadedFraction ?? 0; }
      seekTo(seconds, allowSeekAhead) { this.calls.push(['seek', seconds, allowSeekAhead]); this.currentTime = seconds; }
    },
  };
  const loaded = loadModule('src/components/landing/Projects.tsx', env.globals, {
    react,
    'lucide-react': new Proxy({}, { get: (_, name) => String(name) }),
    '@/lib/portfolio-playback': {},
    '@/lib/youtube-player': { loadYouTubeAPI: () => apiDelay ?? Promise.resolve(api) },
  });
  const VideoPlayer = vm.runInContext('VideoPlayer', loaded.context);
  let props = {
    video: { videoId: '6TScpy8ZP5k', title: 'Sarah', startSeconds: 21 },
    isActive: false, shouldLoad: false, onPlay() {}, onStop() {},
    canPlay: () => props.isActive,
    registerPlayer(id, player) { if (player) registered.set(id, player); else registered.delete(id); },
  };
  function render(next = {}) {
    props = { ...props, ...next };
    cursor = 0;
    const tree = VideoPlayer(props);
    const children = Array.isArray(tree.props.children) ? tree.props.children : [tree.props.children];
    const hostElement = children.find(child => child?.props?.ref);
    if (hostElement) hostElement.props.ref.current = host;
    layouts.splice(0).forEach(run => run());
    effects.splice(0).forEach(run => run());
    return tree;
  }
  return { render, instances, registered, api, host };
}

test('standby stays paused, promotion reuses its player, and leaving destroys it', async () => {
  const f = playerFixture();
  f.render();
  await Promise.resolve();
  assert.equal(f.instances.length, 0, 'ordinary thumbnail never loads a player');
  f.render({ shouldLoad: true });
  await Promise.resolve();
  const player = f.instances[0];
  assert.equal(player.options.playerVars.autoplay, 0);
  assert.equal(player.options.playerVars.mute, 1);
  assert.equal(player.options.playerVars.start, 21);
  player.options.events.onReady({ target: player });
  assert.deepEqual(player.calls, ['mute', 'pause']);
  assert.equal(player.iframe.tabIndex, -1);
  player.options.events.onStateChange({ target: player, data: 1 });
  assert.equal(player.calls.at(-1), 'pause', 'a standby playback event is stopped');
  f.render({ isActive: true });
  assert.equal(f.instances.length, 1, 'promotion reuses the warmed player');
  assert.deepEqual(player.calls.slice(-2), ['mute', 'play']);
  assert.equal(player.iframe.tabIndex, 0);
  assert.equal(player.iframe.title, 'Sarah');
  assert.equal(f.registered.size, 1);
  f.render({ isActive: false, shouldLoad: false });
  assert.equal(player.calls.at(-1), 'destroy');
  assert.equal(f.registered.size, 0);
  assert.equal(f.host.children.length, 0);
  const count = player.calls.length;
  player.options.events.onReady({ target: player });
  assert.equal(player.calls.length, count, 'late ready event cannot revive a released player');
});

test('scrolling away while API is still loading prevents a stale player from being created', async () => {
  let resolve;
  const delayed = new Promise(done => { resolve = done; });
  const f = playerFixture(delayed);
  f.render({ shouldLoad: true, isActive: true });
  f.render({ shouldLoad: false, isActive: false });
  resolve(f.api);
  await Promise.resolve();
  assert.equal(f.instances.length, 0);
  assert.equal(f.registered.size, 0);
});

test('late ready and playback events cannot play after synchronous ownership has changed', async () => {
  const f = playerFixture();
  let allowed = true;
  f.render({ shouldLoad: true, isActive: true, canPlay: () => allowed });
  await Promise.resolve();
  const player = f.instances[0];
  allowed = false;
  player.options.events.onReady({ target: player });
  assert(!player.calls.includes('play'));
  player.options.events.onStateChange({ target: player, data: 1 });
  assert.equal(player.calls.at(-1), 'pause');
  f.render({ shouldLoad: false, isActive: false });
});

test('active embeds start muted with native autoplay, stay visible, and keep the poster until PLAYING', async () => {
  const f = playerFixture();
  const children = tree => tree.props.children.flat(Infinity).filter(Boolean);
  let tree = f.render({ shouldLoad: true, isActive: true });
  assert(!children(tree).find(child => child.props?.ref).props.className.includes('is-preloading'), 'active iframe must be visible before ready');
  await Promise.resolve();
  const player = f.instances[0];
  assert.equal(player.options.playerVars.autoplay, 1);
  assert.equal(player.options.playerVars.mute, 1);
  assert.equal(player.options.playerVars.playsinline, 1);
  player.options.events.onReady({ target: player });
  assert(!player.calls.includes('play'), 'ready handler must wait for the ready render to commit');
  tree = f.render();
  assert.deepEqual(player.calls.slice(-2), ['mute', 'play']);
  assert(children(tree).some(child => child.type === 'button' && child.props.className.includes('video-poster')), 'API readiness alone must not expose a black player');
  player.options.events.onStateChange({ target: player, data: 1 });
  tree = f.render();
  assert(!children(tree).some(child => child.type === 'button' && child.props.className.includes('video-poster')), 'poster clears only after actual playback');
  f.render({ shouldLoad: false, isActive: false });
});

test('standby requests media at its resume point only after PAUSED, once, without playing', async () => {
  const f = playerFixture();
  f.render({ shouldLoad: true });
  await Promise.resolve();
  const player = f.instances[0];
  player.options.events.onReady({ target: player });
  assert(!player.calls.some(call => Array.isArray(call)), 'do not seek from CUED because it would play');
  player.state = 2;
  player.options.events.onStateChange({ target: player, data: 2 });
  assert.deepEqual(player.calls.at(-1), ['seek', 21, true]);
  player.options.events.onStateChange({ target: player, data: 2 });
  assert.equal(player.calls.filter(call => Array.isArray(call)).length, 1);
  assert(!player.calls.includes('play'));
  player.loadedFraction = 0.05;
  player.options.events.onStateChange({ target: player, data: 3 });
  assert.equal(f.host.dataset.bufferedFraction, '0.05');
  f.render({ isActive: true });
  assert.deepEqual(player.calls.slice(-2), ['mute', 'play'], 'activation never waits for a buffer percentage');
  assert.equal(f.instances.length, 1);
  f.render({ shouldLoad: false, isActive: false });
});

test('retained players resume in place and evicted players restore their saved position', async () => {
  const f = playerFixture();
  f.render({ shouldLoad: true, isActive: true });
  await Promise.resolve();
  const first = f.instances[0];
  first.options.events.onReady({ target: first });
  f.render();
  first.options.events.onStateChange({ target: first, data: 1 });
  first.currentTime = 64.75;
  first.state = 2;
  f.render({ isActive: false });
  assert(!first.calls.includes('destroy'));
  assert(!first.calls.some(call => Array.isArray(call)), 'retained buffer must not be reset with a seek');
  f.render({ isActive: true });
  assert.equal(f.instances.length, 1);
  assert.equal(first.getCurrentTime(), 64.75);
  first.currentTime = 82.6;
  f.render({ isActive: false, shouldLoad: false });
  assert.equal(first.calls.at(-1), 'destroy');
  f.render({ shouldLoad: true, isActive: true });
  await Promise.resolve();
  assert.equal(f.instances[1].options.playerVars.start, 82);
  f.render({ isActive: false, shouldLoad: false });
});

test('waiting/buffering events keep the current player and do not restart its stream', async () => {
  const f = playerFixture();
  f.render({ shouldLoad: true, isActive: true });
  await Promise.resolve();
  const player = f.instances[0];
  player.options.events.onReady({ target: player });
  f.render();
  player.options.events.onStateChange({ target: player, data: 1 });
  f.render();
  const playCalls = player.calls.filter(call => call === 'play').length;
  player.options.events.onStateChange({ target: player, data: 3 });
  let tree = f.render();
  assert.equal(tree.props['aria-busy'], true);
  player.options.events.onStateChange({ target: player, data: 3 });
  f.render();
  assert.equal(f.instances.length, 1);
  assert.equal(player.calls.filter(call => call === 'play').length, playCalls);
  player.options.events.onStateChange({ target: player, data: 1 });
  tree = f.render();
  assert.equal(tree.props['aria-busy'], false);
  f.render({ isActive: false, shouldLoad: false });
});
