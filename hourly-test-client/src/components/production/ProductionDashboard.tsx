import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Chip,
    MenuItem,
    Alert,
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    Logout, 
    Group, 
    Search,
    FilterList,
} from '@mui/icons-material';
import DataTable from '../common/DataTable';

interface Logout {
    onLogout: () => void;
}

interface TestData {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    testId: string;
    shift: string;
    status: string;
}

const ProductionDashboard = ({ onLogout }: Logout) => {
    const [searchParams, setSearchParams] = useState({ 
        date: null as Date | null,
        startTime: null as Date | null,
        endTime: null as Date | null,
        testId: '',
        shift: '' 
    });
    const [data, setData] = useState<TestData[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async () => {
        setLoading(true);

        //simulate API call
        setTimeout(() => {
            setData([
                { id: 1, date: '2025-08-24', startTime: '09:00', endTime: '10:00', testId: 'T001', shift: 'A', status: 'Pass' },
                { id: 2, date: '2025-08-24', startTime: '10:30', endTime: '11:30', testId: 'T002', shift: 'B', status: 'Fail' },
                // Add more mock data
            ]);
            setShowResults(true);
            setLoading(false);
        }, 1000)
    }

    // if (showResults) {
    //     return <DataTable data={data} onBack={() => setShowResults(false)} userType="production" />;
    // }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' elevation={2}>
                    <Toolbar>
                        <Group sx={{ mr: 2 }} />
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            Production Dashboard
                        </Typography>
                        <Chip
                            label='Public Access'
                            color='secondary'
                            size='small'
                            sx={{ mr: 2 }}
                        />
                        <IconButton color='inherit' onClick={onLogout}>
                            <Logout />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
                        Test Data Search
                    </Typography>

                    <Paper elevation={2} sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <FilterList sx={{ mr: 2, color: 'primary.main'}}/>
                            <Typography variant='h6'>
                                Search Parameters
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <DatePicker
                                    label="Date"
                                    value={searchParams.date}
                                    onChange={
                                        (newValue) => {setSearchParams(prev => ({ ...prev, date: newValue }))}
                                    }
                                    //renderInput not working
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </LocalizationProvider>
    )
}

export default ProductionDashboard;