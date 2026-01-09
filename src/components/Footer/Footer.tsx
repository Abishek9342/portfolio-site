'use client';

import { useState, useEffect } from 'react';
import styles from './Footer.module.css';

const footerLinks = {
    navigation: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ],
    connect: [
        { name: 'GitHub', href: 'https://github.com', external: true },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/abishek-sridharan-7272562a5/', external: true },
        { name: 'Email', href: 'mailto:abishekahss12@gmail.com', external: false },
    ],
};

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2024);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Main Footer Content */}
                <div className={styles.mainContent}>
                    {/* Links Sections */}
                    <div className={styles.linksGrid}>
                        <div className={styles.linkSection}>
                            <h4>Navigation</h4>
                            <ul>
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkSection}>
                            <h4>Connect</h4>
                            <ul>
                                {footerLinks.connect.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            target={link.external ? '_blank' : undefined}
                                            rel={link.external ? 'noopener noreferrer' : undefined}
                                        >
                                            {link.name}
                                            {link.external && (
                                                <svg className={styles.externalIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        <span>© {currentYear} Abishek Sridharan. All rights reserved.</span>
                    </div>

                    <button onClick={scrollToTop} className={styles.scrollTop} aria-label="Scroll to top">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
