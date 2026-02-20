import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getTheme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/GlobalStyles';
import PPInsightsDashboard from '@/features/pp-insights/PPInsightsDashboard';

const App: React.FC = () => {
  const theme = getTheme('light', 'ltr');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pp-insights" replace />} />
          <Route path="/pp-insights/*" element={<PPInsightsDashboard />} />
          <Route path="*" element={<Navigate to="/pp-insights" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
