import React from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  perspective3D?: boolean;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  perspective3D = true,
}) => {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: 35, x: 0, rotateX: perspective3D ? 8 : 0 };
      case 'down':
        return { y: -35, x: 0, rotateX: perspective3D ? -8 : 0 };
      case 'left':
        return { x: 40, y: 0, rotateY: perspective3D ? -8 : 0 };
      case 'right':
        return { x: -40, y: 0, rotateY: perspective3D ? 8 : 0 };
      default:
        return { x: 0, y: 0, rotateX: 0, rotateY: 0 };
    }
  };

  const initial = {
    opacity: 0,
    scale: 0.97,
    ...getInitialOffsets(),
  };

  return (
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
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`preserve-3d ${className}`}
    >
      {children}
    </motion.div>
  );
};
