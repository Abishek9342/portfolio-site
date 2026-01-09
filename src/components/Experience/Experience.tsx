'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './Experience.module.css';

const experiences = [
    {
        role: 'AI Engineer',
        company: 'Deepkore Technologies',
        location: 'Onsite',
        period: 'Oct 2024 - Present',
        description: 'Building production-grade AI systems and intelligent SaaS platforms.',
        achievements: [
            'Architected internal chatbot reducing employee query resolution time by 60%',
            'Developed AI-powered pharmaceutical impurity testing system using Neo4j knowledge graphs',
            'Built FastAPI + Next.js AI assistant for semantic search in sales documents',
            'Integrated AWS Bedrock for secure LLM inference with production reliability',
        ],
        current: true,
    },
];

const education = {
    degree: 'B.Tech - Artificial Intelligence and Data Science',
    institution: 'Mepco Schlenk Engineering College',
    period: 'Oct 2021 - Apr 2025',
    highlights: [
        'Specialized in Machine Learning & Deep Learning architectures',
        'Published research paper at International WiSPNET Conference',
        'Developed multiple production-level AI projects',
        'Strong foundation in Python, TensorFlow, and PyTorch',
    ],
};

const publication = {
    title: 'YOLO-ASCA: A Rule-Based Framework for Identifying Safety Risks in Construction Management',
    conference: 'International Conference on Wireless Communications, Signal Processing and Networking (WiSPNET)',
    venue: 'SSN College of Engineering, Chennai',
    year: '2024',
    status: 'Published',
};

export default function Experience() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className={styles.experience} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.sectionTag}>experience.</span>
                    <h2 className={styles.title}>
                        Experience &
                        <span className={styles.gradient}> Education</span>
                    </h2>
                </div>

                <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                    {/* Timeline */}
                    <div className={styles.timeline}>
                        {/* Experience Cards */}
                        {experiences.map((exp, idx) => (
                            <div key={idx} className={styles.timelineCard}>
                                <div className={styles.cardWrapper}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardIcon}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                            </svg>
                                        </div>
                                        <div className={styles.cardMeta}>
                                            <span className={styles.period}>{exp.period}</span>
                                            <span className={styles.location}>{exp.location}</span>
                                        </div>
                                    </div>

                                    <div className={styles.cardBody}>
                                        <h3>{exp.role}</h3>
                                        <p className={styles.company}>{exp.company}</p>
                                        <p className={styles.description}>{exp.description}</p>

                                        <ul className={styles.achievements}>
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Education Card */}
                        <div className={styles.timelineCard}>
                            <div className={styles.cardWrapper}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    </div>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.period}>{education.period}</span>
                                    </div>
                                </div>

                                <div className={styles.cardBody}>
                                    <h3>{education.degree}</h3>
                                    <p className={styles.company}>{education.institution}</p>

                                    <ul className={styles.achievements}>
                                        {education.highlights.map((highlight, i) => (
                                            <li key={i}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Publication Card */}
                    <div className={styles.publicationCard}>
                        <div className={styles.pubContent}>
                            <div className={styles.pubHeader}>
                                <div className={styles.pubIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4>Research Publication</h4>
                                    <span className={styles.pubYear}>{publication.year}</span>
                                </div>
                                <div className={styles.pubStatus}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    {publication.status}
                                </div>
                            </div>

                            <h3 className={styles.pubTitle}>{publication.title}</h3>
                            <p className={styles.pubConference}>{publication.conference}</p>
                            <p className={styles.pubVenue}>{publication.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
