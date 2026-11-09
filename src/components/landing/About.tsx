import { ArrowUpRight } from 'lucide-react';

export function About() {
  return <section id="about" className="editorial-section about-section">
    <div className="about-photo-wrap"><img src="/portrait-selfie-cutout.png" alt="Anuj in a black suit taking a mirror selfie" width="688" height="1200" loading="lazy" /><span className="handwritten">yep, that’s me!</span><span className="about-star" aria-hidden="true">✳</span></div>
    <div className="about-copy"><p className="eyebrow">03 / A little about the editor</p><h2 className="display section-title">MORE THAN<br />JUST A CUT.</h2>
      <p>Hey, I'm Anuj. I’m a video editor with 2+ years of experience making content for brands, creators, and businesses.</p>
      <p>My favorite part? Finding the story in the footage. Whether it’s a punchy reel, a property walkthrough, or a long-form film, I bring the rhythm, detail, and care that make it click.</p>
      <a className="text-link" href="https://wa.me/8447836894" target="_blank" rel="noopener noreferrer">Got an idea? I’m all ears <ArrowUpRight size={18} /></a>
    </div>
    <div className="about-stats">{[{value:'2+',label:'Years of experience'},{value:'60+',label:'Projects completed'},{value:'50+',label:'Happy clients'},{value:'99%',label:'Client satisfaction'}].map(stat => <div key={stat.label}><strong className="display">{stat.value}</strong><span>{stat.label}</span></div>)}</div>
  </section>;
}
