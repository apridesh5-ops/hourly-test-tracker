import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type CSVRow, type AppContextType, type EngineeringFormData, type AppState } from '../components/common/types';
import { dbManager } from '../utils/indexedDB';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialEngineeringInputs: EngineeringFormData = {
    paths: {
        machine1: '',
        machine2: '',
        machine3: '',
        machine4: '',
    },
    date: null,
    time: null
};

// Local Storage Keys
const STORAGE_KEYS = {
    ENGINEERING_INPUTS: 'hourly_tracker_engineering_inputs',
    LAST_FETCH: 'hourly_tracker_last_fetch',
    AUTH_STATE: 'hourly_tracker_auth_state',
    CURRENT_VIEW: 'hourly_tracker_current_view'
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState>({
        csvData: [],
        engineeringInputs: initialEngineeringInputs,
        lastFetchTimestamp: null,
        isEngineeringAuthenticated: false,
    });

    const [currentView, setCurrentView] = useState<'login' | 'engineering' | 'production'>('login');
    const [isLoading, setIsLoading] = useState(true);

    // Initialize: Load data from IndexedDB and localStorage   
    useEffect(() => {
        const LoadInitialState = async () => {
            try {
                //Initialize IndexedDB
                await dbManager.initDB();

                //Load CSV data from IndexedDB
                const savedCSVData = await dbManager.getData('csv_data');

                //Load other data from localStorage (small data) -
                const savedInputs = localStorage.getItem(STORAGE_KEYS.ENGINEERING_INPUTS);
                // -- we can save everthing in Indexed It self, no need to save meta data in local storage
            }
        }
    }, []);

    // Data actions 
    const setCSVData = (data: CSVRow[]) => {
        setState(prev => ({
            ...prev,
            csvData: data,
            lastFetchTimestamp: new Date().toISOString()
        }));
    };

    const setEngineeringInputs = (inputs: EngineeringFormData) => {
        setState(prev => ({
            ...prev,
            engineeringInputs: inputs
        }));
    };

    const clearData = () => {
        setState(prev => ({
            ...prev,
            csvData: [],
            lastFetchTimestamp: null
        }));
        localStorage.removeItem(STORAGE_KEYS.CSV_DATA);
        localStorage.removeItem(STORAGE_KEYS.LAST_FETCH);
    };

    const loginEngineering = (password: string): boolean => {
        const correctPassword = 'admin123'; // ToDo Store in env variable

        if (password === correctPassword) {
            setState(prev => ({
                ...prev,
                isEngineeringAuthenticated: true,
                currentView: 'engineering'
            }));
            return true;
        }
        return false;
    };

    const logoutEngineering = () => {
        setState(prev => ({
            ...prev,
            isEngineeringAuthenticated: false,
            currentView: 'login'
        }));
    };

    const navigateToProduction = () => {
        setState(prev => ({
            ...prev,
            currentView: 'production'
        }));
    };

    const navigateToEngineering = () => {
        setState(prev => ({
            ...prev,
            currentView: 'engineering'
        }));
    };

    const navigateToLogin = () => {
        setState(prev => ({
            ...prev,
            currentView: 'login',
            isEngineeringAuthenticated: false
        }));
    };

    const value: AppContextType = {
        ...state,
        setCSVData,
        setEngineeringInputs,
        clearData,
        loginEngineering,
        logoutEngineering,
        navigateToEngineering,
        navigateToProduction,
        navigateToLogin
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// custom hook to use the context 
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};