import { AlignCenter } from "lucide-react";

export function Projects() {
  // SHORT VIDEOS - Replace videoId with your YouTube video IDs
  const shortVideos = [
    {
      title: "Short Form Content",
      videoId: "TTAIMgm2O9A", // <-- CHANGE THIS: YouTube video ID
      description: "Engaging short-form content"
    },
    {
      title: "Creative Edit",
      videoId: "qJJ60OzZ-Mo", // <-- CHANGE THIS: YouTube video ID
      description: "Creative storytelling"
    },
    {
      title: "Viral Short",
      videoId: "Ri9zFMqUcdE", // <-- CHANGE THIS: YouTube video ID
      description: "Viral content creation"
    },
    {
      title: "Trending Content",
      videoId: "oLXRm6JUjis", // <-- CHANGE THIS: YouTube video ID
      description: "Trending video edit"
    }
  ];

  // LONG VIDEOS - Replace videoId with your YouTube video IDs or Instagram embed URLs
  const longVideos = [ 
    {
      title: "Live Stream Highlights",
      videoId: "hSUk6SpPLZg", // <-- CHANGE THIS: YouTube video ID
      description: "Professional live stream editing"
    },
    // {
    //   title: "Documentary Style",
    //   videoId: "bl08pGBUSlA", // <-- CHANGE THIS: YouTube video ID
    //   description: "Long-form documentary content"
    // },
    // Example Instagram video - uncomment and replace with your Instagram post ID
    // {
    //   title: "Instagram Long Form",
    //   videoId: "https://www.instagram.com/p/DPnyLkHEuah/", // <-- Instagram embed URL
    //   description: "Instagram long-form video content",
    //   platform: "instagram"
    // }
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">My Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my video editing work across different formats
          </p>
        </div>
        
        {/* Short Videos Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-3xl font-bold text-primary">Short Videos</h3>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {shortVideos.map((project, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors group"
              >
                <div className="aspect-[9/16] relative bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${project.videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ border: 0 }}
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors mb-1">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Long Videos Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-3xl font-bold text-primary">Long Videos</h3>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {longVideos.map((project, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors group"
              >
                <div className="aspect-video relative bg-black">
                  {(project as any).platform === "instagram" ? (
                    <iframe
                      src={(project as any).videoId}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 0 }}
                    />
                  ) : (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${project.videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 0 }}
                    />
                  )}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Next Maybe Yours - Neon Text */}
          <div className="mt-12 text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary animate-pulse drop-shadow-[0_0_20px_rgba(190,242,100,0.8)]">
              Next Maybe Yours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
