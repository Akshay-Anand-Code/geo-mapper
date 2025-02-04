import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Get all buttons and links that should trigger smooth scroll
    const scrollButtons = document.querySelectorAll('a[href^="#"], button[data-scroll-to]');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const targetId = target.getAttribute('href') || target.getAttribute('data-scroll-to');
      
      if (targetId) {
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    scrollButtons.forEach(button => {
      button.addEventListener('click', handleClick);
    });

    return () => {
      scrollButtons.forEach(button => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);
}; 