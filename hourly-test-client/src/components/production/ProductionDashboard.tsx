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

interface Logout {
    onLogout: () => void;
}

const ProductionDashboard = ({ onLogout }: Logout) => {
    return (
        <Box>
            Production Dashboard
        </Box>
    )
}

export default ProductionDashboard;