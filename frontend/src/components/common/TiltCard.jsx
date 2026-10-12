import React, { useRef, useState } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  onClick,
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    if (glare) {
      setGlareStyle({
        opacity: 0.25,
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 60%)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    if (glare) {
      setGlareStyle({ opacity: 0, transition: 'opacity 0.5s ease-out' });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`relative overflow-hidden rounded-2xl will-change-transform transform-gpu ${className}`}
    >
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity"
          style={glareStyle}
        />
      )}
      {children}
    </div>
  );
}
