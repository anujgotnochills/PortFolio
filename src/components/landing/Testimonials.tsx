const testimonials = [
  { name: 'Mrs Bhuvesh', role: 'Content Creator', content: 'It was a good experience to let him make edit of my choice. I got a quick response and well mannered consultation. I got edit of my choice and my preference with any post-edit changes I need. Well recommended' },
  { name: 'Avinash Kumar', role: 'Business Owner', content: "Anuj is working so efficiently and delevered my video as per my satisfaction I am fully satisfied what I see in anuj that he doesn't know only editing briefly he knows that what to skip in video or what to continue in it that's important for a good editor, that's I liked as it is called professional" },
];

export function Testimonials() {
  return <section id="testimonials" className="editorial-section testimonials-section">
    <div className="section-heading"><div><p className="eyebrow">04 / Kind words, real people</p><h2 className="display section-title">LOVE NOTES.</h2></div><span className="handwritten">This part means a lot ♡</span></div>
    <div className="testimonial-grid">{testimonials.map(item => <figure className="testimonial-card" key={item.name}>
      <p className="eyebrow review-stars">Client feedback</p>
      <blockquote>“{item.content}”</blockquote><figcaption><span className="review-initial">{item.name.charAt(0)}</span><div><strong>{item.name}</strong><span>{item.role}</span></div><span className="review-quote" aria-hidden="true">”</span></figcaption>
    </figure>)}</div>
  </section>;
}
