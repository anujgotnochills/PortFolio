import { Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/20">
      <div className="container flex flex-col items-center justify-between gap-6 py-12 md:flex-row px-8">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Anuj - Video Editor. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="https://wa.me/8447836894"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">WhatsApp</span>
          </Link>
          <Link
            href="https://www.youtube.com/@anujgotnochills"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Youtube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            href="#contact"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
