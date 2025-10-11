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
    <section id="skills" className="py-24 bg-background">
      <div className="container px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">My Skills</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise across the full video production pipeline
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-colors group"
              >
                <div className="mb-4">
                  <Icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
