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
        // ToDo: Make Grid UI better
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' elevation={2}>
                <Toolbar>
                    { userType === 'engineering' ? <Engineering sx={{ mr: 2 }} /> : <Group sx={{ mr: 2 }} /> }
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Test Results - { userType === 'engineering' ? 'Engineering View' : 'Production View'}
                    </Typography>
                    <Chip
                        label={`${data.length} records`}
                        color='secondary'
                        size="small"
                        sx={{ mr: 2 }} 
                    />
                    <IconButton color='inherit' onClick={onBack}>
                        <ArrowBack />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3 }}>
                <Paper elevation={2} sx={{ height: 600 }}>
                    <DataGrid
                        columns={columns}
                        rows={data}
                        pageSizeOptions={[25, 50, 100]}
                        slots={{ toolbar: GridToolbar }} // fix: GridToolbar deprecation
                        sx={{ // fix: backgroundcolor and borderradius not reflecting
                            '& .MuiDataGrid-root': {
                                border: 'none'
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f5f7fa',
                                borderRadius: 0
                            }
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    )
}

export default DataTable;