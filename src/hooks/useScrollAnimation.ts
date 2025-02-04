import { useEffect, useRef } from 'react';

export function useScrollAnimation(direction: 'up' | 'left' | 'right' = 'up') {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationClass = {
              up: 'animate-slide-in-from-bottom',
              left: 'animate-slide-in-from-left',
              right: 'animate-slide-in-from-right',
            }[direction];
            
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [direction]);

  return elementRef;
} 