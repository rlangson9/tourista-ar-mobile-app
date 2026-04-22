import React, { useState, useEffect, useRef } from 'react';

interface NumberCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  easing?: 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear';
  onComplete?: () => void;
  className?: string;
}

export function NumberCounter({ 
  target, 
  suffix = '', 
  duration = 1500, 
  easing = 'ease-in-out', 
  onComplete,
  className 
}: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Calculate leading zeros based on target length
  const getLeadingZeros = (num: number): string => {
    const targetStr = target.toString();
    const numStr = num.toString();
    const zeros = '0'.repeat(Math.max(0, targetStr.length - numStr.length));
    return zeros + numStr;
  };

  // Format number to short form (K, M, etc.)
  const formatShortForm = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  // Easing functions
  const easeInOut = (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const easeIn = (t: number): number => {
    return t * t;
  };

  const easeOut = (t: number): number => {
    return 1 - Math.pow(1 - t, 2);
  };

  const linear = (t: number): number => {
    return t;
  };

  const getEasingFunction = () => {
    switch (easing) {
      case 'ease-in': return easeIn;
      case 'ease-out': return easeOut;
      case 'linear': return linear;
      default: return easeInOut;
    }
  };

  // Animate function
  const animate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = performance.now();
    const easingFn = getEasingFunction();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const currentCount = Math.floor(easedProgress * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
        setIsAnimating(false);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Reset state when target changes
  useEffect(() => {
    setCount(0);
    setIsAnimating(false);
    setIsComplete(false);
  }, [target]);

  // Animate on mount
  useEffect(() => {
    // Start animation with a small delay to ensure component is mounted
    const timer = setTimeout(() => {
      animate();
    }, 100);

    return () => clearTimeout(timer);
  }, [target, duration, easing]);

  return (
    <div ref={ref} className={className}>
      {isComplete ? formatShortForm(count) : getLeadingZeros(count)}{suffix}
    </div>
  );
}
