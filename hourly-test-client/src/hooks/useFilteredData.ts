// src/hooks/useFilteredData.ts
import { useMemo } from 'react';
import { type CSVRow } from '../components/common/types';
import { type FilterValues } from '../components/production/analytics/FilterSection'
import { format } from 'date-fns';

export const useFilteredData = (data: CSVRow[], filters: FilterValues): CSVRow[] => {
  return useMemo(() => {
    let filtered = [...data];

    // Filter by Date
    if (filters.date) {
      const filterDateStr = format(filters.date, 'dd/MM/yyyy');
      filtered = filtered.filter(row => row.Date === filterDateStr);
    }

    // Filter by Shift
    if (filters.shift) {
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
