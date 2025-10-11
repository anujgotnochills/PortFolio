import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background">
      <div className="container flex h-24 items-center justify-between px-8">
        <Link href="/" className="text-3xl font-bold text-foreground">
          Portfolio
        </Link>
        <nav className="hidden md:flex items-center gap-12 text-lg">
          <Link
            href="#home"
            className="text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#skills"
            className="text-foreground transition-colors hover:text-primary"
          >
            My Skills
          </Link>
          <Link
            href="#projects"
            className="text-foreground transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="#testimonials"
            className="text-foreground transition-colors hover:text-primary"
          >
            Testimonial
          </Link>
        </nav>
      </div>
    </header>
  );
}
