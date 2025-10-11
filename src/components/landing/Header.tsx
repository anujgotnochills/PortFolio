import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-foreground">
          ANUJ
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
            <Link
              href="#work"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              WORK
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              ABOUT
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              CONTACT
            </Link>
          </nav>
          <Button asChild className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
             <Link href="#contact">GET IN TOUCH</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
