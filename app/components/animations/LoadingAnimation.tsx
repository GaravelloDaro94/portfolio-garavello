"use client";

import { useSyncExternalStore } from "react";
import { useThemeDetection } from "../../hooks/useThemeDetection";

export default function LoadingAnimation() {
  const { isDark } = useThemeDetection();
  
  // Detectar si estamos en el cliente sin causar hydration mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  
  if (!mounted) return null;

  const colors = isDark
    ? { stripe1: "#474787", stripe2: "#2c2c54", stripe3: "#84817a" }
    : { stripe1: "#ffd32a", stripe2: "#ff5e57", stripe3: "#4bcffa" };

  return (
    <div className="fixed top-0 right-0 z-[1] pointer-events-none w-full sm:w-[70vw] md:w-[50vw] h-screen overflow-hidden">
      <svg 
        key={isDark ? 'dark' : 'light'}
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 1000" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="wave-stripes"
      >
        <defs>
          <clipPath id="stripe-clip">
            <rect x="0" y="0" width="1000" height="1000"/>
          </clipPath>
        </defs>
        
        <g clipPath="url(#stripe-clip)">
          {/* Stripe 1 */}
          <path 
            d="M 1000,0 L 1000,150 L 0,900 L 0,750 Z"
            fill={colors.stripe1}
            stroke="#333"
            strokeWidth="5"
            strokeLinejoin="miter"
            className="stripe-path stripe-1"
          />
          
          {/* Stripe 2 */}
          <path 
            d="M 1000,150 L 1000,300 L 0,1000 L 0,900 Z"
            fill={colors.stripe2}
            stroke="#333"
            strokeWidth="5"
            strokeLinejoin="miter"
            className="stripe-path stripe-2"
          />
          
          {/* Stripe 3 */}
          <path 
            d="M 1000,300 L 1000,500 L 200,1000 L 0,1000 Z"
            fill={colors.stripe3}
            stroke="#333"
            strokeWidth="5"
            strokeLinejoin="miter"
            className="stripe-path stripe-3"
          />
        </g>
      </svg>
    </div>
  );
}
