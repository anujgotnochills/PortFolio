import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { portfolio, type PortfolioItem } from "@/lib/data";

const PortfolioCategory = ({ items }: { items: PortfolioItem[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {items.map((item) => (
      <Card
        key={item.id}
        className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
      >
        <CardHeader className="p-0">
          {item.image && (
            <div className="aspect-video relative">
              <Image
                src={item.image.imageUrl}
                alt={item.image.description}
                fill
                className="object-cover"
                data-ai-hint={item.image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="font-headline text-xl mb-2">
            {item.title}
          </CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardContent>
      </Card>
    ))}
  </div>
);

export function Portfolio() {
  return (
    <section id="portfolio" className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          My Work
        </h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          A selection of projects that showcase my skills and passion for
          editing.
        </p>
      </div>
      <Tabs defaultValue="commercial" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="narrative">Narrative</TabsTrigger>
          <TabsTrigger value="documentary">Documentary</TabsTrigger>
        </TabsList>
        <TabsContent value="commercial">
          <PortfolioCategory items={portfolio.commercial} />
        </TabsContent>
        <TabsContent value="narrative">
          <PortfolioCategory items={portfolio.narrative} />
        </TabsContent>
        <TabsContent value="documentary">
          <PortfolioCategory items={portfolio.documentary} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
