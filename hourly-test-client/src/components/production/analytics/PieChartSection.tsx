// src/components/production/analytics/PieChartSection.tsx
import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAppContext } from '../../../context/AppContext';
import { type CSVRow } from '../../common/types';

interface ChartData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

// Define colors for top 5 symptoms + Others
const CHART_COLORS = [
  '#9C27B0', // Purple
  '#E91E63', // Pink
  '#2196F3', // Blue
  '#4CAF50', // Green
  '#FF9800', // Orange
  '#9E9E9E', // Grey for "Others"
];

// Custom label to show percentage on pie slices
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is > 3% to avoid clutter
  if (percent < 0.03) return null;

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

interface PieChartSectionProps {
  data: CSVRow[];
}

export const PieChartSection: React.FC<PieChartSectionProps> = ({ data }) => {
  // Process data for pie chart - Top 5 Fail Symptoms
  const chartData = useMemo<ChartData[]>(() => {
    // Get only failed records
    const failedRecords = data.filter(row => row.Tester_Result === 'Fail');
    
    if (failedRecords.length === 0) return [];

    // Count occurrences of each error symptom
    const symptomCounts = failedRecords.reduce((acc, row) => {
      const symptom = row.Error_Content || 'Unknown Error';
      acc[symptom] = (acc[symptom] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count
    const sortedSymptoms = Object.entries(symptomCounts)
      .map(([symptom, count]) => ({
        symptom,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    // Take top 5
    const top5 = sortedSymptoms.slice(0, 5);
    
    // Calculate "Others" (remaining symptoms)
    const top5Count = top5.reduce((sum, item) => sum + item.count, 0);
    const othersCount = failedRecords.length - top5Count;

    // Create chart data
    const chartDataArray: ChartData[] = top5.map((item, index) => ({
      name: item.symptom,
      value: item.count,
      percentage: (item.count / failedRecords.length) * 100,
      color: CHART_COLORS[index],
    }));

    // Add "Others" if there are more than 5 symptoms
    if (othersCount > 0) {
      chartDataArray.push({
        name: 'Others',
        value: othersCount,
        percentage: (othersCount / failedRecords.length) * 100,
        color: CHART_COLORS[5],
      });
    }

    return chartDataArray;
  }, [data]);

  const totalFailures = useMemo(() => {
    return data.filter(row => row.Tester_Result === 'Fail').length;
  }, [data]);

  return (
    <Paper sx={{ p: 3, boxShadow: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold',
          ml: 58
        }}
      >
        Top Fail Symptoms Distribution
      </Typography>

      {chartData.length === 0 ? (
        <Box sx={{ 
          height: 400, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'text.secondary' 
        }}>
          <Typography variant="body1">
            No failure data available
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Left side - Pie Chart */}
          <Box sx={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number | undefined) => {
                    if (value === undefined) return ['', 'Failures'];
                    return [
                      `${value} (${((value / totalFailures) * 100).toFixed(2)}%)`,
                      'Failures'
                    ];
                  }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Total failures count */}
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                mt: 1,
                color: 'text.secondary',
                fontWeight: 'bold',
              }}
            >
              Total Failures: {totalFailures}
            </Typography>
          </Box>

          {/* Right side - Legend with colored boxes */}
          <Box sx={{ width: 350 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontWeight: 'bold',
                pb: 1,
                borderBottom: '2px solid',
                borderColor: 'divider',
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
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(4px)',
                    },
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
                      boxShadow: 1,
                    }} 
                  />
                  
                  {/* Label and stats */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={item.name} // Show full text on hover
                    >
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {item.value} failures
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: 'primary.main',
                        }}
                      >
                        ({item.percentage.toFixed(2)}%)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
