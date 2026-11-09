export interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
  getCurrentTime(): number;
  getPlayerState(): number;
  getVideoLoadedFraction(): number;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
}

interface PlayerEvent { target: YouTubePlayer }

export interface YouTubeAPI {
  Player: new (element: HTMLElement, options: {
    videoId: string;
    playerVars: Record<string, string | number>;
    events: {
      onReady(event: PlayerEvent): void;
      onStateChange(event: PlayerEvent & { data: number }): void;
      onError(): void;
      onAutoplayBlocked(): void;
    };
  }) => YouTubePlayer;
}

type YouTubeWindow = Window & {
  YT?: YouTubeAPI;
  onYouTubeIframeAPIReady?: () => void;
};

let apiPromise: Promise<YouTubeAPI> | undefined;

// Shared by all cards, and requested only when a player is needed nearby.
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  const youtubeWindow = window as YouTubeWindow;
  if (youtubeWindow.YT?.Player) return Promise.resolve(youtubeWindow.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
    const previousReady = youtubeWindow.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    const finish = (error?: Error) => {
      clearTimeout(timeout);
      youtubeWindow.onYouTubeIframeAPIReady = previousReady;
      script.onerror = null;
      if (error) {
        script.remove();
        reject(error);
      } else if (youtubeWindow.YT?.Player) {
        resolve(youtubeWindow.YT);
      }
    };
    const timeout = window.setTimeout(() => finish(new Error('YouTube player timed out')), 15000);
    youtubeWindow.onYouTubeIframeAPIReady = () => {
      finish();
      previousReady?.();
    };
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => finish(new Error('YouTube player could not load'));
    document.head.appendChild(script);
  }).catch(error => {
    apiPromise = undefined;
    throw error;
  });
  return apiPromise;
}
