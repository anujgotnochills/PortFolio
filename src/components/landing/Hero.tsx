import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="poster-hero" aria-labelledby="hero-title">
      <p className="eyebrow hero-overline">Independent video editor & visual storyteller</p>
      <div className="hero-stage">
        <div className="hero-greeting">
          <h1 id="hero-title" className="display hero-hello">HELLO<span className="hello-period">.</span><span className="sr-only"> I'm Anuj, a video editor and visual storyteller.</span></h1>
          <p className="hero-code">{'{{ i’m anuj }}'}<span className="type-cursor" aria-hidden="true" /></p>
        </div>
        <div className="hero-portrait">
          <img src="/portrait-suit-cutout.png" alt="Anuj smiling in a classic black suit" className="portrait-image" fetchPriority="high" width="828" height="1200" />
          <svg className="portrait-doodles" viewBox="0 0 828 1200" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden="true" focusable="false">
            <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Contours follow the outside of the shoulders and sleeves. */}
              <path d="M88 450C28 482 9 550-9 628S-42 789-36 870S-7 1033 27 1106" />
              <path d="M692 456C766 488 789 574 812 653S875 834 864 925S829 1062 809 1143" />
              <path d="M-57 779C-66 841-63 900-47 948M891 900C889 955 873 1005 853 1045" />
              {/* Airy accents sit in the transparent space beside the head. */}
              <path d="M226 192C211 173 182 184 188 205C193 221 213 235 226 244C239 235 259 221 264 205C270 184 241 173 226 192Z" />
              <path d="M165 293V349M137 321H193M145 301L185 341M145 341L185 301" />
              <path d="M699 217C748 237 773 278 765 334M751 321L765 337L779 320" />
              <path d="M764 379V421M743 400H785M749 385L779 415M749 415L779 385" />
            </g>
            <text x="38" y="105" className="portrait-caption" fill="currentColor" transform="rotate(-8 38 105)">made to move.</text>
          </svg>
        </div>
        <div className="hero-summary">
          <p className="hero-note">A little imagination.<br />A whole lot of good edits.</p>
          <div className="hero-actions">
            <Link className="pill-button" href="#projects">Explore my work <ArrowDown size={17} /></Link>
            <Link className="text-link" href="https://wa.me/8447836894" target="_blank" rel="noopener noreferrer">Let's create <ArrowUpRight size={17} /></Link>
          </div>
          <div className="meet-description"><span>A VIDEO EDITOR. A STORYTELLER. YOUR NEXT CREATIVE PARTNER.</span><p>Turning raw clips into stories you feel.</p></div>
        </div>
      </div>
      <div className="hero-meet">
        <span className="display meet-label">MEET</span>
        <span className="display hero-name">ANUJ</span>
      </div>
      <div className="hero-bottom"><span><i /> Available for creative collaborations</span><Link href="#projects">Scroll for the good stuff <ArrowDown size={14} /></Link></div>
    </section>
  );
}
