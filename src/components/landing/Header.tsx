'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'My Skills' },
  { href: '#about', label: 'About Me' },
  { href: '#testimonials', label: 'Testimonials' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hRef = useRef<HTMLElement>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        ref={hRef}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-xl bg-background/90 border-b border-border/50 shadow-lg'
          : 'backdrop-blur-md bg-background/60 border-b border-border/30'
          }`}
      >
        <div className="container flex h-16 md:h-20 lg:h-24 items-center justify-between px-4 sm:px-6 md:px-8">
          <Link
            href="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors z-[60] relative"
            onClick={handleLinkClick}
          >
            Anuj's Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-12 text-sm md:text-base lg:text-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground transition-all hover:text-primary font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors z-[60] relative"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <nav className="relative h-full flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="text-2xl sm:text-3xl font-bold text-foreground hover:text-primary transition-all transform hover:scale-110"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
