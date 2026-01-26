import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { type Shift } from '../../../utils/shiftHelper';

export interface FilterValues {
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    shift: string | '';
    testerId: string;
}

interface FilterSectionProps {
    onFilterChange: (filters: FilterValues) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<FilterValues>({
        date: new Date(),
        startTime: null,
        endTime: null,
        shift: '',
        testerId: ''
    });

    const handleSearch = () => {
        onFilterChange(filters);
    };

    const handleClear = () => {
        const clearedFilters: FilterValues = {
            date: null,
            startTime: null,
            endTime: null,
            shift: '',
            testerId: '',
        };
        setFilters(clearedFilters);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                mb: 3,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <DatePicker 
                label="Date"
                value={filters.date}
                onChange={(newValue) => setFilters({ ...filters, date: newValue})}
                slotProps={{
                    textField: {
                        size: 'small',
                        sx: { width: 200 }
                    }
                }}
            />

            <TimePicker
                label="Start Time"
                value={filters.startTime}
                onChange={(newValue: Date | null) => setFilters({ ...filters, startTime: newValue })}
                slotProps={{
                    textField: {
                        size: 'small',
                        sx: { width: 150 }
                    },
                }} 
            />

            <TimePicker
                label="End Time"
                value={filters.endTime}
                onChange={(newValue: Date | null) => setFilters({ ...filters, endTime: newValue })}
                slotProps={{
                    textField: {
                        size: 'small',
                        sx: { width: 150 }
                    },
                }} 
            />

            <TextField
                select
                label="Shift"
                value={filters.shift}
                onChange={(e) => setFilters({ ...filters, shift: e.target.value as Shift | ''})}
                size='small'
                sx={{ width: 150 }} 
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="A">Shift A</MenuItem>
                <MenuItem value="B">Shift B</MenuItem>
                <MenuItem value="C">Shift C</MenuItem>
            </TextField>

            <TextField
                label="Tester ID"
                value={filters.testerId}
                onChange={(e) => setFilters({ ...filters, testerId: e.target.value})}
                size='small'
                sx={{ width: 200 }}
                placeholder='Enter Tester ID'
            />

            <Button
                variant='contained'
                startIcon={<Search />}
                onClick={handleSearch}
                sx={{
                    px: 4,
                    background: 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #7B1FA2 30%, #C2185B 90%)',
                    },
                }}
            >
                Apply
            </Button>

            <Button
                variant='contained'
                startIcon={<Clear />}
                onClick={handleClear}
                sx={{ px: 3 }}
            >
                Clear
            </Button>
        </Box>
    );
};


export default FilterSection;
