'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'AI & Machine Learning',
        color: '#6366f1',
        skills: [
            { name: 'LangChain', level: 95 },
            { name: 'LangGraph', level: 90 },
            { name: 'TensorFlow', level: 85 },
            { name: 'PyTorch', level: 80 },
        ],
    },
    {
        title: 'Programming',
        color: '#22d3ee',
        skills: [
            { name: 'Python', level: 95 },
            { name: 'JavaScript', level: 75 },
            { name: 'TypeScript', level: 70 },
            { name: 'C/C++', level: 70 },
        ],
    },
    {
        title: 'Databases',
        color: '#a855f7',
        skills: [
            { name: 'Neo4j', level: 95 },
            { name: 'ChromaDB', level: 90 },
            { name: 'MongoDB', level: 85 },
            { name: 'Vector DBs', level: 90 },
        ],
    },
    {
        title: 'Backend & APIs',
        color: '#10b981',
        skills: [
            { name: 'FastAPI', level: 95 },
            { name: 'REST APIs', level: 90 },
            { name: 'Postman', level: 85 },
            { name: 'GraphQL', level: 70 },
        ],
    },
    {
        title: 'Cloud & DevOps',
        color: '#f59e0b',
        skills: [
            { name: 'AWS Bedrock', level: 90 },
            { name: 'AWS EC2', level: 85 },
            { name: 'AWS Amplify', level: 85 },
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
                                    <div key={skill.name} className={styles.skillItem}>
                                        <div className={styles.skillInfo}>
                                            <span className={styles.skillName}>{skill.name}</span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{
                                                    width: isVisible ? `${skill.level}%` : '0%',
                                                    background: category.color,
                                                    transitionDelay: `${idx * 0.1}s`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
