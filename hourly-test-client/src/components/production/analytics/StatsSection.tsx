import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppContext } from '../../../context/AppContext';

interface StationStats {
    id: String;
    stationType: string;
    input: number;
    pass: number;
    yeild: number;
    fail: number;
    failPercent: number;
    retest: number;
    retestPercent: number;
}

const StatsGrid: React.FC = () => {
    const { csvData } = useAppContext();

    const columns: GridColDef[] = [
        {
            field: 'stationType',
            headerName: 'STATION TYPE',
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'input',
            headerName: 'INPUT (#)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'pass',
            headerName: 'PASS (#)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'yield',
            headerName: 'YIELD (%)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'fail',
            headerName: 'FAIL (#)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'failPercent',
            headerName: 'FAIL (%)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',        
        },
        {
            field: 'retest',
            headerName: 'RETEST (#)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'retestPercent',
            headerName: 'RETEST (%)',
            width: 120,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
    ];

    return (
        <Paper sx={{ p: 3, boxShadow: 2 }}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    100%``
                </Typography>
                <Typography variant="subtitle1" color='text.secondary'>
                    Yeild for all Sites
                </Typography>
            </Box>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    hideFooter
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: 'grey.100',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #e0e0e0',
                        },
                    }}
                />
            </Box>
        </Paper>
    )
}

export default StatsGrid;
