import { Instagram, Youtube, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/20 py-6 sm:py-8">
      <div className="container px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
          © {new Date().getFullYear()} Anuj - Video Editor. All rights reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6 order-1 sm:order-2">
          <Link
            href="https://wa.me/8447836894"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20 p-2 rounded-full hover:bg-primary/10"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">WhatsApp</span>
          </Link>
          <Link
            href="https://www.youtube.com/@anujgotnochills"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-red-500 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 p-2 rounded-full hover:bg-red-500/10"
          >
            <Youtube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link
            href="mailto:anuj@example.com" // Update your email here if needed (couldn't see it in partial view)
            className="text-muted-foreground transition-all duration-300 hover:text-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 p-2 rounded-full hover:bg-blue-500/10"
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
