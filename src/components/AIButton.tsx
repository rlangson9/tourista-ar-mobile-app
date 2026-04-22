import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

interface AIButtonProps {
  onOpen: () => void;
  isAssistantOpen: boolean;
}

export function AIButton({ onOpen, isAssistantOpen }: AIButtonProps) {
  const [position, setPosition] = useState({ x: 300, y: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Load position from local storage on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem('aiButtonPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    } else {
      // Default position
      const defaultPosition = {
        x: window.innerWidth - 80,
        y: window.innerHeight - 150
      };
      setPosition(defaultPosition);
    }
  }, []);

  // Save position to local storage when it changes
  useEffect(() => {
    localStorage.setItem('aiButtonPosition', JSON.stringify(position));
  }, [position]);

  // Handle window resize to keep button within bounds
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 70),
        y: Math.min(prev.y, window.innerHeight - 70)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    hasDragged.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    hasDragged.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const dx = Math.abs(e.clientX - dragStartPos.current.x);
      const dy = Math.abs(e.clientY - dragStartPos.current.y);
      if (dx > 5 || dy > 5) {
        hasDragged.current = true;
      }
      setPosition(prev => {
        let newX = e.clientX - 35; // 35 is half of button width
        let newY = e.clientY - 35; // 35 is half of button height

        // Keep button within viewport bounds
        newX = Math.max(0, Math.min(newX, window.innerWidth - 70));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 70));

        return { x: newX, y: newY };
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - dragStartPos.current.x);
      const dy = Math.abs(touch.clientY - dragStartPos.current.y);
      if (dx > 5 || dy > 5) {
        hasDragged.current = true;
      }
      setPosition(prev => {
        let newX = touch.clientX - 35;
        let newY = touch.clientY - 35;

        // Keep button within viewport bounds
        newX = Math.max(0, Math.min(newX, window.innerWidth - 70));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 70));

        return { x: newX, y: newY };
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  return (
    <>
      {!isAssistantOpen && (
        <motion.div
          ref={buttonRef}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 1000,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={() => !hasDragged.current && onOpen()}
          className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          aria-label="Touri ai"
        >
          <Bot className="w-7 h-7 text-white" />
        </motion.div>
      )}
    </>
  );
}
