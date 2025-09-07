import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    IconButton,
    Chip,
    Alert,
} from '@mui/material';
import {
    Logout, 
    Engineering, 
    FolderOpen, 
    Search,
    Storage,
} from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import { DataTable } from '../common/DataTable';

interface EngineeringFormData {
    paths: {
        machine1: string;
        machine2: string;
        machine3: string;
        machine4: string;
    };
    date: Date | null;
    time: Date | null;
}

interface Logout {
  onLogout: () => void
}

const EngineeringDashboard = ( { onLogout }: Logout ) => {
    const [formData, setFormData] = useState<EngineeringFormData>({
        paths: {
            machine1: '',
            machine2: '',
            machine3: '',
            machine4: ''
        },
        date: null,
        time: null
  });

  const handlePathChange = (machine: keyof EngineeringFormData['paths'], value: string) => {
    setFormData(prev => ({
      ...prev,
      paths: {
        ...prev.paths,
        [machine]: value
      }
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
            <AppBar>
              <Toolbar>
                <Engineering sx={{ mr: 2 }}/>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Engineering Dashboard
                </Typography>
                <Chip 
                  label='Admin'
                  color='secondary'
                  size='small'
                  sx={{ mr: 2 }}
                />
                <IconButton color='inherit' onClick={onLogout}>
                  <Logout />
                </IconButton>
              </Toolbar>
            </AppBar>
        </Box>
    </LocalizationProvider>
  )

};

export default EngineeringDashboard;