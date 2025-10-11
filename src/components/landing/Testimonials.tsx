import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      content: "Anuj transformed my raw footage into something truly spectacular. His attention to detail and creative vision exceeded all my expectations!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Marketing Director",
      content: "Working with Anuj was a breeze. Fast turnaround, professional quality, and great communication throughout the project.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "YouTuber",
      content: "I've worked with many editors, but Anuj stands out. He understands storytelling and knows exactly how to engage an audience.",
      rating: 5
    },
    {
      name: "Alex Kumar",
      role: "Business Owner",
      content: "The promotional video Anuj created for our company was phenomenal. It helped us increase engagement by 300%!",
      rating: 5
    },
    {
      name: "Lisa Martinez",
      role: "Influencer",
      content: "Anuj's editing style is unique and captivating. He always delivers on time and the quality is consistently excellent.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Podcast Host",
      content: "From concept to final delivery, Anuj made the entire process smooth and enjoyable. Highly recommend his services!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">What Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it - hear from satisfied clients
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
