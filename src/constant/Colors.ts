const THEMECOLORS = {
  primary: {
    main: "#134B70",    // Sidebar icons, primary text
    dark: "#0D3650",    // Optional darker variant for contrast
  },
  accents: {
    active: "#D09E34",  // Active states, borders, highlights
    hover: "#F7C966",   // Hover effects, secondary highlights
  },
  surfaces: {
    navBar: "#E7BD62",
    sidebar: "#FFF8E7",  // Sidebar background
    card: "#FCFBFA",     // Cards/modals
    background: "#FDFAF5" // Main app background
  },
  text: {
    primary: "#134B70",   // Headings, main text
    secondary: "#134B70CC", // Secondary text (60% opacity)
    inverted: "#FCFBFA"   // Text on dark backgrounds
  },
  states: {
    error: "#FF6B6B",    // Suggested: Add error color
    success: "#4CAF50"   // Suggested: Add success color
  }
};

interface ThemeColors {
  primary: {
    main: string;
    dark?: string;
  };
  accents: {
    active: string;
    hover: string;
  };
  surfaces: {
    navBar: string;
    sidebar: string;
    card: string;
    background: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverted: string;
  };
  states: {
    error: string;
    success: string;
  };
}

export const themeColors: ThemeColors = THEMECOLORS;