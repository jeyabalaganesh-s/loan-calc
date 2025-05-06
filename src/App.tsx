import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { EMICalculator } from './components/EMICalculator';
import { ExchangeRateTable } from './components/ExchangeRateTable';
import { ErrorPage } from './pages/ErrorPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<EMICalculator />} />
          <Route path="/exchange-rates" element={<ExchangeRateTable />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
