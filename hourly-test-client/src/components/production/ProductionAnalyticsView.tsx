import React from 'react';
import { Box } from '@mui/material';
import FilterSection from './analytics/FilterSection';
import StatsGrid from './analytics/StatsSection';
import { Top5FailuresSection } from './analytics/Top5FailuresSection';
import { Top5FailuresSectionV2 } from './analytics/Top5FailuresSectionV2';

const ProductionAnalyticsView: React.FC = () => {
    return (
        <Box>
            <FilterSection/>
            <StatsGrid />
            <Top5FailuresSection/>
        </Box>
    );
};

export default ProductionAnalyticsView;