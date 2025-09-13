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
    TextFormatRounded,
    FilterList 
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
  onLogout: () => void;
}

const EngineeringDashboard = ( { onLogout }: Logout ) => {
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
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

  const handlePathChange = (machine: string, value: string) => {
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' elevation={2}> 
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

            <Container maxWidth='lg' sx={{ py: 4, justifyContent: 'center' }}>
              <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
                System Configuration & Data Retrieval
              </Typography>

              <Grid container spacing={4}>

                <Grid size={{ xs: 12, lg: 8 }}>

                  <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3}}>
                      <Storage sx={{ mr: 2, color: 'primary.main'}} />
                      <Typography variant='h6'>
                        Machine Path Configuration
                      </Typography>
                    </Box>

                    <Typography variant='body2' color='text.secondary' gutterBottom sx={{ mb: 4 }}>
                      Enter UNC paths for each machine (e.g., \\192.168.1.100\shared\data.csv)
                    </Typography>

                    <Grid container spacing={2}>
                      {Object.entries(formData.paths).map(([machine, path], index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={machine}>
                          <TextField 
                            fullWidth 
                            label={`Machine ${index + 1} Path`}
                            value={path}
                            onChange={(e) => handlePathChange(machine, e.target.value)}
                            placeholder='\\server\path\file.csv'
                            slotProps={{
                              input: {
                                startAdornment: <FolderOpen sx={{ mr: 1, color: 'action.active'}} />
                              }
                            }}
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  <Paper elevation={2} sx={{ p: 4 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <FilterList sx={{ mr: 2, color: 'primary.main'}}/>
                      <Typography variant='h6'>
                          Filter Parameters
                      </Typography>
                    </Box>

                    <Grid container spacing={1}>
                      
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <DatePicker
                          label="Target Date"
                          value={formData.date}
                          onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue }))}
                          // renderInput not working
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TimePicker
                          label="Minimum Time"
                          value={formData.time}
                          onChange={(newValue) => setFormData(prev => ({ ...prev, time: newValue }))}
                          // renderInput not working
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>

                  <Card>
                    <CardContent>
                      <Typography variant='h6' gutterBottom>
                        Quick Actions
                      </Typography>

                      {error && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                          {error}
                        </Alert>
                      )}

                      <Button
                        variant='contained'
                        size='large'
                        fullWidth
                        onClick={() => {}}
                        disabled={loading}
                        startIcon={<Search />}
                        sx={{ mb: 2 }}
                      >
                        {loading ? 'Processing...' : 'Fetch & Analyze Data'}
                      </Button>

                      <Typography variant='body2' color='text.secondary'>
                        This will merge data from all four machines and apply the specified filters.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                </Grid>
              </Grid>
            </Container>
        </Box>
    </LocalizationProvider>
  )

};

export default EngineeringDashboard;