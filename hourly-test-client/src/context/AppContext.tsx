import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type CSVRow, type AppContextType, type EngineeringFormData, type AppState } from '../components/common/types';
import { dbManager } from '../utils/indexedDB';
import { SatelliteAlt, StarOutline, Store } from '@mui/icons-material';

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
                const savedTimestamp = localStorage.getItem(STORAGE_KEYS.LAST_FETCH);
                const savedAuthState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE);
                const savedView = localStorage.getItem(STORAGE_KEYS.CURRENT_VIEW);
                // -- we can save everthing in Indexed It self, no need to save meta data in local storage

                setState({
                    csvData: savedCSVData || [],
                    engineeringInputs: savedInputs ? JSON.parse(savedInputs) : initialEngineeringInputs,
                    lastFetchTimestamp: savedTimestamp,
                    isEngineeringAuthenticated: savedAuthState === 'true'
                });

                setCurrentView((savedView as any) || 'login');

            } catch (error) {
                console.error('Error loading initial state: ', error);
            } finally {
                setIsLoading(false);
            }
        };

        LoadInitialState();
    }, []);

    // Save CSV data to IndexedDB (separate from localStorage)
    useEffect(() => {
        const saveCsvData = async () => {
        if (state.csvData.length > 0) {
            try {
            await dbManager.saveData('csv_data', state.csvData);
            console.log(`Saved ${state.csvData.length} records to IndexedDB`);
            } catch (error) {
            console.error('Error saving CSV data to IndexedDB: ', error);
            }
        }
    };
    saveCsvData();
    }, [state.csvData]);

    // Save small data to localStorage
    useEffect(() => {
        try {
            // Only save Small data to local Storage
            localStorage.setItem(STORAGE_KEYS.ENGINEERING_INPUTS, JSON.stringify(state.engineeringInputs));

            if (state.lastFetchTimestamp) {
                localStorage.setItem(STORAGE_KEYS.LAST_FETCH, state.lastFetchTimestamp);
            }

            localStorage.setItem(STORAGE_KEYS.AUTH_STATE, String(state.isEngineeringAuthenticated));

            localStorage.setItem(STORAGE_KEYS.CURRENT_VIEW, currentView);
        } catch (error) {
            console.error('Error saving to localStorage: ', error);
            // if local storage fails, continue - indexedDb has the imp data
        }
    }, [state.engineeringInputs, state.lastFetchTimestamp, state.isEngineeringAuthenticated, currentView]);

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

    const clearData = async () => {
        try {
            await dbManager.deleteData('csv_data');
            setState(prev => ({
                ...prev,
                csvData: [],
                lastFetchTimestamp: null
            }));
            localStorage.removeItem(STORAGE_KEYS.LAST_FETCH);   
        } catch (error) {
           console.error('Error clearing data: ', error);
        }
    };

    const loginEngineering = (password: string): boolean => {
        const correctPassword = 'admin123'; // ToDo Store in env variable

        if (password === correctPassword) {
            setState(prev => ({
                ...prev,
                isEngineeringAuthenticated: true
            }));
            setCurrentView('engineering');
            return true;
        }
        return false;
    };

    const logoutEngineering = () => {
        setState(prev => ({
            ...prev,
            isEngineeringAuthenticated: false
        }));
        setCurrentView('login');
    };

    const navigateToProduction = () => {
        setCurrentView('production');
    };

    const navigateToEngineering = () => {
        setCurrentView('engineering');
    };

    const navigateToLogin = () => {
        setCurrentView('login');
    };

    const getStorageInfo = async () => {
        const size = await dbManager.getStorageSize();
        return {
            size,
            recordCount: state.csvData.length
        };
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
        navigateToLogin,
        getStorageInfo
    };

    if (isLoading) {
        return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            Loading...
        </div>
        );
    }

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