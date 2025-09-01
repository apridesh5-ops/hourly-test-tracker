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
        <Box>
            <Typography>
                Engineering Dashboard
            </Typography>
        </Box>
    </LocalizationProvider>
  )

};

export default EngineeringForm;