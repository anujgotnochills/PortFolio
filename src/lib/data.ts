import { PlaceHolderImages } from "./placeholder-images";
import type { ImagePlaceholder } from "./placeholder-images";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image?: ImagePlaceholder;
};

interface PortfolioData {
  commercial: PortfolioItem[];
  narrative: PortfolioItem[];
  documentary: PortfolioItem[];
}

export const portfolio: PortfolioData = {
  commercial: [
    {
      id: "1",
      title: "Project Alpha",
      description: "A fast-paced commercial for a leading tech brand.",
      image: PlaceHolderImages.find((img) => img.id === "commercial-1"),
    },
    {
      id: "2",
      title: "Project Beta",
      description: "Elegant visuals for a luxury fashion label.",
      image: PlaceHolderImages.find((img) => img.id === "commercial-2"),
    },
  ],
  narrative: [
    {
      id: "3",
      title: "The Escape",
      description: "A short film about a thrilling chase.",
      image: PlaceHolderImages.find((img) => img.id === "narrative-1"),
    },
    {
      id: "4",
      title: "Stillness",
      description: "A character study of a person in isolation.",
      image: PlaceHolderImages.find((img) => img.id === "narrative-2"),
    },
  ],
  documentary: [
    {
      id: "5",
      title: "Voices of the City",
      description: "Exploring the lives of urban dwellers.",
      image: PlaceHolderImages.find((img) => img.id === "documentary-1"),
    },
    {
      id: "6",
      title: "Wild Frontiers",
      description: "A journey through untouched landscapes.",
      image: PlaceHolderImages.find((img) => img.id === "documentary-2"),
    },
  ],
};

export const testimonials = [
  {
    id: "1",
    quote:
      "Their editing transformed our project. The attention to detail and storytelling is unparalleled. We couldn't be happier with the result.",
    name: "Jane Doe",
    company: "Director at Creative Visions",
  },
  {
    id: "2",
    quote:
      "A true professional. They are reliable, creative, and have an incredible eye for pacing and rhythm. Highly recommended for any project.",
    name: "John Smith",
    company: "Producer, Stellar Productions",
  },
  {
    id: "3",
    quote:
      "Working with them was a seamless experience. They understood our vision perfectly and delivered an edit that exceeded all expectations.",
    name: "Emily White",
    company: "Marketing Head, Brand Co.",
  },
];
