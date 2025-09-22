import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import './App.css';
import EngineeringDashboard from './components/engineering/EngineeringDashboard';
import ProductionDashboard from './components/production/ProductionDashboard';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1f1e1c',
        light: '#787773',
        dark: '#080707'
      },
      secondary: {
        main: '#dc004e'
      },
      background: {
        default: '#f5f7fa',
        paper: '#ffffff'
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      }
    },
    shape: {
      borderRadius: 12
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0,0,0,0.05)',
      '0px 4px 8px rgba(0,0,0,0.08)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
      '0px 8px 16px rgba(0,0,0,0.12)',
    ],
  })

  interface User {
    type: 'engineering' | 'production' | null;
    authenticated: boolean
  }


const App = () => {
  const [user, setUser] = useState<User>({
    type: null,
    authenticated: false,
  })

const handleLogout = () => {
  setUser({ type: null, authenticated: false})
}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogout} />} />
              <Route path="/engineering" />
            </Routes>
          </Router>
        </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App
