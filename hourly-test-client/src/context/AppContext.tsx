import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type CSVRow, type AppContextType, type EngineeringFormData, type AppState } from '../components/common/types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialEngineeringInputs: EngineeringFormData = {
    paths: {
        machine1: '',
        machine2: '',
        machine3: '',
        machine4: '',
    },
    date: '',
    time: ''
};

const initialState: AppState = {
    csvData: [],
    engineeringInputs: initialEngineeringInputs,
    lastFetchTimestamp: null,
}

// Local Storage Keys
const STORAGE_KEYS = {
    CSV_DATA: 'hourly_tracker_csv_data',
    ENGINEERING_INPUTS: 'hourly_tracker_engineering_inputs',
    LAST_FETCH: 'hourly_tracker_last_fetch',
}

