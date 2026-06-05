'use client';

import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <Link
        href="https://instagram.com/anujgotnochills"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 will-animate"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 md:w-7 md:h-7 text-white" />
        <span className="absolute right-full mr-4 px-3 py-1 bg-card border border-border/50 text-foreground text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
          @anujgotnochills
        </span>
      </Link>
      
      <Link
        href="https://wa.me/8447836894"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300 will-animate"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white fill-current" />
        <span className="absolute right-full mr-4 px-3 py-1 bg-card border border-border/50 text-foreground text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
          Chat on WhatsApp
        </span>
      </Link>
    </div>
  );
}
