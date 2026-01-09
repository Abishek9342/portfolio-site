'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './Hero.module.css';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Animation logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Helper for Liquid Waves (Used for both themes now)
        const drawLiquidWave = (
            time: number,
            offsetY: number,
            amplitude: number,
            speed: number,
            colorStart: string,
            colorEnd: string
        ) => {
            ctx.beginPath();
            // Start higher up
            ctx.moveTo(0, canvas.height);

            // Draw the wave curve
            for (let x = 0; x <= canvas.width; x += 10) {
                const y = offsetY +
                    Math.sin(x * 0.002 + time * speed) * amplitude +
                    Math.sin(x * 0.005 + time * speed * 0.5) * (amplitude * 0.6);
                ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, offsetY - amplitude, 0, canvas.height);
            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(1, colorEnd);

            ctx.fillStyle = gradient;
            ctx.globalAlpha = 1;
            ctx.fill();
        };

        const animate = () => {
            const time = Date.now() * 0.001;

            // Clear canvas
            ctx.fillStyle = theme === 'light' ? '#f5f5f5' : '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (theme === 'light') {
                // --- LIGHT MODE COLORS ---
                // Layer 1 (Backmost)
                drawLiquidWave(time, canvas.height * 0.55, 70, 0.2, '#e5e5e5', '#ffffff');
                // Layer 2
                drawLiquidWave(time + 2, canvas.height * 0.65, 60, 0.3, '#d4d4d4', '#f5f5f5');
                // Layer 3
                drawLiquidWave(time + 1, canvas.height * 0.75, 50, 0.25, '#a3a3a3', '#d4d4d4');
                // Layer 4 (Frontmost)
                drawLiquidWave(time + 3, canvas.height * 0.85, 40, 0.35, '#525252', '#171717');

                // Light Mist
                const mist = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
                mist.addColorStop(0, '#ffffff');
                mist.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = mist;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

            } else {
                // --- DARK MODE COLORS (Same shape, dark monochrome palette) ---

                // Layer 1 (Backmost)
                drawLiquidWave(time, canvas.height * 0.55, 70, 0.2, '#111111', '#000000');
                // Layer 2
                drawLiquidWave(time + 2, canvas.height * 0.65, 60, 0.3, '#1a1a1a', '#0a0a0a');
                // Layer 3
                drawLiquidWave(time + 1, canvas.height * 0.75, 50, 0.25, '#222222', '#141414');
                // Layer 4 (Frontmost - slightly lighter accent for visibility against black)
                drawLiquidWave(time + 3, canvas.height * 0.85, 40, 0.35, '#2a2a2a', '#1a1a1a');

                // Dark Mist
                const mist = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
                mist.addColorStop(0, '#000000');
                mist.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = mist;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animationId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className={styles.hero}>
            <canvas ref={canvasRef} className={styles.particleCanvas} />

            <div className={styles.content}>
                {/* Main Title */}
                <h1 className={styles.title}>
                    <span className={styles.greeting}>Hello, I'm</span>
                    <span className={styles.name}>Abishek Sridharan</span>
                </h1>

                {/* Tagline */}
                <p className={styles.tagline}>
                    AI Engineer building intelligent systems that drive business transformation
                </p>

                {/* Description */}
                <p className={styles.subtitle}>
                    I specialize in building production-grade AI systems,
                    designing knowledge graphs, and creating
                    end-to-end ML pipelines that solve real-world problems.
                </p>

                {/* CTA Buttons */}
                {/* <div className={styles.buttons}> */}
                {/* Buttons removed as requested */}
                {/* </div> */}

                {/* Stats */}
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>3</span>
                        <span className={styles.statLabel}>Production Projects</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1</span>
                        <span className={styles.statLabel}>Research Publication</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>AWS</span>
                        <span className={styles.statLabel}>Cloud Deployed</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
