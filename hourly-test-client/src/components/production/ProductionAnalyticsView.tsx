import React, { useState } from 'react';
import { Box } from '@mui/material';
import FilterSection from './analytics/FilterSection';
import { type FilterValues } from './analytics/FilterSection';
import StatsGrid from './analytics/StatsSection';
import { Top5FailuresSection } from './analytics/Top5FailuresSection';
import { Top5FailuresSectionV2 } from './analytics/Top5FailuresSectionV2';
import { PieChartSection } from './analytics/PieChartSection';
import { useAppContext } from '../../context/AppContext';
import { useFilteredData } from '../../hooks/useFilteredData';

const ProductionAnalyticsView: React.FC = () => {

    const { csvData } = useAppContext();
    
    const [filters, setFilters] = useState<FilterValues>({
        date: null,
        shift: '',
        testerId: ''
    });
    
    // Apply filters to data
    const filteredData = useFilteredData(csvData, filters);

    const handleFilterChange = (newFilters: FilterValues) => {
        setFilters(newFilters);
    };

    return (
        <Box>
            <FilterSection onFilterChange={handleFilterChange}/>
            <StatsGrid data={filteredData} />
            <Top5FailuresSection data={filteredData} />
            <PieChartSection data={filteredData} />
        </Box>
    );
};

export default ProductionAnalyticsView;