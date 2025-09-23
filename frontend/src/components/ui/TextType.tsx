import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  text: string;
  className?: string;
  delay?: number;
  typeSpeed?: number;
  showCursor?: boolean;
  cursorChar?: string;
}

export const TextType: React.FC<TextTypeProps> = ({
  text,
  className = '',
  delay = 0,
  typeSpeed = 0.05,
  showCursor = true,
  cursorChar = '|',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursorState, setShowCursorState] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      setShowCursorState(true);

      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTypingComplete(true);
        }
      }, typeSpeed * 1000);

      return () => clearInterval(typeInterval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay, typeSpeed]);

  useEffect(() => {
    if (cursorRef.current && showCursor && showCursorState) {
      // Start blinking animation
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, [showCursor, showCursorState]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && showCursorState && (
        <span 
          ref={cursorRef} 
          className="inline-block text-primary"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};