import { createGlobalStyle } from 'styled-components';

export const PPInsightsThemeBridge = createGlobalStyle`
  .pp-insights {
    color: ${({ theme }) => theme.glass.text};
  }

  .pp-insights .bg-white {
    background: ${({ theme }) => theme.glass.surface} !important;
    border-color: ${({ theme }) => theme.glass.border} !important;
  }

  .pp-insights .bg-gray-50,
  .pp-insights .bg-gray-100 {
    background: ${({ theme }) => theme.glass.backgroundSecondary} !important;
  }

  .pp-insights .text-gray-900 {
    color: ${({ theme }) => theme.glass.text} !important;
  }

  .pp-insights .text-gray-700,
  .pp-insights .text-gray-600,
  .pp-insights .text-gray-500 {
    color: ${({ theme }) => theme.glass.textSecondary} !important;
  }

  .pp-insights .border-gray-200,
  .pp-insights .border-gray-300,
  .pp-insights .border-gray-700 {
    border-color: ${({ theme }) => theme.glass.border} !important;
  }

  .pp-insights .bg-blue-600 {
    background: ${({ theme }) => theme.colors.primary} !important;
  }

  .pp-insights .bg-blue-700 {
    background: ${({ theme }) => theme.colors.primaryDark} !important;
  }

  .pp-insights .text-blue-600 {
    color: ${({ theme }) => theme.colors.primary} !important;
  }

  .pp-insights .text-green-600 {
    color: ${({ theme }) => theme.colors.success} !important;
  }

  .pp-insights .text-red-600 {
    color: ${({ theme }) => theme.colors.danger} !important;
  }

  .pp-insights .text-yellow-600 {
    color: ${({ theme }) => theme.colors.warning} !important;
  }
`;

export default PPInsightsThemeBridge;
