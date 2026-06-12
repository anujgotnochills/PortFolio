"use client";

import React from "react";

const softwares = [
  { name: "Adobe", src: "/software-logos/adobe.png" },
  { name: "After Effects", src: "/software-logos/after effects.png" },
  { name: "Claude", src: "/software-logos/claude.png" },
  { name: "Gemini", src: "/software-logos/gemini.png" },
  { name: "Higgsfield", src: "/software-logos/higgsfield.png" },
  { name: "Illustrator", src: "/software-logos/illastrator.png" },
  { name: "Kling AI", src: "/software-logos/kling.png" },
  { name: "Notion", src: "/software-logos/notion.png" },
  { name: "Photoshop", src: "/software-logos/photoshop.png" },
  { name: "Tool", src: "/software-logos/download.png" },
];

export function LogoLoop() {
  return (
    <section className="py-12 border-y border-border/40 bg-background overflow-hidden relative">
      <div className="container px-4 md:px-6 mb-8">
        <h2 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Software I Use for Editing
        </h2>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div 
          className="flex w-full overflow-hidden" 
          style={{"--gap": "2rem", gap: "var(--gap)"} as React.CSSProperties}
        >
          <div 
            className="flex shrink-0 justify-around items-center animate-marquee"
            style={{"--duration": "40s", gap: "var(--gap)"} as React.CSSProperties}
          >
            {softwares.map((software, index) => (
              <div key={`logo-1-${index}`} className="flex items-center justify-center transition-transform hover:scale-110">
                <div className="relative h-20 w-40 sm:h-24 sm:w-48 flex items-center justify-center">
                  <img 
                    src={software.src} 
                    alt={software.name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerText = software.name;
                      e.currentTarget.parentElement!.className = "text-xl font-bold text-muted-foreground whitespace-nowrap";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div 
            className="flex shrink-0 justify-around items-center animate-marquee"
            style={{"--duration": "40s", gap: "var(--gap)"} as React.CSSProperties}
            aria-hidden="true"
          >
            {softwares.map((software, index) => (
              <div key={`logo-2-${index}`} className="flex items-center justify-center transition-transform hover:scale-110">
                <div className="relative h-20 w-40 sm:h-24 sm:w-48 flex items-center justify-center">
                  <img 
                    src={software.src} 
                    alt={software.name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerText = software.name;
                      e.currentTarget.parentElement!.className = "text-xl font-bold text-muted-foreground whitespace-nowrap";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
