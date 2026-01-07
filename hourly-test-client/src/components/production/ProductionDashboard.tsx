import React, { useState } from 'react';
import { 
    Box,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import { TableChart, BarChart } from '@mui/icons-material';
import ProductionTableView from './ProductionTableView';
import ProductionAnalyticsView from './ProductionAnalyticsView';


const ProductionDashboard: React.FC = () => {
    const [view, setView] = useState<'analytics' | 'table'>('analytics');

    const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: 'table' | 'analytics' | null) => {
        if (newView !== null) {
            setView(newView);
        }
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                    <h1 style={{ margin: 0 }}>Production Dashboard</h1>
                    
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleViewChange}
                        size="small"
                        sx={{ ml: 2 }}
                    >
                        <ToggleButton value="table" aria-label="table view">
                        <TableChart sx={{ mr: 0.5 }} fontSize="small" />
                        Table
                        </ToggleButton>
                        <ToggleButton value="analytics" aria-label="analytics view">
                        <BarChart sx={{ mr: 0.5 }} fontSize="small" />
                        Analytics
                        </ToggleButton>
                    </ToggleButtonGroup>
            </Box>

            {view === 'table' ? <ProductionTableView /> : <ProductionAnalyticsView />}
        </Box>
    )
}

export default ProductionDashboard;