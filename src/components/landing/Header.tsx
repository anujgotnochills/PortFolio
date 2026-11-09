'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#projects', label: 'Work' },
  { href: '#about', label: 'About Me' },
  { href: '#skills', label: 'Skills' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="#home" className="signature" aria-label="Anuj, home" onClick={() => setIsOpen(false)}>Anuj<span>✳</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        <Link href="#contact" className="nav-contact">Contact <ArrowUpRight size={16} /></Link>
      </nav>
      <svg className="header-heart" viewBox="0 0 48 44" aria-hidden="true">
        <defs><pattern id="heart-stripes" width="48" height="4" patternUnits="userSpaceOnUse"><path d="M0 1H48" stroke="currentColor" strokeWidth="2" /></pattern></defs>
        <path d="M24 41 5 23C-7 10 10-7 24 7 38-7 55 10 43 23Z" fill="url(#heart-stripes)" />
      </svg>
      <button className="menu-toggle" type="button" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      {isOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        {[...navItems, { href: '#contact', label: 'Contact ↗' }].map(item => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>)}
      </nav>}
    </header>
  );
}
