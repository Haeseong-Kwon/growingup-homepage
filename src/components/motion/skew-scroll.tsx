"use client";

import { useScroll, useVelocity, useTransform, useSpring, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SkewScrollProps {
    children: React.ReactNode;
    className?: string;
    skewIntensity?: number;
}

export function SkewScroll({ children, className, skewIntensity = 1 }: SkewScrollProps) {
    const scrollRef = useRef(null);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity to avoid jitter
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to skew degrees
    // Adjust the range [-10, 10] based on skewIntensity
    const skewY = useTransform(smoothVelocity, [-1000, 1000], [-skewIntensity * 5, skewIntensity * 5]);

    return (
        <motion.div
            ref={scrollRef}
            style={{ skewY }}
            className={cn("will-change-transform", className)}
        >
            {children}
        </motion.div>
    );
}
