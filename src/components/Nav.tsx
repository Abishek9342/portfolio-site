import { useEffect, useState } from 'react';
import './Nav.css';

const links = [
  { href: '#top', id: 'top', label: 'Home' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#publications', id: 'publications', label: 'Publications' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export function Nav() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav-header">
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          Abishek<span className="nav-logo-dot">.</span>
        </a>
        <nav className="nav-links">
          {links.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className={active === link.id ? 'nav-link-active' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
