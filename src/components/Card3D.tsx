import React, { useRef, useState, useCallback } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Tilt intensity (default 15)
  glare?: boolean; // Enable dynamic light glare
  depth?: number; // Elevation in px
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 12,
  glare = true,
  depth = 20,
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      const glX = (x / rect.width) * 100;
      const glY = (y / rect.height) * 100;
      setGlarePos({ x: glX, y: glY, opacity: 0.25 });
    }
  }, [intensity, glare]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d transition-transform ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? `scale3d(1.02, 1.02, 1.02) translateZ(${depth}px)` : 'scale3d(1, 1, 1) translateZ(0px)'
        }`,
        transitionDuration: isHovered ? '100ms' : '500ms',
      }}
    >
      {/* 3D Content Container */}
      <div className="relative w-full h-full preserve-3d">
        {children}
      </div>

      {/* Dynamic Specular Light Glare Overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
          }}
        />
      )}
    </div>
  );
};
