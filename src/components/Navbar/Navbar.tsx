'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / docHeight) * 100;
            setScrollProgress(progress);

            const sections = navLinks.map(link => link.href.slice(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div
                className={styles.scrollProgress}
                style={{ width: `${scrollProgress}%` }}
            />
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${theme === 'light' ? styles.light : ''}`}>
                <div className={styles.container}>
                    <ThemeToggle />

                    <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <a
                                    href={href}
                                    className={`${styles.navLink} ${activeSection === href.slice(1) ? styles.active : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a href="#contact" className={styles.ctaButton}>
                        Let's Connect
                    </a>

                    <button
                        className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </>
    );
}
