'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.sectionTag}>about.</span>
                    <h2 className={styles.title}>
                        Transforming ideas into
                        <span className={styles.gradient}> intelligent systems</span>
                    </h2>
                </div>

                <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                    <div className={styles.textContent}>
                        <div className={styles.introCard}>
                            <p className={styles.description}>
                                I'm an <strong>AI Engineer</strong> with hands-on experience building
                                production-grade AI systems and intelligent SaaS platforms. My expertise
                                spans <strong>embeddings, AI orchestration, knowledge graphs, and multi-modal AI</strong>.
                            </p>

                            <p className={styles.description}>
                                I completed my B.Tech in Artificial Intelligence and Data Science at
                                Mepco Schlenk Engineering College. At Deepkore Technologies, I've architected
                                end-to-end AI pipelines—from data ingestion and model integration to API
                                deployment and cloud infrastructure.
                            </p>
                        </div>

                        {/* Highlights Grid */}
                        <div className={styles.highlightsGrid}>
                            <div className={styles.highlightCard}>
                                <div className={styles.highlightIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                                <div className={styles.highlightContent}>
                                    <h4>End-to-End AI Pipelines</h4>
                                    <p>From data ingestion to production deployment</p>
                                </div>
                            </div>

                            <div className={styles.highlightCard}>
                                <div className={styles.highlightIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                                    </svg>
                                </div>
                                <div className={styles.highlightContent}>
                                    <h4>Knowledge Graphs</h4>
                                    <p>Neo4j-powered intelligent systems</p>
                                </div>
                            </div>

                            <div className={styles.highlightCard}>
                                <div className={styles.highlightIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                        <line x1="12" y1="22.08" x2="12" y2="12" />
                                    </svg>
                                </div>
                                <div className={styles.highlightContent}>
                                    <h4>Cloud Infrastructure</h4>
                                    <p>AWS Bedrock, EC2 & Amplify</p>
                                </div>
                            </div>

                            <div className={styles.highlightCard}>
                                <div className={styles.highlightIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                </div>
                                <div className={styles.highlightContent}>
                                    <h4>Published Research</h4>
                                    <p>WiSPNET Conference paper</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className={styles.cta}>
                            <a href="/Abishek_Sridharan_Resume.pdf" download className={styles.downloadBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Resume
                            </a>
                            <a href="#contact" className={styles.contactLink}>
                                Let's Connect
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
