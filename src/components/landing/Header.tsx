'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useMobileDetection } from '@/hooks/useMobileDetection';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'My Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About Me' },
  { href: '#testimonials', label: 'Testimonial' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobile } = useMobileDetection();

  const hRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Menu Animation
  useEffect(() => {
    if (!isMobile) return;

    tlRef.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.inOut',
      })
      .from(linksRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out',
      }, '-=0.2');

  }, [isMobile]);

  // Toggle Menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      tlRef.current?.reverse();
    } else {
      tlRef.current?.play();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    tlRef.current?.reverse();
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
            className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors"
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
      {isMobile && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl opacity-0 translate-y-full pointer-events-none"
        >
          <nav
            ref={linksRef}
            className="relative h-full flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, index) => (
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
      )}
    </>
  );
}
