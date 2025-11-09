export interface CSVRow {
    Date?: string;
    Tester_Location?: string;
    Tester_Result?: string;
    NG_Qty?: string;
    TesterID?: string;
    Carrier_SN?: string;
    DUT_SN?: string;
    Error_Code?: string;
    Error_Content?: string;
    TesterIP?: string;
    Project_Name?: string;
    Script_Name?: string;
    Serial_Number_Name?: string;
    Tester_Duration?: string;
    Tester_Start_Time?: string;
    Tester_End_Time?: string;
    Record_Time?: string;
}

export interface EngineeringFormData {
  paths: {
    machine1: string;
    machine2: string;
    machine3: string;
    machine4: string;
  };
  date: string;
  time: string;
}

export interface AppState {
    // Data State
    csvData: CSVRow[];
    engineeringInputs: EngineeringFormData;
    lastFetchTimestamp: string | null;

    // Auth State
    isEngineeringAuthenticated: boolean;
    currentView: 'login' | 'engineering' | 'production';
}

export interface EngineeringRequestPayload {
  paths: string[],
  date?: string | null,
  time?: string | null
}

export interface AppContextType extends AppState {
    // Data Actions
    setCSVData: (data: CSVRow[]) => void;
    setEngineeringInputs: (inputs: EngineeringRequestPayload) => void;
    clearData: () => void;

    // Auth actions
    loginEngineering: (password: string) => boolean;
    logoutEngineering: () => void;
    navigateToProduction: () => void;
    navigateToEngineering: () => void;
    navigateToLogin: () => void;
}
