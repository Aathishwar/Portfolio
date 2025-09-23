import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    // Set initial state
    gsap.set(chars, {
      opacity: 0,
      y: 50,
      rotationX: -90,
    });

    // Animate characters
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration,
      stagger,
      delay,
      ease: 'back.out(1.7)',
    });
  }, [delay, duration, stagger]);

  const splitTextIntoChars = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="char inline-block"
        style={{ transformOrigin: '50% 50% -50px' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <span ref={textRef} className={className}>
      {splitTextIntoChars(text)}
    </span>
  );
};