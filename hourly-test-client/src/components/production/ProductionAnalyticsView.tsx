import React from 'react';
import { Box } from '@mui/material';
import FilterSection from './analytics/FilterSection';
import StatsGrid from './analytics/StatsSection';

const ProductionAnalyticsView: React.FC = () => {
    return (
        <Box>
            <FilterSection />
            <StatsGrid />
        </Box>
    );
};

export default ProductionAnalyticsView;