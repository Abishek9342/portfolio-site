'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Projects.module.css';

const projects = [
    {
        id: 1,
        title: 'PharmaGraph',
        subtitle: 'Pharmaceutical Knowledge Graph',
        description: 'AI-powered pharmaceutical impurity analysis system using Neo4j knowledge graphs. Built graph-based recommendation logic to suggest optimal impurity testing methodologies.',
        longDescription: 'Modeled complex relationships between drug substances, impurities, analytical methods, and laboratory instruments. Designed API-driven workflows to deliver explainable, traceable AI recommendations for regulated pharmaceutical environments.',
        tags: ['Neo4j', 'Knowledge Graph', 'Python', 'AI', 'FastAPI'],
        features: [
            'Drug-impurity relationship modeling',
            'Graph-based recommendation engine',
            'HPLC, GC, UHPLC methodology selection',
            'Explainable AI for pharma compliance'
        ],
        gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        accentColor: '#6366f1',
        category: 'AI/ML',
    },
    {
        id: 2,
        title: 'Deepkore AI Assistant',
        subtitle: 'Sales Document Intelligence',
        description: 'FastAPI + Next.js AI assistant for semantic search and intelligent retrieval from sales documents with AWS cloud deployment.',
        longDescription: 'Implemented embedding-based retrieval pipelines using Sentence-Transformers and ChromaDB. Integrated AWS Bedrock for secure LLM inference and deployed on AWS EC2 and Amplify for production reliability.',
        tags: ['FastAPI', 'Next.js', 'ChromaDB', 'AWS Bedrock', 'RAG'],
        features: [
            'Semantic document search',
            'Embedding-based retrieval',
            'AWS Bedrock LLM integration',
            'Production AWS deployment'
        ],
        gradient: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
        accentColor: '#22d3ee',
        category: 'Full-Stack',
        link: 'https://frontend.d17nye2wmak12u.amplifyapp.com/',
    },
    {
        id: 3,
        title: 'Deepkore AI',
        subtitle: 'Enterprise Knowledge Chatbot',
        description: 'Enterprise chatbot that converts company documents into searchable knowledge with contextual retrieval and modern web interface.',
        longDescription: 'Designed document ingestion, embedding pipelines, and contextual retrieval logic. Enabled fast, accurate employee access to internal information through a responsive web interface.',
        tags: ['Chatbot', 'Embeddings', 'Enterprise', 'RAG', 'Python'],
        features: [
            'Document-to-knowledge conversion',
            'Contextual retrieval system',
            'Production deepkore.ai deployment',
            'Fast information access'
        ],
        gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
        accentColor: '#a855f7',
        category: 'AI/ML',
        link: 'https://deepkore.ai',
    },
    {
        id: 4,
        title: 'SmartLeaf',
        subtitle: 'Plant Disease Classification',
        description: 'Intelligent plant disease classification using CNN, AlexNet, and VGG16 architectures with real-time predictions via Streamlit interface.',
        longDescription: 'Developed comprehensive preprocessing pipeline and trained multiple deep learning models. Implemented evaluation metrics and deployed Streamlit interface for real-time disease predictions from leaf images.',
        tags: ['CNN', 'VGG16', 'AlexNet', 'Streamlit', 'TensorFlow'],
        features: [
            'Multi-model architecture',
            'Real-time image prediction',
            'Streamlit web interface',
            'Image preprocessing pipeline'
        ],
        gradient: 'linear-gradient(135deg, #10b981 0%, #22d3ee 100%)',
        accentColor: '#10b981',
        category: 'Deep Learning',
        link: 'https://github.com/Abishek9342/Plants-Disease-Prediction',
    },
    {
        id: 5,
        title: 'YOLO-ASCA: A Rule-Based Framework for Identifying Safety Risks in Construction Management',
        subtitle: 'Construction Safety Compliance',
        description: 'YOLO-ASCA integrates high-accuracy object detection with semantic rule-based validation for construction site safety monitoring.',
        longDescription: 'Enhances construction safety by detecting safety gear, monitoring worker behavior, and automatically assessing compliance with predefined safety standards to prevent hazards.',
        tags: ['YOLO', 'BiGRU', 'Computer Vision', 'Safety AI'],
        features: [
            'Safety gear detection',
            'Worker behavior monitoring',
            'Rule-based compliance validation',
            'Real-time hazard prevention'
        ],
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        accentColor: '#f59e0b',
        category: 'Computer Vision',
        badge: 'Published',
        link: 'https://ieeexplore.ieee.org/document/11005349',
    },
];

export default function Projects() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [filter, setFilter] = useState<string>('All');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const categories = ['All', ...new Set(projects.map(p => p.category))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

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
        <section id="projects" className={styles.projects} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.sectionTag}>work.</span>
                    <h2 className={styles.title}>
                        Projects that
                        <span className={styles.gradient}> make an impact</span>
                    </h2>
                    <p className={styles.subtitle}>
                        End-to-end AI solutions from concept to production deployment
                    </p>

                    {/* Filter Tabs */}
                    <div className={styles.filterTabs}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`${styles.filterTab} ${filter === cat ? styles.active : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className={`${styles.card} ${activeProject === project.id ? styles.expanded : ''}`}
                            style={{
                                animationDelay: `${idx * 0.1}s`,
                                '--accent': project.accentColor,
                                cursor: project.link ? 'pointer' : 'default'
                            } as React.CSSProperties}
                            onMouseEnter={() => setActiveProject(project.id)}
                            onMouseLeave={() => setActiveProject(null)}
                            onClick={() => project.link && window.open(project.link, '_blank')}
                        >
                            {project.badge && (
                                <span className={styles.badge}>
                                    {project.badge}
                                </span>
                            )}

                            {/* Card Header */}
                            <div className={styles.cardHeader} style={{ background: project.gradient }}>
                                <div className={styles.headerContent}>
                                    <div className={styles.categoryBadge}>{project.category}</div>
                                </div>
                                <div className={styles.headerGlow}></div>
                            </div>

                            {/* Card Content */}
                            <div className={styles.cardContent}>
                                <div className={styles.titleRow}>
                                    <h3>{project.title}</h3>
                                    <p className={styles.projectSubtitle}>{project.subtitle}</p>
                                </div>

                                <p className={styles.description}>
                                    {activeProject === project.id ? project.longDescription : project.description}
                                </p>

                                <ul className={styles.features}>
                                    {project.features.map((feature, i) => (
                                        <li key={i}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>

                                {/* Action Button - Only for Deepkore AI Assistant */}
                                {project.link && (
                                    <div className={styles.cardActions}>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} onClick={(e) => e.stopPropagation()}>
                                            Visit Website
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
