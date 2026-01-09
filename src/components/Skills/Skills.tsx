'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'AI & Machine Learning',
        color: '#6366f1',
        skills: [
            'LangChain',
            'LangGraph',
            'TensorFlow',
            'PyTorch',
        ],
    },
    {
        title: 'Programming',
        color: '#22d3ee',
        skills: [
            'Python',
            'JavaScript',
            'TypeScript',
            'C/C++',
        ],
    },
    {
        title: 'Databases',
        color: '#a855f7',
        skills: [
            'Neo4j',
            'MongoDB',
            'Vector DBs',
        ],
    },
    {
        title: 'Backend & APIs',
        color: '#10b981',
        skills: [
            'FastAPI',
            'REST APIs',
            'Postman',
            'GraphQL',
        ],
    },
    {
        title: 'Cloud & DevOps',
        color: '#f59e0b',
        skills: [
            'AWS Bedrock',
            'AWS EC2',
            'AWS Amplify',
        ],
    },
];

export default function Skills() {
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
        <section id="skills" className={styles.skills} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.sectionTag}>skills.</span>
                    <h2 className={styles.title}>
                        Technologies I <span className={styles.gradient}>work with</span>
                    </h2>
                    <p className={styles.subtitle}>
                        A comprehensive toolkit for building enterprise-grade AI solutions
                    </p>
                </div>

                <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
                    {skillCategories.map((category, idx) => (
                        <div
                            key={category.title}
                            className={styles.card}
                            style={{
                                animationDelay: `${idx * 0.1}s`,
                                '--card-color': category.color
                            } as React.CSSProperties}
                        >
                            <div className={styles.cardHeader}>
                                <h3>{category.title}</h3>
                            </div>

                            <div className={styles.skillList}>
                                {category.skills.map((skill) => (
                                    <span key={skill} className={styles.skillItem}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
