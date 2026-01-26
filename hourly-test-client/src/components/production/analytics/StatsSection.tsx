import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppContext } from '../../../context/AppContext';
import { type CSVRow, type AnalyticsSectionProps } from '../../common/types';

interface StationStats {
    id: String;
    stationType: string;
    input: number;
    pass: number;
    yield: number;
    fail: number;
    failPercent: number;
    retest: number;
    retestPercent: number;
}

const StatsGrid: React.FC<AnalyticsSectionProps> = ({ data }) => {
    const csvData = data

    // Calculate overall yield
    const overallYield = useMemo(() => {
        if (csvData.length === 0) return 0;
        const passCount = csvData.filter((row) => row.Tester_Result === 'Pass').length;
        return ((passCount / csvData.length) * 100).toFixed(2);
    }, [csvData]);

    // Calculate stats by station type (using Script_Name as station identifier)
    const StationStats = useMemo<StationStats[]>(() => {
        if (csvData.length === 0) return [];
        
        // Group by station type (using Script_Name as station identifier)
        const grouped = csvData.reduce((acc, row) => {
            const station = row.Script_Name || 'Unknown';
            
            if (!acc[station]) {
                acc[station] = {
                    input: 0,
                    pass: 0,
                    fail: 0,
                    retestCarriers: new Set<string>(), // Track unique carriers seen
                    carrierCount: new Map<string, number>(), // Count occurrences of each carrier
                };
            }

            acc[station].input += 1;

            // Count Pass/Fail

            if (row.Tester_Result === 'Pass') {
                acc[station].pass += 1;
            } else if (row.Tester_Result === 'Fail') {
                acc[station].fail += 1;
            }

            // Track Carrier_SN for retest detection
            const carrierSN = row.Carrier_SN;
            if (carrierSN) {
                const currentCount = acc[station].carrierCount.get(carrierSN) || 0;
                acc[station].carrierCount.set(carrierSN, currentCount + 1);

                // If we've seen this carrier before (count > 1), it's a retest
                if (currentCount >= 1) {
                    acc[station].retestCarriers.add(carrierSN);
                }
            }

            return acc;
        }, {} as Record<string, any>);

        // Convert to array with calculated percentages 
        return Object.entries(grouped).map(([stationType, stats], index) => {
            // Count total retest records (all occurrences after the first for each carrier)
            let retestCount = 0;
            stats.carrierCount.forEach((count: number, carrier: string) => {
                if (count > 1) {
                    retestCount += (count - 1); // Count all retets (exclude first occurences)
                }
            });

            return {
                id: index.toString(),
                stationType: stationType.replace('TSP_0QC_', ''), // Clean up display name
                input: stats.input,
                pass: stats.pass,
                yield: stats.input > 0 ? (stats.pass /stats.input) * 100 : 0,
                fail: stats.fail,
                failPercent: stats.input > 0 ? (stats.fail / stats.input) * 100 : 0,
                retest: retestCount,
                retestPercent: stats.input > 0 ? (retestCount / stats.input) * 100 : 0,
            };
        });
    }, [csvData]);

    const columns: GridColDef[] = [
        {
            field: 'stationType',
            headerName: 'STATION TYPE',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'input',
            headerName: 'INPUT (#)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'pass',
            headerName: 'PASS (#)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'yield',
            headerName: 'YIELD (%)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
            valueFormatter: (value: number) => `${value.toFixed(2)}%`
        },
        {
            field: 'fail',
            headerName: 'FAIL (#)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'failPercent',
            headerName: 'FAIL (%)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
            valueFormatter: (value: number) => `${value.toFixed(2)}%`        
        },
        {
            field: 'retest',
            headerName: 'RETEST (#)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
        },
        {
            field: 'retestPercent',
            headerName: 'RETEST (%)',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            type: 'number',
            valueFormatter: (value: number) => `${value.toFixed(2)}%`
        },
    ];

    return (
        <Paper sx={{ p: 3, boxShadow: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {overallYield}%
                </Typography>
                <Typography variant="subtitle1" color='text.secondary'>
                    Yeild for all Sites
                </Typography>
            </Box>

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={StationStats}
                    hideFooter
                    disableRowSelectionOnClick
                    autoHeight
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
