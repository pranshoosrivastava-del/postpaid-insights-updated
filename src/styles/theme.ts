// ============================================
// GLASSPANEL ADMIN - GLASSMORPHISM THEME SYSTEM
// Apple iOS 16 Inspired Transparent Glass Style
// ============================================

import { GlassTheme, ThemeMode, Direction } from '@/types';

// Base theme values shared between light and dark modes
const baseTheme = {
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  elevation: {
    xs: '0 1px 2px rgba(15, 23, 42, 0.08)',
    sm: '0 2px 6px rgba(15, 23, 42, 0.12)',
    md: '0 8px 24px rgba(15, 23, 42, 0.16)',
    lg: '0 16px 40px rgba(15, 23, 42, 0.2)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      xxl: '1.5rem',    // 24px
      xxxl: '2rem',     // 32px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// Color palette
const colors = {
  primary: '#667eea',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  secondary: '#64748b',
  secondaryLight: '#94a3b8',
  secondaryDark: '#475569',
  success: '#10b981',
  successLight: '#34d399',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  danger: '#ef4444',
  dangerLight: '#f87171',
  info: '#06b6d4',
  infoLight: '#22d3ee',
};

// Light mode glass colors - Translucent whites with blur
const lightGlass = {
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f0e6fa 50%, #e0f2fe 100%)',
  backgroundSecondary: 'rgba(255, 255, 255, 0.6)',
  surface: 'rgba(255, 255, 255, 0.72)',
  surfaceHover: 'rgba(255, 255, 255, 0.85)',
  border: 'rgba(255, 255, 255, 0.5)',
  borderLight: 'rgba(255, 255, 255, 0.3)',
  text: '#1e293b',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  shadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
  shadowLight: '0 4px 16px rgba(31, 38, 135, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.4)',
  blur: '20px',
};

// Dark mode glass colors - Translucent blacks with blur
const darkGlass = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c4a6e 100%)',
  backgroundSecondary: 'rgba(15, 23, 42, 0.8)',
  surface: 'rgba(30, 41, 59, 0.72)',
  surfaceHover: 'rgba(51, 65, 85, 0.85)',
  border: 'rgba(255, 255, 255, 0.12)',
  borderLight: 'rgba(255, 255, 255, 0.08)',
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  shadowLight: '0 4px 16px rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  blur: '20px',
};

// Create theme function
export const createTheme = (mode: ThemeMode, direction: Direction = 'ltr'): GlassTheme => ({
  mode,
  direction,
  colors,
  glass: mode === 'light' ? lightGlass : darkGlass,
  ...baseTheme,
});

// Pre-built themes
export const lightTheme = createTheme('light', 'ltr');
export const darkTheme = createTheme('dark', 'ltr');
export const lightThemeRTL = createTheme('light', 'rtl');
export const darkThemeRTL = createTheme('dark', 'rtl');

// Theme getter
export const getTheme = (mode: ThemeMode, direction: Direction): GlassTheme => {
  return createTheme(mode, direction);
};

export const statusColorMap = {
  green: colors.success,
  red: colors.danger,
  yellow: colors.warning,
  orange: '#f97316',
  blue: colors.info,
  purple: '#8b5cf6',
  gray: colors.secondary,
} as const;

// CSS helper functions for glassmorphism effects
export const glassEffect = (theme: GlassTheme) => `
  background: ${theme.glass.surface};
  backdrop-filter: blur(${theme.glass.blur});
  -webkit-backdrop-filter: blur(${theme.glass.blur});
  border: 1px solid ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
`;

export const glassEffectHover = (theme: GlassTheme) => `
  background: ${theme.glass.surfaceHover};
  border-color: ${theme.glass.border};
  box-shadow: ${theme.glass.shadow};
`;

export const glassCard = (theme: GlassTheme) => `
  background: ${theme.glass.surface};
  backdrop-filter: blur(${theme.glass.blur});
  -webkit-backdrop-filter: blur(${theme.glass.blur});
  border: 1px solid ${theme.glass.border};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.glass.shadow};
`;

export const glassInput = (theme: GlassTheme) => `
  background: ${theme.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${theme.glass.borderLight};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.glass.text};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.glass.border};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}33;
  }

  &::placeholder {
    color: ${theme.glass.textMuted};
  }
`;

export const glassButton = (theme: GlassTheme, variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const variants = {
    primary: `
      background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 14px ${theme.colors.primary}40;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px ${theme.colors.primary}50;
      }
    `,
    secondary: `
      background: ${theme.glass.surface};
      backdrop-filter: blur(${theme.glass.blur});
      -webkit-backdrop-filter: blur(${theme.glass.blur});
      color: ${theme.glass.text};
      border: 1px solid ${theme.glass.border};

      &:hover {
        background: ${theme.glass.surfaceHover};
      }
    `,
    ghost: `
      background: transparent;
      color: ${theme.glass.text};
      border: none;

      &:hover {
        background: ${theme.glass.surfaceHover};
      }
    `,
  };

  return `
    ${variants[variant]}
    border-radius: ${theme.borderRadius.md};
    font-weight: ${theme.typography.fontWeights.medium};
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `;
};

// Responsive helpers
export const media = {
  xs: `@media (min-width: ${baseTheme.breakpoints.xs})`,
  sm: `@media (min-width: ${baseTheme.breakpoints.sm})`,
  md: `@media (min-width: ${baseTheme.breakpoints.md})`,
  lg: `@media (min-width: ${baseTheme.breakpoints.lg})`,
  xl: `@media (min-width: ${baseTheme.breakpoints.xl})`,
  xxl: `@media (min-width: ${baseTheme.breakpoints.xxl})`,
};

// RTL helper
export const rtl = (ltrValue: string, rtlValue: string) => (props: { theme: GlassTheme }) =>
  props.theme.direction === 'rtl' ? rtlValue : ltrValue;

export default { lightTheme, darkTheme, createTheme, getTheme };
