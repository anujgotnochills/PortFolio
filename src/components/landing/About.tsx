export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Image */}
          <div className="relative">
            <div className="aspect-[3/4] bg-card rounded-3xl overflow-hidden border border-border">
              <img
                src="/about-image.jpg"
                alt="Anuj - Video Editor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate video editor with over 2 years of experience creating 
                  engaging content for brands, creators, and businesses.
                </p>
                <p>
                  I specialize in transforming raw footage into compelling stories that 
                  captivate audiences. From short-form content for social media to 
                  long-form documentaries, I bring creativity and technical expertise 
                  to every project.
                </p>
                <p>
                  My approach combines storytelling with cutting-edge editing techniques 
                  to deliver videos that not only look great but also achieve your goals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">60+</h3>
                <p className="text-foreground">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">99%</h3>
                <p className="text-foreground">Client Satisfaction</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">1+</h3>
                <p className="text-foreground">Years Experience</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">50+</h3>
                <p className="text-foreground">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
