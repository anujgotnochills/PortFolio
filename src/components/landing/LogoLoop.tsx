const tools = [
  { name: 'Premiere Pro', logo: '/software-logos/premiere-pro.webp' },
  { name: 'After Effects', logo: '/software-logos/after-effects.webp' },
  { name: 'DaVinci Resolve', logo: '/software-logos/davinciresolve.svg' },
  { name: 'Photoshop', logo: '/software-logos/photoshop.webp' },
  { name: 'Blender', logo: '/software-logos/blender.svg' },
  { name: 'Cinema 4D', logo: '/software-logos/cinema4d.svg' },
];

export function LogoLoop() {
  return (
    <section className="tool-strip" aria-label="Editing tools">
      <span className="eyebrow tool-strip-label">My creative toolkit</span>
      <div className="tool-marquee">
        <div className="tool-track">
          {[0, 1].map(copy => (
            <div className="tool-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {tools.map(tool => (
                <div className="tool-item" key={tool.name}>
                  <img src={tool.logo} alt={copy === 0 ? tool.name : ''} title={tool.name} width="64" height="64" loading="lazy" />
                  <span className="tool-divider" aria-hidden="true">✳</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
