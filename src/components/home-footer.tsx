'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const currentYear = new Date().getFullYear();

export default function HomeFooterComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.link-item', {
                opacity: 0,
                x: -50,
                rotation: -15
            }, {
                opacity: 1,
                x: 0,
                rotation: 0,
                duration: 1,
                ease: 'back.out(1.7)',
                stagger: 0.25,
                delay: 0.4
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);
    return (
        <footer ref={containerRef} className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <div className="flex gap-1">
                <p className="link-item">&copy;</p>
                <p className="link-item">BetoFoxNet_Info 2015</p>
                <p className="link-item">-</p>
                <p className="link-item">{currentYear}</p>
            </div>
        </footer>
    );
}