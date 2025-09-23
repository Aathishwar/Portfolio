import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

interface AnimatedThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export default function AnimatedThemeToggle({ isDark, onToggle, className = "" }: AnimatedThemeToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Get the button element for animation origin
    const button = document.querySelector('[data-theme-toggle]') as HTMLElement;
    if (!button) {
      onToggle();
      setIsAnimating(false);
      return;
    }

    const rect = button.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    // Determine animation direction based on the target mode
    const targetMode = isDark ? 'light' : 'dark';
    const animationOrigin = targetMode === 'dark' ? 'top-right' : 'bottom-left';

    // Calculate the radius needed to cover the entire screen from the origin point
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Determine the starting position based on animation origin
    let startX: number, startY: number;
    
    if (animationOrigin === 'top-right') {
      startX = screenWidth;
      startY = 0;
    } else { // bottom-left
      startX = 0;
      startY = screenHeight;
    }
    
    // Calculate the distance from start point to the farthest corner
    const corners = [
      { x: 0, y: 0 }, // top-left
      { x: screenWidth, y: 0 }, // top-right
      { x: 0, y: screenHeight }, // bottom-left
      { x: screenWidth, y: screenHeight } // bottom-right
    ];
    
    const maxDistance = Math.max(
      ...corners.map(corner => 
        Math.sqrt(Math.pow(corner.x - startX, 2) + Math.pow(corner.y - startY, 2))
      )
    );
    
    // Add some padding to ensure full coverage
    const radius = maxDistance + 100;

    // Create animation overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = `${startX}px`;
    overlay.style.top = `${startY}px`;
    overlay.style.width = `${radius * 2}px`;
    overlay.style.height = `${radius * 2}px`;
    overlay.style.backgroundColor = targetMode === 'dark' ? '#0f0f23' : '#ffffff';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.borderRadius = '50%';
    overlay.style.transform = `translate(-50%, -50%) scale(0)`;
    overlay.style.transformOrigin = 'center';
    overlay.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    document.body.appendChild(overlay);

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.transform = `translate(-50%, -50%) scale(1)`;
    });

    // Complete the theme change
    setTimeout(() => {
      onToggle();
      
      // Fade out overlay while maintaining circle shape
      overlay.style.transition = 'opacity 0.4s ease-out';
      overlay.style.opacity = '0';
      
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        setIsAnimating(false);
      }, 400);
    }, 400);
  }, [isDark, onToggle, isAnimating]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 relative overflow-hidden ${className}`}
      onClick={handleToggle}
      disabled={isAnimating}
      aria-label="Toggle theme"
      title="Toggle theme"
      data-theme-toggle
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
        animate={{ 
          rotate: 0, 
          scale: 1, 
          opacity: 1,
        }}
        exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400" />
        )}
      </motion.div>
      
      {/* Ripple effect on click */}
      {isAnimating && (
        <motion.div
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full bg-current"
        />
      )}
    </Button>
  );
}