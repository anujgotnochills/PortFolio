import Image from "next/image";
import { portfolio, type PortfolioItem } from "@/lib/data";

export function Portfolio() {
  const allItems = [
    ...portfolio.commercial,
    ...portfolio.narrative,
    ...portfolio.documentary,
  ];

  return (
    <section id="work" className="bg-secondary py-16 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            MY WORK
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allItems.map((item) => (
            <div key={item.id} className="group relative aspect-video overflow-hidden rounded-lg">
              {item.image && (
                <Image
                  src={item.image.imageUrl}
                  alt={item.image.description}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  data-ai-hint={item.image.imageHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                 <h3 className="text-xl font-bold text-white text-center">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
