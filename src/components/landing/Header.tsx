import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg">
      <div className="container flex h-20 md:h-24 items-center justify-between px-6 md:px-8">
        <Link href="/" className="text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors">
          Anuj's Portfolio
        </Link>
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-base lg:text-lg">
          <Link
            href="#home"
            className="text-foreground transition-colors hover:text-primary font-medium"
          >
            Home
          </Link>
          <Link
            href="#skills"
            className="text-foreground transition-colors hover:text-primary font-medium"
          >
            My Skills
          </Link>
          <Link
            href="#projects"
            className="text-foreground transition-colors hover:text-primary font-medium"
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="text-foreground transition-colors hover:text-primary font-medium"
          >
            About Me
          </Link>
          <Link
            href="#testimonials"
            className="text-foreground transition-colors hover:text-primary font-medium"
          >
            Testimonial
          </Link>
        </nav>
      </div>
    </header>
  );
}
