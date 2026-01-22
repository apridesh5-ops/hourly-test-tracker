import React, { useMemo } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAppContext } from '../../../context/AppContext';

interface FailureCount {
  item: string;
  count: number;
  percentage: number;
}

const FailureTable: React.FC<{ data: FailureCount[]; title: string }> = ({ data, title }) => (
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
      {title}
    </Typography>
    <TableContainer sx={{ maxHeight: 350 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>Item</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>Count</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                No failures found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.item}
                </TableCell>
                <TableCell align="center">{row.count}</TableCell>
                <TableCell align="center">{row.percentage.toFixed(2)}%</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export const Top5FailuresSectionV2: React.FC = () => {
  const { csvData } = useAppContext();

  const failedRecords = useMemo(() => {
    return csvData.filter(row => row.Tester_Result === 'Fail');
  }, [csvData]);

  const totalFailures = failedRecords.length;

  // Calculate Top 5 Fail Symptoms
  const top5Symptoms = useMemo<FailureCount[]>(() => {
    if (failedRecords.length === 0) return [];

    const symptomCounts = failedRecords.reduce((acc, row) => {
      const symptom = row.Error_Content || 'Unknown';
      acc[symptom] = (acc[symptom] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(symptomCounts)
      .map(([symptom, count]) => ({
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
        item: tester,
        count,
        percentage: (count / totalFailures) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [failedRecords, totalFailures]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
      <FailureTable data={top5Symptoms} title="TOP 5 FAIL SYMPTOMS" />
      <FailureTable data={top5Carriers} title="TOP 5 FAIL CARRIER SN" />
      <FailureTable data={top5Testers} title="TOP FAIL TESTER ID" />
    </Box>
  );
};
