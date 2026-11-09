import { ArrowUpRight, Film, Scissors, Palette, AudioLines, Sparkles, Zap } from 'lucide-react';

const skills = [
  { icon: Scissors, title: 'Video editing', description: 'From the first cut to the final frame. Premiere Pro, Final Cut Pro & DaVinci Resolve.' },
  { icon: Film, title: 'Motion graphics', description: 'Give your ideas a little movement. After Effects, Cinema 4D & Blender.' },
  { icon: Palette, title: 'Color grading', description: 'Set the mood with cinematic looks, thoughtful color and a consistent finish.' },
  { icon: AudioLines, title: 'Sound design', description: 'Every beat in the right place. Audio mixing, effects & music synchronization.' },
  { icon: Sparkles, title: 'VFX & compositing', description: 'A little movie magic. Visual effects and seamless compositing.' },
  { icon: Zap, title: 'Fast delivery', description: 'A smooth process, clear communication and edits delivered on time.' },
];

export function Skills() {
  return <section id="skills" className="editorial-section skills-section">
    <div className="section-heading"><div><p className="eyebrow">02 / What I bring to the timeline</p><h2 className="display section-title">THE SKILL SET<span>✳</span></h2></div><p>Good instincts.<br />Even better execution.</p></div>
    <div className="skills-grid">{skills.map(({ icon: Icon, title, description }, i) => <article className="skill-card" key={title}>
      <div className="skill-top"><Icon size={28} strokeWidth={1.5} /><span className="eyebrow">0{i + 1}</span></div>
      <h3>{title}<ArrowUpRight size={20} /></h3><p>{description}</p>
    </article>)}</div>
  </section>;
}
