import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import LoginPage from './components/LoginPage';
import './App.css';
import EngineeringDashboard from './components/engineering/EngineeringDashboard';
import ProductionDashboard from './components/production/ProductionDashboard';
import { AppProvider, useAppContext } from './context/AppContext';

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

// interface User {
//   type: 'engineering' | 'production' | null;
//   authenticated: boolean
// }

// ToDo - remove react-router dependencies and tailwind dependencies

const AppContext = () => {
  const { currentView } = useAppContext();

  return (
    <Box>
      { currentView === 'login' && <LoginPage /> }
      { currentView === 'engineering' && <EngineeringDashboard /> }
      { currentView === 'production' && <ProductionDashboard /> }
    </Box>
  )
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppProvider>
            <AppContext />
          </AppProvider>
        </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App
