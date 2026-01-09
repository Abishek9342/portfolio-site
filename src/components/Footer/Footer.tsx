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
        { name: 'GitHub', href: 'https://github.com/Abishek9342', external: true },
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
