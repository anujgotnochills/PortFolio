"use client";

export function Testimonials() {
  const testimonials = [
    {
      name: "Client",
      role: "Content Creator",
      content: "It was a good experience to let him make edit of my choice. I got a quick response and well mannered consultation. I got edit of my choice and my preference with any post-edit changes I need. Well recommended",
      screenshot: "/testimonials/client1.png" // Add your screenshot path here
    },
    {
      name: "Avinash Kumar",
      role: "Stream Designer",
      content: "Anuj is working so efficiently and delevered my video as per my satisfaction I am fully satisfied what I see in anuj that he doesn't know only editing briefly he knows that what to skip in video or what to continue in it that's important for a good editor, that's I liked as it is called professional",
      screenshot: "/testimonials/client2.png" // Add your screenshot path here
    },
    {
      name: "Client",
      role: "YouTuber",
      content: "Perfect work! Maine jo abhi dekha - it was exactly what I needed. Quick turnaround and professional quality. Highly impressed with the attention to detail.",
      screenshot: "/testimonials/client3.png" // Add your screenshot path here
    },
    {
      name: "Client",
      role: "Business Owner",
      content: "Thankyou so much for the amazing work! The video editing was top-notch and exceeded my expectations. Will surely work on future projects with more awesome experience and edits!",
      screenshot: "/testimonials/client4.png" // Add your screenshot path here
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            What <span className="text-primary">My Clients</span> Have to Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from satisfied clients
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors"
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-0">
                {/* Screenshot Section - Vertical */}
                <div className="relative aspect-[9/16] bg-muted max-h-[500px]">
                  <img
                    src={testimonial.screenshot}
                    alt={`${testimonial.name} testimonial`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop';
                    }}
                  />
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-primary mb-4">Client FeedBack</h3>
                  <p className="text-foreground leading-relaxed mb-6">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
