import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography, 
    Card,
    CardContent,
    Grid,
    Alert
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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

const EngineeringForm = () => {
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


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant='h4' gutterBottom align='center'>
                Engineering Dashboard
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant='h6' gutterBottom>
                        Machine Paths (UNC Format)
                    </Typography>
                    <Typography variant='body2' color='text.secondary' gutterBottom>
                        Example: \\192.168.1.100\shared\data.csv
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </LocalizationProvider>
  )

};

export default EngineeringForm;