import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import './App.css';
import EngineeringDashboard from './components/engineering/EngineeringDashboard';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0'
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
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {!user.authenticated && (
          <LoginPage onLogin={setUser} />
        )}

        {user.authenticated && user.type === 'engineering' && (
          <EngineeringDashboard onLogout={handleLogout} />
        )}

      </Box>
    </ThemeProvider>
  );
}

export default App
