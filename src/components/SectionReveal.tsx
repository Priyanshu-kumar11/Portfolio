import React from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  perspective3D?: boolean;
  dividerBeam?: boolean;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  perspective3D = true,
  dividerBeam = true,
}) => {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: 28, x: 0, rotateX: perspective3D ? 4 : 0 };
      case 'down':
        return { y: -28, x: 0, rotateX: perspective3D ? -4 : 0 };
      case 'left':
        return { x: 30, y: 0, rotateY: perspective3D ? -4 : 0 };
      case 'right':
        return { x: -30, y: 0, rotateY: perspective3D ? 4 : 0 };
      default:
        return { x: 0, y: 0, rotateX: 0, rotateY: 0 };
    }
  };

  const initial = {
    opacity: 0,
    scale: 0.985,
    ...getInitialOffsets(),
  };

  return (
    <div className="relative preserve-3d">
      {/* Subtle ambient light beam between sections */}
      {dividerBeam && (
        <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-60 pointer-events-none mb-1 sm:mb-2" />
      )}
      
      <motion.div
        initial={initial}
        whileInView={{
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
        }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for natural fluidity
        }}
        className={`preserve-3d will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

