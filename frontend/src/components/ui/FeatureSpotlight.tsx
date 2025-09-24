import React, { useEffect, useState, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Feature Spotlight Component
 * Creates a mouse-following light effect that illuminates content in dark mode
 * The spotlight maintains distance from the cursor and provides torch-like illumination
 */
export default function FeatureSpotlight() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [spotlightPosition, setSpotlightPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateSpotlight = () => {
      setSpotlightPosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        
        // Smooth following with lag - creates the distance effect for realistic torch behavior
        const lag = 0.06; // Lower values = more lag/distance
        
        const newX = prev.x + dx * lag;
        const newY = prev.y + dy * lag;
        
        // Only update if there's a meaningful change to prevent unnecessary renders
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          return { x: newX, y: newY };
        }
        
        return prev;
      });

      // Continue animation
      animationFrameId.current = requestAnimationFrame(animateSpotlight);
    };

    animationFrameId.current = requestAnimationFrame(animateSpotlight);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      {/* Main spotlight circle - focused illumination */}
      <div
        className="mouse-follower-light"
        style={{
          transform: `translate3d(${spotlightPosition.x - 125}px, ${spotlightPosition.y - 125}px, 0)`,
        }}
      />
      
      {/* Ambient spotlight effect - wider area illumination */}
      <div
        className="mouse-follower-ambient"
        style={{
          transform: `translate3d(${spotlightPosition.x - 250}px, ${spotlightPosition.y - 250}px, 0)`,
        }}
      />
    </>
  );
}