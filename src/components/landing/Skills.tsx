import { Video, Scissors, Sparkles, Zap, Film, Palette } from "lucide-react";

export function Skills() {
  const skills = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve"
    },
    {
      icon: Film,
      title: "Motion Graphics",
      description: "After Effects, Cinema 4D, Blender"
    },
    {
      icon: Palette,
      title: "Color Grading",
      description: "Professional color correction and cinematic looks"
    },
    {
      icon: Scissors,
      title: "Sound Design",
      description: "Audio mixing, sound effects, and music synchronization"
    },
    {
      icon: Sparkles,
      title: "VFX & Compositing",
      description: "Visual effects and advanced compositing techniques"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround without compromising quality"
    }
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container px-6 sm:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">My Skills</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise across the full video production pipeline
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:border-primary transition-colors group"
              >
                <div className="mb-3">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{skill.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
