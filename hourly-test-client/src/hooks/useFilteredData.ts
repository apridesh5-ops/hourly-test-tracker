import { useMemo } from 'react';
import { type CSVRow } from '../components/common/types';
import { type FilterValues } from '../components/production/analytics/FilterSection'
import { format } from 'date-fns';
import { isTimeInRange } from '../utils/timeHelper';

export const useFilteredData = (data: CSVRow[], filters: FilterValues): CSVRow[] => {
  return useMemo(() => {
    let filtered = [...data];

    // let filtered = data.filter(row => ['pass', 'fail'].includes(row.Tester_Result?.toLowerCase() ?? ''));

    // Filter by Date
    if (filters.date) {
      const filterDateStr = format(filters.date, 'dd/MM/yyyy');
      filtered = filtered.filter(row => row.Date === filterDateStr);
    }

    // Filter by Time Range (Start Time and End Time)
    if (filters.startTime || filters.endTime) {
        filtered = filtered.filter(row => 
            isTimeInRange(row.Tester_Start_Time, filters.startTime, filters.endTime)
        );
    }

    // Filter by Shift (only if time range not specified)
    // Note: If user specifies both time range and shift, time range takes precedence
    if (filters.shift && !filters.startTime && !filters.endTime) {
      filtered = filtered.filter(row => row.shift === filters.shift);
    }

    // Filter by Tester ID
    if (filters.testerId) {
      const searchTerm = filters.testerId.toLowerCase().trim();
      filtered = filtered.filter(row => 
        row.TesterID?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [data, filters]);
};
