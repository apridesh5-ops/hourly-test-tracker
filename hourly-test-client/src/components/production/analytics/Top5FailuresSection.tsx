import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppContext } from '../../../context/AppContext';


interface FailureCount {
  id: string;
  item: string;
  count: number;
  percentage: number;
}

export const Top5FailuresSection: React.FC = () => {
  const { csvData } = useAppContext();

  // Get only failed records
  const failedRecords = useMemo(() => {
    return csvData.filter(row => row.Tester_Result === 'Fail');
  }, [csvData]);

  const totalFailures = failedRecords.length;

  // Calculate Top 5 Fail Symptoms
  const top5Symptoms = useMemo<FailureCount[]>(() => {
    if (failedRecords.length === 0) return [];

    // Count occurrences of each error content
    const symptomCounts = failedRecords.reduce((acc, row) => {
      const symptom = row.Error_Content || 'Unknown';
      acc[symptom] = (acc[symptom] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array, sort by count, take top 5
    return Object.entries(symptomCounts)
      .map(([symptom, count]) => ({
        id: symptom,
        item: symptom,
        count,
        percentage: (count / totalFailures) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [failedRecords, totalFailures]);

  // Calculate Top 5 Fail Carrier SNs
  const top5Carriers = useMemo<FailureCount[]>(() => {
    if (failedRecords.length === 0) return [];

    const carrierCounts = failedRecords.reduce((acc, row) => {
      const carrier = row.Carrier_SN || 'Unknown';
      acc[carrier] = (acc[carrier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(carrierCounts)
      .map(([carrier, count]) => ({
        id: carrier,
        item: carrier,
        count,
        percentage: (count / totalFailures) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [failedRecords, totalFailures]);

  // Calculate Top 5 Fail Tester IDs
  const top5Testers = useMemo<FailureCount[]>(() => {
    if (failedRecords.length === 0) return [];

    const testerCounts = failedRecords.reduce((acc, row) => {
      const tester = row.TesterID || 'Unknown';
      acc[tester] = (acc[tester] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(testerCounts)
      .map(([tester, count]) => ({
        id: tester,
        item: tester,
        count,
        percentage: (count / totalFailures) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [failedRecords, totalFailures]);

  // Common columns for all three tables
  const columns: GridColDef[] = [
    {
      field: 'item',
      headerName: 'Item',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'count',
      headerName: 'Count',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      type: 'number',
    },
    {
      field: 'percentage',
      headerName: 'Percentage',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      valueFormatter: (value: number) => `${value.toFixed(2)}%`,
    },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
      {/* Top 5 Fail Symptoms */}
      <Paper sx={{ p: 2, boxShadow: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            color: 'white',
            bgcolor: 'error.main',
            p: 1.5,
            textAlign: 'center',
            borderRadius: 1,
          }}
        >
          TOP 5 FAIL SYMPTOMS
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <DataGrid
            rows={top5Symptoms}
            columns={columns}
            hideFooter
            disableRowSelectionOnClick
            disableColumnMenu
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

      {/* Top 5 Fail Carrier SN */}
      <Paper sx={{ p: 2, boxShadow: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            color: 'white',
            bgcolor: 'error.main',
            p: 1.5,
            textAlign: 'center',
            borderRadius: 1,
          }}
        >
          TOP 5 FAILED CARRIER SN
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <DataGrid
            rows={top5Carriers}
            columns={columns}
            hideFooter
            disableRowSelectionOnClick
            disableColumnMenu
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

      {/* Top 5 Fail Tester ID */}
      <Paper sx={{ p: 2, boxShadow: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            fontWeight: 'bold',
            color: 'white',
            bgcolor: 'error.main',
            p: 1.5,
            textAlign: 'center',
            borderRadius: 1,
          }}
        >
          TOP 5 FAILED TESTER IDs
        </Typography>
        <Box sx={{ height: 350, width: '100%' }}>
          <DataGrid
            rows={top5Testers}
            columns={columns}
            hideFooter
            disableRowSelectionOnClick
            disableColumnMenu
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
    </Box>
  );
};
