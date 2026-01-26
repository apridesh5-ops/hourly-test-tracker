import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAppContext } from '../../../context/AppContext';
import { type AnalyticsSectionProps } from '../../common/types';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

// Define colors for each status (based on your design image)
const STATUS_COLORS: Record<string, string> = {
  'PASS': '#8BC34A',           // Green
  'FS CAL': '#9C27B0',         // Purple
  'RAW': '#2196F3',            // Blue
  'DISPLAY POWER ON': '#4CAF50', // Light Green
  'TEST PROBE': '#FF9800',     // Orange
  'DTN': '#F44336',            // Red
  'FAIL': '#D32F2F',           // Dark Red
  'OTHER': '#9E9E9E',          // Grey
};

// Custom label to show percentage on pie slices
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export const PieChartSection: React.FC<AnalyticsSectionProps> = ({ data }) => {
  const csvData = data

  // Process data for pie chart
  const chartData = useMemo<ChartData[]>(() => {
    if (csvData.length === 0) return [];

    // Count occurrences of each error content (for Pass) or test result
    const statusCounts = csvData.reduce((acc, row) => {
      let status: string;
      
      if (row.Tester_Result === 'Pass') {
        status = 'PASS';
      } else if (row.Tester_Result === 'Fail') {
        // For failures, use the error content to categorize
        const errorContent = row.Error_Content || 'FAIL';
        
        // Map error content to status categories
        if (errorContent.includes('FS') || errorContent.includes('Cal')) {
          status = 'FS CAL';
        } else if (errorContent.includes('RAW')) {
          status = 'RAW';
        } else if (errorContent.includes('DISPLAY') || errorContent.includes('POWER')) {
          status = 'DISPLAY POWER ON';
        } else if (errorContent.includes('Probe') || errorContent.includes('PROBE')) {
          status = 'TEST PROBE';
        } else if (errorContent.includes('DTN')) {
          status = 'DTN';
        } else {
          status = 'FAIL';
        }
      } else {
        status = 'OTHER';
      }

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to chart data format with colors
    return Object.entries(statusCounts)
      .map(([name, value]) => ({
        name,
        value,
        color: STATUS_COLORS[name] || STATUS_COLORS['OTHER'],
      }))
      .sort((a, b) => b.value - a.value); // Sort by value descending
  }, [csvData]);

  const totalRecords = csvData.length;

  return (
    <Paper sx={{ p: 3, boxShadow: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
        {/* Left side - Pie Chart */}
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Graph Status
          </Typography>
          
          {chartData.length === 0 ? (
            <Box sx={{ 
              height: 400, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'text.secondary' 
            }}>
              No data available
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={170}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number | undefined) => [
                    `${value || 0} (${(((value || 0) / totalRecords) * 100).toFixed(2)}%)`,
                    'Count'
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>

        {/* Right side - Legend with colored boxes */}
        <Box sx={{ width: 250, mt: 8 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 'bold',
            }}
          >
            Legend
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {chartData.map((item, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {/* Color box */}
                <Box 
                  sx={{ 
                    width: 40,
                    height: 40,
                    bgcolor: item.color,
                    borderRadius: 1,
                    flexShrink: 0,
                  }} 
                />
                
                {/* Label and stats */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.value} ({((item.value / totalRecords) * 100).toFixed(2)}%)
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
