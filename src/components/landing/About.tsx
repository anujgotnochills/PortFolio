import { Video, Scissors, Sparkles, Zap } from "lucide-react";

export function About() {
  const skills = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional editing with Adobe Premiere Pro and Final Cut Pro"
    },
    {
      icon: Scissors,
      title: "Motion Graphics",
      description: "Eye-catching animations using After Effects"
    },
    {
      icon: Sparkles,
      title: "Color Grading",
      description: "Cinematic color correction and grading"
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Quick delivery without compromising quality"
    }
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I'm a passionate video editor with over 2 years of experience creating 
            engaging content for brands, creators, and businesses. I specialize in 
            transforming raw footage into compelling stories that captivate audiences.
          </p>
        </div>
      </div>
    </section>
  );
}
