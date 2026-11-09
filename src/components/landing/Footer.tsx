import { ArrowUpRight, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return <footer id="contact" className="contact-section">
    <p className="eyebrow">Have a story in mind?</p><h2 className="display">LET’S MAKE<br /><span>SOMETHING</span> GOOD.</h2>
    <div className="contact-action"><span className="handwritten">Your footage. Our next great story.</span><a className="pill-button light-button" href="https://wa.me/8447836894" target="_blank" rel="noopener noreferrer">Say hello <ArrowUpRight size={20} /></a></div>
    <div className="footer-bottom"><a href="#home" className="signature">Anuj<span>✳</span></a><span>© {new Date().getFullYear()} Anuj. Made with a little extra care.</span><div><a href="https://instagram.com/anujgotnochills" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20}/></a><a href="https://www.youtube.com/@anujgotnochills" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={22}/></a><a href="#home" className="back-top">Back to top ↑</a></div></div>
  </footer>;
}
