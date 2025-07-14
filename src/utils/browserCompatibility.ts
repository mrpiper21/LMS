// Browser compatibility utilities
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Edge')) {
    return 'edge';
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    return 'chrome';
  } else if (userAgent.includes('Firefox')) {
    return 'firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'safari';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    return 'ie';
  }
  
  return 'unknown';
};

export const isLegacyBrowser = () => {
  const browser = detectBrowser();
  return browser === 'ie' || browser === 'edge';
};

export const applyBrowserFixes = () => {
  const browser = detectBrowser();
  
  // Add browser-specific CSS classes to body
  document.body.classList.add(`browser-${browser}`);
  
  // Edge-specific fixes
  if (browser === 'edge') {
    // Fix for Edge flexbox issues
    const style = document.createElement('style');
    style.textContent = `
      .flex { display: -ms-flexbox !important; }
      .flex-col { -ms-flex-direction: column !important; }
      .items-center { -ms-flex-align: center !important; }
      .justify-center { -ms-flex-pack: center !important; }
      .justify-between { -ms-flex-pack: justify !important; }
      
      /* Fix for Edge CSS Grid issues */
      .grid { display: -ms-grid !important; }
      
      /* Fix for Edge button styling */
      button { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
      
      /* Fix for Edge text rendering */
      body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    `;
    document.head.appendChild(style);
  }
  
  // Chrome-specific fixes
  if (browser === 'chrome') {
    const style = document.createElement('style');
    style.textContent = `
      /* Fix for Chrome flexbox rendering */
      .flex { display: -webkit-box; display: -ms-flexbox; display: flex; }
      
      /* Fix for Chrome button focus issues */
      button:focus { outline: 2px solid #646cff; outline-offset: 2px; }
      
      /* Fix for Chrome text rendering */
      body { -webkit-font-smoothing: antialiased; }
    `;
    document.head.appendChild(style);
  }
};

// CSS Custom Properties polyfill for older browsers
export const polyfillCSSVariables = () => {
  if (!window.CSS || !window.CSS.supports || !window.CSS.supports('--custom', 'property')) {
    // Apply fallback styles for browsers that don't support CSS custom properties
    const style = document.createElement('style');
    style.textContent = `
      /* Fallback colors for browsers without CSS custom properties support */
      .text-primary { color: #134B70 !important; }
      .text-secondary { color: rgba(19, 75, 112, 0.6) !important; }
      .text-inverted { color: #FCFBFA !important; }
      
      .bg-primary { background-color: #134B70 !important; }
      .bg-accent { background-color: #D09E34 !important; }
      .bg-surface { background-color: #FCFBFA !important; }
      .bg-background { background-color: #FDFAF5 !important; }
    `;
    document.head.appendChild(style);
  }
};

// Initialize browser compatibility fixes
export const initializeBrowserCompatibility = () => {
  // Apply fixes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyBrowserFixes();
      polyfillCSSVariables();
    });
  } else {
    applyBrowserFixes();
    polyfillCSSVariables();
  }
};

// Export browser detection for use in components
export const getBrowserInfo = () => ({
  name: detectBrowser(),
  isLegacy: isLegacyBrowser(),
  userAgent: navigator.userAgent
}); 