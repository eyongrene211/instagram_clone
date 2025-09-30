// hooks/useScreenSize.js

import { useState, useEffect } from 'react';

// Define the breakpoint (e.g., 1024px for 'lg' in Tailwind)
const BREAKPOINT = 1024; 

export const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial size after component mounts
    const checkSize = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };

    // Set initial state
    checkSize(); 

    // Add listener for window resize
    window.addEventListener('resize', checkSize);

    // Clean up
    return () => window.removeEventListener('resize', checkSize);
  }, []); 

  return { isMobile };
};