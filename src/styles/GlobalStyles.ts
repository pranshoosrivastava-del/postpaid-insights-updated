// ============================================
// GLASSPANEL ADMIN - GLOBAL STYLES
// ============================================

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
    color: ${({ theme }) => theme.glass.text};
    background: ${({ theme }) => theme.glass.background};
    min-height: 100vh;
    direction: ${({ theme }) => theme.direction};
    transition: background ${({ theme }) => theme.transitions.slow},
                color ${({ theme }) => theme.transitions.normal};
  }

  :root {
    --text-primary: ${({ theme }) => theme.glass.text};
    --text-secondary: ${({ theme }) => theme.glass.textSecondary};
    --text-muted: ${({ theme }) => theme.glass.textMuted};
    --surface-bg: ${({ theme }) => theme.glass.surface};
    --surface-hover: ${({ theme }) => theme.glass.surfaceHover};
    --border-default: ${({ theme }) => theme.glass.border};
    --brand-primary: ${({ theme }) => theme.colors.primary};
    --brand-success: ${({ theme }) => theme.colors.success};
    --brand-warning: ${({ theme }) => theme.colors.warning};
    --brand-danger: ${({ theme }) => theme.colors.danger};
    --brand-info: ${({ theme }) => theme.colors.info};
  }

  /* Shared utility classes used by migrated pages */
  .app-page-grid {
    display: grid;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  .app-card-surface {
    background: ${({ theme }) => theme.glass.surface};
    border: 1px solid ${({ theme }) => theme.glass.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.glass.shadowLight};
  }

  .app-text-muted {
    color: ${({ theme }) => theme.glass.textMuted};
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    color: ${({ theme }) => theme.glass.text};
    margin-bottom: 0.5em;
  }

  h1 { font-size: ${({ theme }) => theme.typography.fontSizes.xxxl}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSizes.xxl}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSizes.xl}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSizes.lg}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSizes.md}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSizes.sm}; }

  p {
    margin-bottom: 1em;
    color: ${({ theme }) => theme.glass.textSecondary};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Form Elements */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea {
    outline: none;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme }) => theme.mode === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
    }
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.primary}40;
    color: ${({ theme }) => theme.glass.text};
  }

  /* Focus Visible */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animation Keyframes */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* Glass Background Animation */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  body {
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
  }
`;

export default GlobalStyles;
