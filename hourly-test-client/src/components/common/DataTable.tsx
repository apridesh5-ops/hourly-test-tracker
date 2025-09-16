import { useState } from 'react';
import { 
    Box,
    Paper,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Chip, 
} from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { ArrowBack, Download, Engineering, Group } from '@mui/icons-material';

interface DataTableProps {
    data: any[];
    onBack: () => void;
    userType: 'engineering' | 'production';
}

const DataTable = ({ data, onBack, userType }: DataTableProps) => {
    const columns: GridColDef[] = [
        { 
            field: 'id',
            headerName: 'ID',
            width: 90
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 120
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            width: 120
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            width: 120
        },
        {
            field: 'testId',
            headerName: 'Test ID',
            width: 150
        }
    ]

    return (
        <Box> Hello World </Box>
    )
}

export default DataTable;