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
    isEngineeringAuthenticated: false,
    currentView: 'login'
};

// Local Storage Keys
const STORAGE_KEYS = {
    CSV_DATA: 'hourly_tracker_csv_data',
    ENGINEERING_INPUTS: 'hourly_tracker_engineering_inputs',
    LAST_FETCH: 'hourly_tracker_last_fetch',
    AUTH_STATE: 'hourly_tracker_auth_state',
    CURRENT_VIEW: 'hourly_tracker_current_view'
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState>(() => {
        try {
            const savedCSVData = localStorage.getItem(STORAGE_KEYS.CSV_DATA);
            const savedInputs = localStorage.getItem(STORAGE_KEYS.ENGINEERING_INPUTS);
            const savedTimestamp = localStorage.getItem(STORAGE_KEYS.LAST_FETCH);
            const savedAuthState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
            const savedView = localStorage.getItem(STORAGE_KEYS.CURRENT_VIEW);

            return {
                csvData: savedCSVData ? JSON.parse(savedCSVData) : [],
                engineeringInputs: savedInputs ? JSON.parse(savedInputs) : initialEngineeringInputs,
                lastFetchTimestamp: savedTimestamp,
                isEngineeringAuthenticated: savedAuthState === 'true',
                currentView: (savedView as AppState['currentView']) || 'login'
            };
        } catch (error) {
            console.error("Error loading state from localStorage: ", error);
            return initialState;
        }
    });

    // Persist state to local storage whenever it changes   
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.CSV_DATA, JSON.stringify(state.csvData));
            localStorage.setItem(STORAGE_KEYS.ENGINEERING_INPUTS, JSON.stringify(state.engineeringInputs));
            if(state.lastFetchTimestamp) {
                localStorage.setItem(STORAGE_KEYS.LAST_FETCH, state.lastFetchTimestamp);
            }
            localStorage.setItem(STORAGE_KEYS.AUTH_STATE, String(state.isEngineeringAuthenticated));
            localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, state.currentView)
        } catch (error) {
            console.error('Error saving state to localStorage : ', error);
        }
    }, [state]);

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