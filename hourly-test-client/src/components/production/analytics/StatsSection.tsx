import React, { useMemo } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { type GridColDef } from '@mui/x-data-grid';
import { type AnalyticsSectionProps } from '../../common/types';
import { Download } from '@mui/icons-material';
import { type FilterValues } from './FilterSection';
import { format } from 'date-fns';

interface StationStats {
    id: string;
    stationType: string;
    input: number;
    pass: number;
    yield: number;
    fail: number;
    failPercent: number;
    retest: number;
    retestPercent: number;
}

interface StatsGridProps extends AnalyticsSectionProps {
    filters?: FilterValues;
}

const StatsGrid: React.FC<StatsGridProps> = ({ data, filters }) => {
    const csvData = data;

    // Calculate overall metrics using NEW formulas
    const overallMetrics = useMemo(() => {
        if (csvData.length === 0) {
            return { 
                yield: 0, 
                input: 0, 
                pass: 0, 
                fail: 0,
                retest: 0 
            };
        }

        // Total records
        const totalRecords = csvData.length;

        // 1. Input = COUNT(UNIQUE DUT_SN)
        const uniqueDutSns = new Set(csvData.map(row => row.DUT_SN));
        const input = uniqueDutSns.size;

        // 2. Pass = COUNT(UNIQUE DUT_SN where Tester_Result = 'Pass')
        const passedDutSns = new Set(
            csvData
                .filter(row => row.Tester_Result === 'Pass')
                .map(row => row.DUT_SN)
        );
        const pass = passedDutSns.size;

        // 3. Yield % = (Pass / Input) * 100
        const yieldPercentage = input > 0 ? (pass / input) * 100 : 0;

        // 4. Fail = Input - Pass
        const fail = input - pass;

        // 5. Retest = Total Records - Input
        const retest = totalRecords - input;

        return { 
            yield: yieldPercentage, 
            input, 
            pass, 
            fail,
            retest 
        };
    }, [csvData]);

    // Calculate stats by station type (using Script_Name as station identifier)
    const stationStats = useMemo<StationStats[]>(() => {
        if (csvData.length === 0) return [];
        
        // Group by station type (using Script_Name as station identifier)
        const grouped = csvData.reduce((acc, row) => {
            const station = row.Script_Name || 'Unknown';
            
            if (!acc[station]) {
                acc[station] = {
                    totalRecords: 0,
                    dutSns: new Set<string>(),  // Track all unique DUT_SNs
                    passedDutSns: new Set<string>(),  // Track DUT_SNs that have at least one Pass
                };
            }

            acc[station].totalRecords += 1;
            acc[station].dutSns.add(row.DUT_SN);

            // If this DUT_SN has passed at least once, add to passedDutSns
            if (row.Tester_Result === 'Pass') {
                acc[station].passedDutSns.add(row.DUT_SN);
            }

            return acc;
        }, {} as Record<string, any>);

        // Convert to array with calculated percentages using NEW formulas
        return Object.entries(grouped).map(([stationType, stats], index) => {
            // 1. Input = Unique DUT_SN count
            const input = stats.dutSns.size;

            // 2. Pass = Unique DUT_SNs with at least one Pass
            const pass = stats.passedDutSns.size;

            // 3. Yield % = (Pass / Input) * 100
            const yieldPercent = input > 0 ? (pass / input) * 100 : 0;

            // 4. Fail = Input - Pass
            const fail = input - pass;
            const failPercent = input > 0 ? (fail / input) * 100 : 0;

            // 5. Retest = Total Records - Input
            const retest = stats.totalRecords - input;
            const retestPercent = input > 0 ? (retest / input) * 100 : 0;

            return {
                id: index.toString(),
                stationType: stationType, // Clean up display name
                input,
                pass,
                yield: yieldPercent,
                fail,
                failPercent,
                retest,
                retestPercent,
            };
        });
    }, [csvData]);

    const handleExport = () => {
        try {
            // Prepare CSV content
            const lines: string[] = [];

            // Add export metadata
            lines.push('Production Analytics Report');
            lines.push(`Generated: ${new Date().toLocaleString()}`);
            lines.push('');

            // Add filter information
            lines.push('Applied Filters:');
            if (filters) {
                lines.push(`Date: ${filters.date ? format(filters.date, 'dd/MM/yyyy') : 'All'}`);
                lines.push(`Start Time: ${filters.startTime ? format(filters.startTime, 'HH:mm') : 'All'}`);
                lines.push(`End Time: ${filters.endTime ? format(filters.endTime, 'HH:mm') : 'All'}`);
                lines.push(`Shift: ${filters.shift || 'All'}`);
                lines.push(`Tester ID: ${filters.testerId || 'All'}`);
            } else {
                lines.push('No filters applied');
            }
            lines.push('');

            // Add overall metrics
            lines.push('Overall Metrics:');
            lines.push(`Overall Yield: ${overallMetrics.yield.toFixed(2)}%`);
            lines.push(`Total Input: ${overallMetrics.input}`);
            lines.push(`Total Pass: ${overallMetrics.pass}`);
            lines.push(`Total Fail: ${overallMetrics.fail}`);
            lines.push(`Total Retest: ${overallMetrics.retest}`);
            lines.push('');

            // Add station stats table
            lines.push('Station Statistics:');
            lines.push('Station Type,Input (#),Pass (#),Yield (%),Fail (#),Fail (%),Retest (#),Retest (%)');
            
            stationStats.forEach(stat => {
                lines.push([
                    stat.stationType,
                    stat.input,
                    stat.pass,
                    stat.yield.toFixed(2),
                    stat.fail,
                    stat.failPercent.toFixed(2),
                    stat.retest,
                    stat.retestPercent.toFixed(2)
                ].join(','));
            });

            // Create blob and download
            const csvContent = lines.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            
            // Generate filename with timestamp
            const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
            link.setAttribute('download', `production_analytics_${timestamp}.csv`);
            
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('Export successful');
        } catch (error) {
            console.error('Error exporting data:', error);
            alert('Failed to export data. Please try again.');
        }
    };

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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', mb: 3 }}>
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {overallMetrics.yield.toFixed(2)}%
                    </Typography>
                    <Typography variant="subtitle1" color='text.secondary'>
                        Yield for all Sites
                    </Typography>
                    <Typography variant="caption" color='text.secondary' sx={{ display: 'block', mt: 1 }}>
                        Input: {overallMetrics.input} | Pass: {overallMetrics.pass} | 
                        Fail: {overallMetrics.fail} | Retest: {overallMetrics.retest}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={stationStats}
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
    );
};

export default StatsGrid;
